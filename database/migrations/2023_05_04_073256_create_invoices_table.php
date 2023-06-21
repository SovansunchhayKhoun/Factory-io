<?php

  use Illuminate\Database\Migrations\Migration;
  use Illuminate\Database\Schema\Blueprint;
  use Illuminate\Support\Facades\Schema;

  return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up ()
    {
      Schema ::create ( 'invoices' , function ( Blueprint $table ) {
        $table -> id ();
        $table -> integer ( 'address_id' );
        $table -> foreign ( 'address_id' ) -> references ( 'id' ) -> on ( 'delivery_addresses' );
        $table -> foreignId ( 'user_id' ) -> references ( 'id' ) -> on ( 'users' ) -> onDelete ( 'cascade' );

        $table -> timestamp ( 'date' ) -> nullable ();
        $table -> double ( 'totalPrice' );
        $table -> tinyInteger ( 'status' ) -> default ( 0 );
        $table -> text ( 'payment_pic' ) -> nullable ();
        $table -> integer ( 'item_count' ) -> default ( 0 );

        $table -> timestamps ();
      } );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down ()
    {
      Schema ::dropIfExists ( 'invoices' );
    }
  };
