<?php
define('LARAVEL_START', microtime(true));
header('Content-Type: text/plain; charset=utf-8');

$key = $_GET['key'] ?? '';
if ($key !== 'nutriherbs2026') {
    http_response_code(403);
    die("Access denied. Use: ?key=nutriherbs2026\n");
}

$possiblePaths = [
    __DIR__ . '/../backend',
    dirname(__DIR__) . '/backend',
    getenv('HOME') . '/nutriharbs-backend',
];

$backendPath = null;
foreach ($possiblePaths as $p) {
    if (file_exists($p . '/bootstrap/app.php')) {
        $backendPath = realpath($p);
        break;
    }
}

if (!$backendPath) {
    die("Error: Laravel backend directory not found.\n");
}

if (!file_exists($backendPath . '/vendor/autoload.php')) {
    die("Error: vendor/autoload.php not found in $backendPath.\nVendor dependencies must be installed via composer or uploaded.\n");
}

require $backendPath . '/vendor/autoload.php';
$app = require_once $backendPath . '/bootstrap/app.php';

use Illuminate\Contracts\Console\Kernel;
$kernel = $app->make(Kernel::class);

$action = $_GET['action'] ?? 'migrate';

echo "========================================\n";
echo " Nutriherbs Live Database Migration Tool\n";
echo " Action: " . strtoupper($action) . "\n";
echo " Host: " . ($_SERVER['HTTP_HOST'] ?? 'CLI') . "\n";
echo " Time: " . date('Y-m-d H:i:s') . "\n";
echo "========================================\n\n";

try {
    if ($action === 'migrate') {
        echo "Running: php artisan migrate --force ...\n\n";
        $code = $kernel->call('migrate', ['--force' => true]);
        echo $kernel->output();
        echo "\n[Exit Code: $code]\n";
    } elseif ($action === 'status') {
        $code = $kernel->call('migrate:status');
        echo $kernel->output();
    } elseif ($action === 'optimize') {
        $code = $kernel->call('optimize:clear');
        echo $kernel->output();
    } elseif ($action === 'seed') {
        $code = $kernel->call('db:seed', ['--force' => true]);
        echo $kernel->output();
    }
} catch (\Throwable $e) {
    echo "EXCEPTION OCCURRED:\n";
    echo "Message: " . $e->getMessage() . "\n";
    echo "File: " . $e->getFile() . ":" . $e->getLine() . "\n\n";
    echo "Trace:\n" . $e->getTraceAsString() . "\n";
}
