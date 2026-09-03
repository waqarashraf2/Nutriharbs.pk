<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\HealthGoal;
use App\Models\Product;
use App\Models\Review;
use App\Models\Coupon;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Health Goals
        $goals = [
            ['title' => 'Hair & Skin', 'slug' => 'hair-skin', 'icon' => 'Sparkles', 'description' => 'Keratin, Collagen & Glow'],
            ['title' => 'Bone & Joint', 'slug' => 'bone-joint', 'icon' => 'Activity', 'description' => 'Calcium & Joint Flexibility'],
            ['title' => "Men's Vitality", 'slug' => 'mens-vitality', 'icon' => 'Flame', 'description' => 'Stamina, Vigor & Strength'],
            ['title' => 'Weight Management', 'slug' => 'weight-mgmt', 'icon' => 'Scale', 'description' => 'Thermogenic & Detox'],
            ['title' => 'Immunity Support', 'slug' => 'immunity', 'icon' => 'ShieldCheck', 'description' => 'Antioxidants & Defenses'],
            ['title' => 'General Vitality', 'slug' => 'general-health', 'icon' => 'HeartPulse', 'description' => 'Daily Essentials & Multi']
        ];

        foreach ($goals as $goal) {
            HealthGoal::updateOrCreate(['slug' => $goal['slug']], $goal);
        }

        // 2. Categories
        $categories = [
            ['name' => 'Herbal Capsules', 'slug' => 'herbal-capsules', 'description' => 'Pure plant-based extract vegetarian capsules'],
            ['name' => 'Tablets', 'slug' => 'tablets', 'description' => 'Chewable and swallowed botanical tablets'],
            ['name' => 'Dietary Supplement', 'slug' => 'dietary-supplement', 'description' => 'Everyday vitamins & bio-minerals'],
            ['name' => 'Organic Powders', 'slug' => 'organic-powders', 'description' => 'Finely milled pure herbal extracts']
        ];

        foreach ($categories as $cat) {
            Category::updateOrCreate(['slug' => $cat['slug']], $cat);
        }

        // 3. Products
        $products = [
            [
                'title' => 'KalFit Bone & Joint Support',
                'slug' => 'kalfit-bone-joint-support',
                'subtitle' => 'Red Algae Calcium + Vitamin D3, K2 & Magnesium Sulphate',
                'price' => 1950,
                'original_price' => 2450,
                'discount' => '20% OFF',
                'rating' => 4.9,
                'reviews_count' => 142,
                'form' => 'Herbal Capsules',
                'health_goal' => 'Bone & Joint',
                'badges' => ['Best Seller', 'DRAP Certified', 'Clinically Proven'],
                'image' => '/images/products/kalfit-bone-joint.webp',
                'description' => 'KalFit delivers 100% bio-available organic plant-source calcium harvested from Icelandic red algae, fortified with Vitamin D3, Vitamin K2 (MK-7), and Magnesium Sulphate to directly channel minerals into bone density rather than arterial calcification. Essential for preventing osteoporosis and strengthening joints.',
                'key_benefits' => [
                    'Increases bone mineral density and prevents age-related osteoporosis',
                    'Advanced Vitamin K2 (MK-7) channels calcium directly to bones & teeth',
                    'Supports smooth joint mobility and relieves morning stiffness',
                    'Non-constipating plant-based red algae formula gentle on digestion'
                ],
                'supplement_facts' => [
                    'servingSize' => '1 Capsule',
                    'servingsPerContainer' => 30,
                    'facts' => [
                        ['ingredient' => 'Red Marine Algae (Lithothamnion Calcareum)', 'amountPerServing' => '500 mg', 'dailyValue' => '38%'],
                        ['ingredient' => 'Elemental Calcium', 'amountPerServing' => '160 mg', 'dailyValue' => '16%'],
                        ['ingredient' => 'Elemental Magnesium', 'amountPerServing' => '40 mg', 'dailyValue' => '10%'],
                        ['ingredient' => 'Vitamin D3 (as Cholecalciferol)', 'amountPerServing' => '400 IU', 'dailyValue' => '50%'],
                        ['ingredient' => 'Vitamin K2 (as Menaquinone-7)', 'amountPerServing' => '45 mcg', 'dailyValue' => '38%']
                    ]
                ],
                'usage_instructions' => 'Take 1 to 2 capsules daily after a main meal with a full glass of water, or as advised by your healthcare physician.',
                'drap_reg_no' => 'DRAP Enl-00892/2023',
                'stock' => 48,
                'in_stock' => true,
                'is_best_seller' => true,
                'is_trending' => true
            ],
            [
                'title' => 'Vivomit Glow Collagen Complex',
                'slug' => 'vivomit-glow-collagen',
                'subtitle' => 'Hydrolyzed Marine Collagen Peptides with Vitamin C & Hyaluronic Acid',
                'price' => 2650,
                'original_price' => 3200,
                'discount' => '17% OFF',
                'rating' => 4.8,
                'reviews_count' => 218,
                'form' => 'Tablets',
                'health_goal' => 'Hair & Skin',
                'badges' => ['Customer Favorite', 'Anti-Aging', '100% Natural'],
                'image' => '/images/products/vivomit-collagen.webp',
                'description' => 'Vivomit Glow Collagen is specifically crafted with premium hydrolyzed marine collagen peptides and skin-revitalizing botanical nutrients. It actively restores skin dermal elasticity, hydrates deep tissue, strengthens fragile nails, and visibly restores a luminous youth glow within 3-4 weeks.',
                'key_benefits' => [
                    'Significantly boosts skin elasticity and softens fine lines & wrinkles',
                    'Restores deep dermal moisture barrier with pure Hyaluronic Acid',
                    'Strengthens brittle nails and reduces hair breakage',
                    'High absorption low molecular weight peptides'
                ],
                'supplement_facts' => [
                    'servingSize' => '1 Tablet',
                    'servingsPerContainer' => 30,
                    'facts' => [
                        ['ingredient' => 'Hydrolyzed Marine Collagen Peptides', 'amountPerServing' => '800 mg', 'dailyValue' => '**'],
                        ['ingredient' => 'Vitamin C (as Ascorbic Acid)', 'amountPerServing' => '60 mg', 'dailyValue' => '67%'],
                        ['ingredient' => 'Hyaluronic Acid', 'amountPerServing' => '40 mg', 'dailyValue' => '**'],
                        ['ingredient' => 'Zinc Gluconate', 'amountPerServing' => '10 mg', 'dailyValue' => '91%']
                    ]
                ],
                'usage_instructions' => 'Take 1 tablet daily in the morning or before bedtime on an empty stomach with fresh water.',
                'drap_reg_no' => 'DRAP Enl-00741/2023',
                'stock' => 65,
                'in_stock' => true,
                'is_best_seller' => true,
                'is_trending' => true
            ],
            [
                'title' => 'Niston Biotin 2500 MCG',
                'slug' => 'niston-biotin-2500-mcg',
                'subtitle' => 'Pure Herbal Vitamin B7 for Lustrous Hair, Radiant Skin & Strong Nails',
                'price' => 1450,
                'original_price' => 1850,
                'discount' => '22% OFF',
                'rating' => 4.9,
                'reviews_count' => 310,
                'form' => 'Tablets',
                'health_goal' => 'Hair & Skin',
                'badges' => ['Top Rated Hair Formula', 'Fast Acting'],
                'image' => '/images/products/niston-biotin.webp',
                'description' => 'Niston Biotin 2500 MCG provides optimal bioavailable Vitamin B7 essential for natural keratin synthesis. Formulated to combat extreme hair fall, stimulate dormant hair follicles, accelerate hair regrowth, and eliminate brittle nail chipping caused by water and pollution in Pakistan.',
                'key_benefits' => [
                    'Noticeably halts excessive seasonal hair shedding within 14 days',
                    'Stimulates keratin infrastructure for thicker, voluminous strands',
                    'Hardens fragile, splitting nails',
                    'Improves metabolic energy and promotes a glowing complexion'
                ],
                'supplement_facts' => [
                    'servingSize' => '1 Tablet',
                    'servingsPerContainer' => 30,
                    'facts' => [
                        ['ingredient' => 'Biotin (D-Biotin Pure USP)', 'amountPerServing' => '2500 mcg', 'dailyValue' => '8333%'],
                        ['ingredient' => 'Calcium Carbonate', 'amountPerServing' => '120 mg', 'dailyValue' => '9%'],
                        ['ingredient' => 'Silica (Bamboo Extract)', 'amountPerServing' => '15 mg', 'dailyValue' => '**']
                    ]
                ],
                'usage_instructions' => 'Take 1 tablet daily with lunch or breakfast. Ensure drinking 8-10 glasses of water daily for optimal assimilation.',
                'drap_reg_no' => 'DRAP Enl-00632/2022',
                'stock' => 92,
                'in_stock' => true,
                'is_best_seller' => true,
                'is_trending' => false
            ],
            [
                'title' => 'Nutriherbs Glowing Glutathione',
                'slug' => 'glowing-glutathione-capsules',
                'subtitle' => 'L-Glutathione Reduced 500mg with Alpha Lipoic Acid & Rosehip Extract',
                'price' => 2950,
                'original_price' => 3800,
                'discount' => '22% OFF',
                'rating' => 4.9,
                'reviews_count' => 184,
                'form' => 'Herbal Capsules',
                'health_goal' => 'Hair & Skin',
                'badges' => ['Skin Glow', 'Master Antioxidant', 'Top Tier'],
                'image' => '/images/products/glowing-glutathione.webp',
                'description' => 'The master antioxidant formulation engineered for deep skin lightening and cellular purification. Glowing Glutathione binds free radicals, inhibits melanin enzyme synthesis to diminish dark spots, acne marks, and uneven sun pigmentation, resulting in an even, luminous porcelain radiance.',
                'key_benefits' => [
                    'Inhibits tyrosinase enzyme activity to brighten hyperpigmentation & melasma',
                    'Promotes master cellular detox of liver and dermal tissues',
                    'Defends against UV damage and urban oxidative pollution',
                    'Enhanced with Rosehip Extract for maximum glutathione recycling'
                ],
                'supplement_facts' => [
                    'servingSize' => '1 Capsule',
                    'servingsPerContainer' => 30,
                    'facts' => [
                        ['ingredient' => 'L-Glutathione (Reduced Form)', 'amountPerServing' => '500 mg', 'dailyValue' => '**'],
                        ['ingredient' => 'Alpha Lipoic Acid (ALA)', 'amountPerServing' => '100 mg', 'dailyValue' => '**'],
                        ['ingredient' => 'Rosehip Extract (Rosa Canina)', 'amountPerServing' => '100 mg', 'dailyValue' => '**'],
                        ['ingredient' => 'Vitamin C (Pure Ascorbic)', 'amountPerServing' => '100 mg', 'dailyValue' => '111%']
                    ]
                ],
                'usage_instructions' => 'Take 1 capsule twice daily before meals, preferably in combination with Vitamin C for accelerated results.',
                'drap_reg_no' => 'DRAP Enl-00914/2023',
                'stock' => 35,
                'in_stock' => true,
                'is_best_seller' => false,
                'is_trending' => true
            ]
        ];

        foreach ($products as $pData) {
            Product::updateOrCreate(['slug' => $pData['slug']], $pData);
        }

        // 4. Coupons
        Coupon::updateOrCreate(['code' => 'NUTRI10'], [
            'discount_percentage' => 10,
            'fixed_discount' => 0,
            'min_order' => 1500,
            'expires_at' => now()->addYear()
        ]);
    }
}
