<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name' => fake()->name,
            'price' => fake()->numberBetween(5, 70),
            'qty' => 10,
            'status' => 1,
            'type' => 'Arduino Board',
            'description' => fake()->text(150),
            'image' => 'products/SN-DHT11-MOD (a)-800x800.jpg'
        ];
    }
}
