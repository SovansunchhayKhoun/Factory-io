<?php

  namespace Database\Seeders;

  use Illuminate\Database\Console\Seeds\WithoutModelEvents;
  use Illuminate\Database\Seeder;
  use Illuminate\Support\Facades\DB;

  class DeliveryAddressSeeder extends Seeder
  {
    /**
     * Run the database seeds.
     */
    public function run () : void
    {
      DB ::table ( 'delivery_addresses' ) -> insert ( [
        'user_id' => 1 ,
        'address' => 'St.369, Chbar Ampov, Phnom Penh',
        'placeId' => fake ()->streetAddress()
      ] );
      DB ::table ( 'delivery_addresses' ) -> insert ( [
        'user_id' => 1 ,
        'address' => '#572, ST.369, Chbar Ampov, Phnom Penh',
        'placeId' => fake()->streetAddress()
      ] );
      DB ::table ( 'delivery_addresses' ) -> insert ( [
        'user_id' => 2 ,
        'address' => 'St.369, Chbar Ampov, Phnom Penh',
        'placeId' => fake ()->streetAddress()
      ] );
    }
  }
