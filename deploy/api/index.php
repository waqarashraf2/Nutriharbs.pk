<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// Locate backend directory automatically
$possiblePaths = [
    $_SERVER['DOCUMENT_ROOT'] . '/../nutriharbs-backend',
    $_SERVER['DOCUMENT_ROOT'] . '/../../nutriharbs-backend',
    $_SERVER['DOCUMENT_ROOT'] . '/../../../nutriharbs-backend',
    getenv('HOME') . '/nutriharbs-backend',
    dirname(dirname(dirname(__DIR__))) . '/nutriharbs-backend',
];

$backendPath = null;
foreach ($possiblePaths as $path) {
    if (file_exists($path . '/bootstrap/app.php')) {
        $backendPath = realpath($path);
        break;
    }
}

if (!$backendPath) {
    http_response_code(500);
    echo json_encode(['error' => 'Laravel backend directory not found. Check server path.']);
    exit;
}

// Maintenance mode check
if (file_exists($maintenance = $backendPath . '/storage/framework/maintenance.php')) {
    require $maintenance;
}

// Composer autoloader
if (file_exists($backendPath . '/vendor/autoload.php')) {
    require $backendPath . '/vendor/autoload.php';
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Composer dependencies not installed in backend.']);
    exit;
}

// Bootstrap Laravel
/** @var Application $app */
$app = require_once $backendPath . '/bootstrap/app.php';

$app->handleRequest(Request::capture());
