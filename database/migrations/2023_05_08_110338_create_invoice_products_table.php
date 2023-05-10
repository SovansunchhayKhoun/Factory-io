<?php

  use Illuminate\Database\Migrations\Migration;
  use Illuminate\Database\Schema\Blueprint;
  use Illuminate\Support\Facades\Schema;

  return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up () : void
    {
      Schema ::create ( 'invoice_products' , function ( Blueprint $table ) {
        $table -> foreignId ( 'invoice_id' ) -> references ( 'id' ) -> on ( 'invoices' ) -> onDelete ( 'cascade' );
        $table -> foreignId ( 'product_id' ) -> references ( 'id' ) -> on ( 'products' ) -> onDelete ( 'cascade' );

        $table -> integer ( 'qty' );
        $table -> double ( 'cart_item_price' );

        $table -> timestamp ( 'updated_at' );
        $table -> timestamp ( 'created_at' );
      } );
    }

    /**
     * Reverse the migrations.
     */
    public function down () : void
    {
      Schema ::dropIfExists ( 'invoice_products' );
    }
  };
