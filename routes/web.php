<?php

  use App\Models\Invoice;
  use App\Models\Product;
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
    $products = Product ::all ();
    $invoices = Invoice ::where ( 'id' , 1 ) -> get ();

    foreach ( $invoices as $invoice ) {
        foreach ( $invoice -> products as $item ) {
            echo $item -> name . "<br>";
        }
    }

    return view ( 'welcome' , compact ( 'products' , 'invoices' ) );
} );

