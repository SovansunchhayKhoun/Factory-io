<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Invoice>
 */
class InvoiceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'date' => fake()->date('Y-m-d h-m-s', 'now'),
            'status' => 0,
            'payment_pic' => 'null',
            'user_id' => 1,
            'item_count' => fake()->numberBetween(1, 10),
            'totalPrice' => fake()->numberBetween(5, 200),
//          'placeId'  => fake()->streetAddress()
            'address' => 'Bridge 2, National Road 6A, Sangkat Prek Leap, Khan Chroy Changva, Phnom Penh',
            'placeId' => 'ChIJY9O3tdhRCTERyyxui9pvK68'
        ];
    }
}
