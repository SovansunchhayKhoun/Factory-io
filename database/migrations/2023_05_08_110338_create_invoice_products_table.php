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
        $table -> integer ( 'invoice_id' );
        $table -> integer ( 'product_id' );

        $table -> integer ( 'qty' );
        $table -> double ( 'cart_item_price' );

        $table -> foreign ( 'invoice_id' ) -> references ( 'id' ) -> on ( 'invoices' ) -> onDelete ( 'cascade' );
        $table -> foreign ( 'product_id' ) -> references ( 'id' ) -> on ( 'products' ) -> onDelete ( 'cascade' );

        $table -> timestamp ( 'updated_at' ) ->default ('2004-02-18-');
        $table -> timestamp ( 'created_at' ) ->default ('2004-02-18-');
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
