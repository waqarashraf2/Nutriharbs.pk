<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CourierController extends Controller
{
    public function calculateRates(Request $request)
    {
        $city = $request->input('city', 'Lahore');
        $subtotal = $request->input('subtotal', 0);

        if ($subtotal >= 2000) {
            return response()->json([
                'city' => $city,
                'rate' => 0,
                'is_free' => true,
                'delivery_time' => '1-2 Days'
            ]);
        }

        $rate = match (strtolower($city)) {
            'karachi', 'lahore', 'islamabad', 'rawalpindi', 'faisalabad' => 200,
            'peshawar', 'quetta', 'gilgit', 'mirpur' => 250,
            default => 200
        };

        return response()->json([
            'city' => $city,
            'rate' => $rate,
            'is_free' => false,
            'delivery_time' => '2-3 Days'
        ]);
    }

    public function generatePayload(Request $request)
    {
        $courier = strtolower($request->input('courier', 'trax'));
        $order = $request->input('order');

        if (!$order) {
            return response()->json(['error' => 'Order data missing'], 400);
        }

        $payload = [
            'courier' => strtoupper($courier),
            'consignee_name' => $order['customer_name'] ?? $order['customerName'] ?? 'Customer',
            'consignee_phone' => $order['phone'] ?? '',
            'consignee_address' => $order['address'] ?? '',
            'destination_city' => $order['city'] ?? 'Lahore',
            'cod_amount' => $order['total'] ?? 0,
            'order_reference' => $order['order_number'] ?? $order['orderNumber'] ?? 'NH-100',
            'weight_kg' => 0.5,
            'package_type' => 'Flyer / Box',
            'pickup_location' => 'Nutriherbs Central Hub, Lahore',
            'special_notes' => 'Herbal Nutraceuticals. Call consignee before delivery.'
        ];

        return response()->json([
            'status' => 'success',
            'payload' => $payload
        ]);
    }
}
