<?php
// Secure artisan migration runner for Hostinger web hosting
define('LARAVEL_START', microtime(true));

header('Content-Type: text/plain; charset=utf-8');

// Security key
$key = $_GET['key'] ?? '';
if ($key !== 'nutriherbs_migrate_2026') {
    http_response_code(403);
    die("Unauthorized: Invalid secret key.\nUse ?key=nutriherbs_migrate_2026");
}

if (!file_exists(__DIR__ . '/../vendor/autoload.php')) {
    http_response_code(500);
    die("Error: backend/vendor/autoload.php not found! Vendor dependencies are missing on the server.\n");
}

require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);

$action = $_GET['action'] ?? 'migrate';

try {
    echo "===========================================\n";
    echo "  Nutriherbs Laravel Artisan Runner\n";
    echo "  Action: " . strtoupper($action) . "\n";
    echo "  Time: " . date('Y-m-d H:i:s') . "\n";
    echo "===========================================\n\n";

    if ($action === 'migrate') {
        echo "Running: php artisan migrate --force ...\n\n";
        $exitCode = $kernel->call('migrate', ['--force' => true]);
        echo $kernel->output();
        echo "\n[Result Code: " . $exitCode . "]\n";
    } elseif ($action === 'status') {
        echo "Running: php artisan migrate:status ...\n\n";
        $exitCode = $kernel->call('migrate:status');
        echo $kernel->output();
    } elseif ($action === 'optimize') {
        echo "Running: php artisan optimize:clear ...\n\n";
        $kernel->call('optimize:clear');
        echo $kernel->output();
    } elseif ($action === 'seed') {
        echo "Running: php artisan db:seed --force ...\n\n";
        $exitCode = $kernel->call('db:seed', ['--force' => true]);
        echo $kernel->output();
    } else {
        echo "Unknown action: $action. Supported actions: migrate, status, optimize, seed\n";
    }
} catch (\Throwable $e) {
    echo "\n!!! ERROR / EXCEPTION OCCURRED !!!\n";
    echo "Message: " . $e->getMessage() . "\n";
    echo "File: " . $e->getFile() . " on line " . $e->getLine() . "\n\n";
    echo "Stack Trace:\n" . $e->getTraceAsString() . "\n";
}
