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
      Schema ::create ( 'project_likes' , function ( Blueprint $table ) {
        $table -> id ();
        $table -> tinyInteger ( 'like_state' ) -> default ( 0 );
//        $table -> integer ( 'user_id' );
//        $table -> integer ( 'project_id' );
        $table -> tinyInteger ( 'like_indicator' ) -> default ( 0 );
        $table -> timestamp ( 'like_time' ) -> default ( now () );

        $table -> foreignId ( 'user_id' ) -> references ( 'id' ) -> on ( 'users' ) -> onDelete ( 'cascade' );
        $table -> foreignId ( 'project_id' ) -> references ( 'id' ) -> on ( 'projects' ) -> onDelete ( 'cascade' );
        $table -> timestamps ();
      } );
    }

    /**
     * Reverse the migrations.
     */
    public function down () : void
    {
      Schema ::dropIfExists ( 'project_likes' );
    }
  };
