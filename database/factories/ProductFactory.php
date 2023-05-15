<?php

namespace Database\Factories;

use App\Models\Invoice;
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
            'price' => fake ()->numberBetween ( 5, 70),
            'qty' => 10,
            'status' => 1,
            'type' => 'Arduino Board',
            'description' => fake()->text (150)
        ];
    }
}
