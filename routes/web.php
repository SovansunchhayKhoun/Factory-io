<?php

use App\Http\Controllers\Auth\AdminAuthController;
use App\Models\Invoice;
  use App\Models\Product;
  use App\Models\User;
  use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route ::get ( '/' , function () {
    $users = User::all();
    $products = Product ::all ();
    $invoices = Invoice ::all ();

    foreach ( $invoices as $invoice ) {
        foreach ( $invoice -> products as $item ) {
            echo $item -> name . "<br>";
        }
    }

    foreach ($users as $user) {
      foreach ($user -> invoices as $item ){
        echo $item->id . "<br>";
      }
    }

    return view ( 'welcome' , compact ( 'products', 'users' , 'invoices' ) );
} );


