<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->timestamps();
        });

        Schema::create('health_goals', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('icon')->nullable();
            $table->text('description')->nullable();
            $table->timestamps();
        });

        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('subtitle')->nullable();
            $table->decimal('price', 10, 2);
            $table->decimal('original_price', 10, 2)->nullable();
            $table->string('discount')->nullable();
            $table->decimal('rating', 3, 2)->default(5.0);
            $table->integer('reviews_count')->default(0);
            $table->string('form')->default('Herbal Capsules');
            $table->string('health_goal')->default('General Health');
            $table->json('badges')->nullable();
            $table->string('image');
            $table->text('description');
            $table->json('key_benefits')->nullable();
            $table->json('supplement_facts')->nullable();
            $table->text('usage_instructions')->nullable();
            $table->string('drap_reg_no')->nullable();
            $table->integer('stock')->default(50);
            $table->boolean('in_stock')->default(true);
            $table->boolean('is_best_seller')->default(false);
            $table->boolean('is_trending')->default(false);
            $table->timestamps();
        });

        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('order_number')->unique();
            $table->string('customer_name');
            $table->string('phone');
            $table->string('email')->nullable();
            $table->text('address');
            $table->string('city');
            $table->string('province')->nullable();
            $table->string('postal_code')->nullable();
            $table->text('order_notes')->nullable();
            $table->string('payment_method')->default('cod'); // cod | bank_transfer
            $table->decimal('subtotal', 10, 2);
            $table->decimal('shipping_fee', 10, 2)->default(0);
            $table->decimal('discount', 10, 2)->default(0);
            $table->string('coupon_code')->nullable();
            $table->decimal('total', 10, 2);
            $table->string('status')->default('pending_verification'); // pending_verification | confirmed | packed | dispatched | delivered | returned
            $table->string('courier')->default('trax'); // trax | postex | leopards
            $table->string('tracking_number')->nullable();
            $table->timestamps();
        });

        Schema::create('order_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained()->cascadeOnDelete();
            $table->string('product_id')->nullable();
            $table->string('product_title');
            $table->integer('quantity')->default(1);
            $table->decimal('price', 10, 2);
            $table->decimal('total', 10, 2);
            $table->integer('pack_count')->default(1);
            $table->string('image')->nullable();
            $table->timestamps();
        });

        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->nullable();
            $table->string('author');
            $table->string('city')->nullable();
            $table->integer('rating')->default(5);
            $table->string('date_text')->nullable();
            $table->string('title')->nullable();
            $table->text('comment');
            $table->boolean('verified')->default(true);
            $table->integer('helpful_count')->default(0);
            $table->timestamps();
        });

        Schema::create('coupons', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->integer('discount_percentage')->default(0);
            $table->decimal('fixed_discount', 10, 2)->default(0);
            $table->decimal('min_order', 10, 2)->default(0);
            $table->timestamp('expires_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('coupons');
        Schema::dropIfExists('reviews');
        Schema::dropIfExists('order_items');
        Schema::dropIfExists('orders');
        Schema::dropIfExists('products');
        Schema::dropIfExists('health_goals');
        Schema::dropIfExists('categories');
    }
};
