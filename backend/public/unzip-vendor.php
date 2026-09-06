<?php
header('Content-Type: text/plain; charset=utf-8');

$zipPath = __DIR__ . '/../vendor.zip';
if (!file_exists($zipPath)) {
    die("vendor.zip not found in backend/ directory. Please upload vendor.zip into the backend/ folder first.");
}

$zip = new ZipArchive;
if ($zip->open($zipPath) === TRUE) {
    echo "Extracting vendor.zip into backend/ ...\n";
    $zip->extractTo(__DIR__ . '/../');
    $zip->close();
    echo "SUCCESS! Vendor extracted.\n";
    if (file_exists(__DIR__ . '/../vendor/autoload.php')) {
        echo "autoload.php verified! You can now run migrations.\n";
    }
} else {
    echo "Error: Could not open vendor.zip.\n";
}
