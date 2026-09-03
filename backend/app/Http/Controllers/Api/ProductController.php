<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::query()->where('in_stock', true);

        if ($request->filled('health_goal')) {
            $query->where('health_goal', 'like', '%' . $request->health_goal . '%');
        }

        if ($request->filled('form')) {
            $query->where('form', $request->form);
        }

        if ($request->boolean('best_sellers')) {
            $query->where('is_best_seller', true);
        }

        if ($request->filled('search')) {
            $term = $request->search;
            $query->where(function ($q) use ($term) {
                $q->where('title', 'like', "%{$term}%")
                  ->orWhere('subtitle', 'like', "%{$term}%")
                  ->orWhere('description', 'like', "%{$term}%");
            });
        }

        return response()->json([
            'status' => 'success',
            'data' => $query->get()
        ]);
    }

    public function show($slug)
    {
        $product = Product::where('slug', $slug)->with('reviews')->first();

        if (!$product) {
            return response()->json([
                'status' => 'error',
                'message' => 'Product not found'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $product
        ]);
    }
}
