<?php

namespace App\Services;


use App\Enums\SpamTypeEnum;
use App\Models\UserFile;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class FileService
{
    public static function upload(UploadedFile $file, SpamTypeEnum $spamType, int $userId = 0, UserFile $model = null): string
    {
        $path = "user/$userId/files";
        $originalFileName = $file->getClientOriginalName();
        $originalExtension = $file->getClientOriginalExtension();
        $filename = $file->hashName();

        $isCorrectExtension = strpos($file->hashName(), $originalExtension);

        if ($isCorrectExtension === false) {
            $extensionPos = strpos($filename, '.') + 1;
            $filename = substr_replace($filename, $originalExtension, $extensionPos);
        }

        $filePath = $file->storeAs($path, $filename);

        if ($model === null) {
            $model = new UserFile();
        }

        $model->fill([
            'filename' => $filename,
            'original_filename' => $originalFileName,
            'path' => $path,
            'spam_type' => $spamType->value,
            'user_id' => $userId,
        ]);

        $model->save();

        return $filePath;
    }

    public static function remove(string $filename, int $userId): bool
    {
        $path = "user/$userId/files";
        return self::removeFile($filename, $path, $userId);
    }

    public static function removeByFilePath(string $filePath, int $userId): bool
    {
        $path = "user/$userId/files/";
        $filename = str_replace($path, '', $filePath);

        return self::removeFile($filename, $path, $userId);
    }

    private static function removeFile(string $filename, string $path, int $userId): bool
    {
        $filePath = "$path/$filename";

        $fileOnDelete = UserFile::query()->where(['user_id' => $userId, 'filename' => $filename])->delete();
        if ($fileOnDelete) {
            Storage::delete($filePath);
        }

        return $fileOnDelete;
    }

}
