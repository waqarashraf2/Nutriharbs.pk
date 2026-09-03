<?php

use App\Http\Controllers\Api\CourierController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/health', function () {
    return response()->json([
        'status' => 'healthy',
        'service' => 'Nutriherbs API',
        'version' => '1.0.0',
        'drap_certified' => true,
        'timestamp' => now()
    ]);
});

// Products
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{slug}', [ProductController::class, 'show']);

// Orders
Route::get('/orders', [OrderController::class, 'index']);
Route::post('/orders', [OrderController::class, 'store']);
Route::get('/orders/track/{query}', [OrderController::class, 'track']);
Route::patch('/orders/{orderNumber}/status', [OrderController::class, 'updateStatus']);

// Couriers & Pakistani Logistics
Route::post('/courier/calculate-rates', [CourierController::class, 'calculateRates']);
Route::post('/courier/generate-payload', [CourierController::class, 'generatePayload']);
