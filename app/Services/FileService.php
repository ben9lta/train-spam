<?php

namespace App\Services;

use App\Enums\SpamTypeEnum;
use App\Helpers\FileServiceHelper;
use App\Http\Requests\Download\DownloadFilesRequest;
use App\Models\TrainSpamMessage;
use App\Models\UserFile;
use Illuminate\Support\Collection;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use ZipArchive;

class FileService
{
    public static function upload(UploadedFile $file, SpamTypeEnum $spamType, int $userId = 0, UserFile $model = null): string
    {
        $filename = self::generateUniqueFilename($file);
        $path = FileServiceHelper::getUserPrivateFilesPath($userId);

        $filePath = $file->storeAs($path, $filename);

        if ($model === null) {
            $model = new UserFile();
        }

        $model->fill([
            'filename' => $filename,
            'original_filename' => $file->getClientOriginalName(),
            'path' => $path,
            'spam_type' => $spamType->value,
            'user_id' => $userId,
        ]);

        $model->save();

        return $filePath;
    }

    private static function generateUniqueFilename(UploadedFile $file): string
    {
        $originalExtension = $file->getClientOriginalExtension();
        $filename = $file->hashName();

        $isCorrectExtension = strpos($filename, $originalExtension);

        if ($isCorrectExtension === false) {
            $extensionPos = strpos($filename, '.') + 1;
            $filename = substr_replace($filename, $originalExtension, $extensionPos);
        }

        return $filename;
    }

    public static function download(DownloadFilesRequest $request): string
    {
        $requestData = $request->validated();
        $spamTypeList = $requestData['spamTypeList'];
        $userId = $requestData['user_id'];

        $userSpamMessageList = self::getUserSpamMessageList($userId, $spamTypeList);
        $groupedData = $userSpamMessageList->groupBy('spam_type');

        $userPrivateFilesPath = FileServiceHelper::getUserPrivateFilesPath($userId);
        $zipFilePath = "$userPrivateFilesPath/SpamTypeFiles.zip";

        if (!Storage::exists($userPrivateFilesPath)) {
            Storage::makeDirectory($userPrivateFilesPath);
        }

        $zip = new ZipArchive();
        $zip->open(Storage::path($zipFilePath), ZipArchive::CREATE | ZipArchive::OVERWRITE);

        foreach ($groupedData as $type => $data) {
            $file = self::makeJsonFile($data->pluck("text"));
            $zip->addFile($file, SpamTypeEnum::from($type)->name . '.json');
        }

        $zip->close();

        return Storage::url($zipFilePath);
    }

    public static function remove(string $filename, int $userId): bool
    {
        $filePath = FileServiceHelper::getUserPrivateFilesPath($userId) . '/' . $filename;
        $fileOnDelete = UserFile::query()
            ->where(['user_id' => $userId, 'filename' => $filename])
            ->delete();

        if ($fileOnDelete) {
            Storage::delete($filePath);
        }

        return $fileOnDelete;
    }

    public static function removeByFilePath(string $filePath, int $userId): bool
    {
        $path = FileServiceHelper::getUserPrivateFilesPath($userId);
        $filename = basename($filePath);
        $fullFilePath = "$path/$filename";

        return self::removeFile($fullFilePath, $userId);
    }

    private static function removeFile(string $filePath, int $userId): bool
    {
        $filename = basename($filePath);

        $fileOnDelete = UserFile::query()
            ->where(['user_id' => $userId, 'filename' => $filename])
            ->delete();

        if ($fileOnDelete) {
            Storage::delete($filePath);
        }

        return $fileOnDelete;
    }

    private static function getUserSpamMessageList(int $userId, array $spamTypes): Collection|array
    {
        if (in_array(-1, $spamTypes)) {
            $spamTypes = [SpamTypeEnum::HAM, SpamTypeEnum::SPAM];
        }

        return TrainSpamMessage::query()
            ->select('id', 'text', 'spam_type')
            ->where('user_id', $userId)
            ->whereIn('spam_type', $spamTypes)
            ->get();
    }

    private static function makeJsonFile(Collection|array $data): false|string
    {
        if ($data instanceof Collection) {
            $data = $data->toArray();
        }

        $json = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

        $tempFilePath = tempnam(sys_get_temp_dir(), 'data');
        file_put_contents($tempFilePath, $json);
        return $tempFilePath;
    }
}
