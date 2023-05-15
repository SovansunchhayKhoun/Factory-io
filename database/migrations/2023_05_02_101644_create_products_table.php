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
<<<<<<< HEAD
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->double ('price');
            $table->integer ('qty')->nullable ();
            $table->string('status')->default ('In Stock');
            $table->string('type')->nullable ();
            $table->text('image')->nullable ();
            $table->longText('description')->nullable ();
            $table->timestamps();
        });
=======
      Schema ::create ( 'products' , function ( Blueprint $table ) {
        $table -> id ();
        $table -> string ( 'name' );
        $table -> double ( 'price' );
        $table -> integer ( 'qty' ) -> default (0);
        $table -> tinyInteger ( 'status' ) -> default ( 1 );
        $table -> string ( 'type' ) -> nullable ();
        $table -> longText ( 'description' ) -> nullable ();
        $table -> longText ('picture') -> nullable ();
        $table -> timestamps ();
      } );
>>>>>>> 8e20bf3435be8f809ce89f4a7e664f36e796c1b5
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down ()
    {
      Schema ::dropIfExists ( 'products' );
    }
  };
