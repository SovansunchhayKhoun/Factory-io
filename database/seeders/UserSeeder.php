<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            'firstName' => 'admin',
            'lastName' => 'admin',
            'phoneNumber' => '012792811',
            'email' => 'admin@domain.com',
            'username' => 'admin',
            'password' => bcrypt('admin'),
            'acc_type' => 0
        ]);
        DB::table('users')->insert([
            'firstName' => 'Rethtihpong',
            'lastName' => 'Em',
            'gender' => 'Male',
            'phoneNumber' => '012792811',
            'email' => 'rithtipongem@gmail.com',
            'username' => 'RpongEM',
            'password' => bcrypt('1234'),
            'bio' => 'Backend Dev'
        ]);
        DB::table('users')->insert([
            'firstName' => 'Sunchhay',
            'lastName' => 'Khoun',
            'gender' => 'Male',
            'phoneNumber' => '012355162',
            'email' => 'sunchhay@gmail.com',
            'username' => 'JustChhayXP',
            'password' => bcrypt('1234'),
            'bio' => 'Backend Dev'
        ]);
        DB::table('users')->insert([
            'firstName' => 'Thydatepin',
            'lastName' => 'Sim',
            'gender' => 'Female',
            'phoneNumber' => '012355162',
            'email' => 'tepin@gmail.com',
            'username' => 'CharmZz',
            'password' => bcrypt('1234'),
            'bio' => 'Frontend Dev'
        ]);
    }
}
