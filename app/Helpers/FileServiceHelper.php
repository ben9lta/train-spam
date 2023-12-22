<?php

namespace App\Helpers;

class FileServiceHelper
{
    public const USER_PRIVATE_STORAGE_PATH = 'user/:userId';
    public const USER_PRIVATE_FILES_PATH = 'user/:userId/files';

    public static function getUserPrivateFilesPath(int $userId): string
    {
        return str_replace(':userId', $userId, self::USER_PRIVATE_FILES_PATH);
    }

    public static function getUserPrivateStoragePath(int $userId): string
    {
        return str_replace(':userId', $userId, self::USER_PRIVATE_STORAGE_PATH);
    }
}
