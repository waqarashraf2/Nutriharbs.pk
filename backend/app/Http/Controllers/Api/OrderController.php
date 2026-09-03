<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $query = Order::with('items')->latest();

        if ($request->filled('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        if ($request->filled('search')) {
            $term = $request->search;
            $query->where(function ($q) use ($term) {
                $q->where('order_number', 'like', "%{$term}%")
                  ->orWhere('customer_name', 'like', "%{$term}%")
                  ->orWhere('phone', 'like', "%{$term}%")
                  ->orWhere('city', 'like', "%{$term}%");
            });
        }

        return response()->json([
            'status' => 'success',
            'data' => $query->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_name' => 'required|string|max:255',
            'phone' => 'required|string|max:50',
            'email' => 'nullable|email',
            'address' => 'required|string',
            'city' => 'required|string|max:100',
            'province' => 'nullable|string|max:100',
            'payment_method' => 'required|string',
            'subtotal' => 'required|numeric',
            'shipping_fee' => 'required|numeric',
            'discount' => 'nullable|numeric',
            'coupon_code' => 'nullable|string',
            'total' => 'required|numeric',
            'items' => 'required|array|min:1',
            'order_notes' => 'nullable|string',
        ]);

        $orderNumber = 'NH-' . strtoupper(Str::random(6));
        $trackingNumber = 'TRX' . rand(10000000, 99999999) . 'PK';

        $order = Order::create([
            'order_number' => $orderNumber,
            'customer_name' => $validated['customer_name'],
            'phone' => $validated['phone'],
            'email' => $validated['email'] ?? null,
            'address' => $validated['address'],
            'city' => $validated['city'],
            'province' => $validated['province'] ?? null,
            'payment_method' => $validated['payment_method'],
            'subtotal' => $validated['subtotal'],
            'shipping_fee' => $validated['shipping_fee'],
            'discount' => $validated['discount'] ?? 0,
            'coupon_code' => $validated['coupon_code'] ?? null,
            'total' => $validated['total'],
            'status' => 'pending_verification',
            'courier' => 'trax',
            'tracking_number' => $trackingNumber,
            'order_notes' => $validated['order_notes'] ?? null,
        ]);

        foreach ($validated['items'] as $item) {
            $order->items()->create([
                'product_id' => $item['productId'] ?? null,
                'product_title' => $item['productTitle'],
                'quantity' => $item['quantity'],
                'price' => $item['price'],
                'total' => $item['total'],
                'pack_count' => $item['packCount'] ?? 1,
                'image' => $item['image'] ?? null,
            ]);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Order created successfully',
            'data' => $order->load('items')
        ], 201);
    }

    public function track($query)
    {
        $order = Order::with('items')
            ->where('order_number', $query)
            ->orWhere('phone', $query)
            ->orWhere('tracking_number', $query)
            ->first();

        if (!$order) {
            return response()->json([
                'status' => 'error',
                'message' => 'Order not found'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $order
        ]);
    }

    public function updateStatus(Request $request, $orderNumber)
    {
        $order = Order::where('order_number', $orderNumber)->first();

        if (!$order) {
            return response()->json(['status' => 'error', 'message' => 'Order not found'], 404);
        }

        $order->update(['status' => $request->input('status')]);

        return response()->json([
            'status' => 'success',
            'message' => 'Order status updated',
            'data' => $order
        ]);
    }
}
