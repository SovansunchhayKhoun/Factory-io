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
      Schema ::create ( 'saved_projects' , function ( Blueprint $table ) {
        $table -> id ();
        $table -> integer ( 'user_id' );
        $table -> integer ( 'project_id' );
        $table -> tinyInteger ( 'save_state' ) -> default ( 0 );

        $table -> foreign ( 'user_id' ) -> on ( 'users' ) -> references ( 'id' ) -> onDelete ( 'cascade' );
        $table -> foreign ( 'project_id' ) -> on ( 'projects' ) -> references ( 'id' ) -> onDelete ( 'cascade' );
        $table -> timestamps ();
      } );
    }

    /**
     * Reverse the migrations.
     */
    public function down () : void
    {
      Schema ::dropIfExists ( 'saved_projects' );
    }
  };
