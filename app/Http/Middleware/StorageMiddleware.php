<?php

namespace App\Http\Middleware;

use App\Helpers\FileServiceHelper;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;

class StorageMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        $url = $request->url();

        if (!$this->hasValidAccess($url)) {
            return redirect('/');
        }

        return $next($request);
    }

    private function hasValidAccess(string $url): bool
    {
        if ($this->isValidStorageUrl($url)) {
            $loggedInUserId = Auth::id();
            $userIdFromUrl = $this->extractUserIdFromUrl($url);

            if ($loggedInUserId && $userIdFromUrl === $loggedInUserId) {
                $filePath = $this->extractFilePathFromUrl($url);
                $userPrivateStoragePath = FileServiceHelper::getUserPrivateStoragePath($userIdFromUrl);

                if (Storage::exists("$userPrivateStoragePath/$filePath")) {
                    return true;
                }
            }
        }

        return false;
    }

    private function isValidStorageUrl(string $url): bool
    {
        return preg_match('/\/storage\/user\/\d+/', $url);
    }

    private function extractUserIdFromUrl(string $url): ?int
    {
        preg_match('/\/storage\/user\/(\d+)/', $url, $matches);
        return intval($matches[1] ?? null);
    }

    private function extractFilePathFromUrl(string $url): ?string
    {
        preg_match('/\/storage\/user\/\d+\/(.*)/', $url, $matches);
        return $matches[1] ?? null;
    }
}
