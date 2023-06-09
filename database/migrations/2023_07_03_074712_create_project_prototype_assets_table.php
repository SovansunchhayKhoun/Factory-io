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
      Schema ::create ( 'project_prototype_assets' , function ( Blueprint $table ) {
        $table -> id ();
        $table -> string ( 'image' );
//        $table -> integer ( 'project_prototype_id' );

        $table -> foreignId ( 'project_prototype_id' ) -> references ( 'id' ) -> on ( 'project_prototypes' ) -> onDelete ( 'cascade' );
        $table -> timestamps ();
      } );
    }

    /**
     * Reverse the migrations.
     */
    public function down () : void
    {
      Schema ::dropIfExists ( 'project_prototype_assets' );
    }
  };
