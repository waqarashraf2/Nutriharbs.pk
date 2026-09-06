<?php
header('Content-Type: application/json');

$envPath = __DIR__ . '/../.env';
$hasEnv = file_exists($envPath);
$dbHost = '';
$dbName = '';

if ($hasEnv) {
    $lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (str_starts_with(trim($line), 'DB_HOST=')) $dbHost = explode('=', trim($line), 2)[1] ?? '';
        if (str_starts_with(trim($line), 'DB_DATABASE=')) $dbName = explode('=', trim($line), 2)[1] ?? '';
    }
}

echo json_encode([
    'status' => 'OK',
    'php_version' => PHP_VERSION,
    'vendor_exists' => file_exists(__DIR__ . '/../vendor/autoload.php'),
    'env_exists' => $hasEnv,
    'db_configured' => !empty($dbName),
    'db_name' => $dbName,
    'storage_writable' => is_writable(__DIR__ . '/../storage'),
    'time' => date('Y-m-d H:i:s'),
], JSON_PRETTY_PRINT);
