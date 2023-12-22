<?php

namespace App\Http\Controllers;

use App\Http\Requests\Download\DownloadFilesRequest;
use App\Services\FileService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\StreamedResponse;

class DownloadController extends Controller
{

    public function downloadFile(Request $request): StreamedResponse
    {
        $path = substr($request->path(), strlen('storage/'));
        return Storage::download($path);
    }

    public function downloadFiles(DownloadFilesRequest $request)
    {
        $url = FileService::download($request);
        return ['download_link' => asset($url)];
    }

}
