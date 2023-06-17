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
      Schema ::create ( 'projects' , function ( Blueprint $table ) {
        $table -> id ();
        $table -> integer ( 'user_id' );
        $table -> foreign ( 'user_id' ) -> references ( 'id' ) -> on ( 'users' ) -> onDelete ( 'cascade' );

        $table -> text ( 'image' );
        $table -> text ( 'file' );
        $table -> string ( 'name' );
        $table -> string ( 'category' );
        $table -> text ( 'description' ) -> nullable ();
        $table -> integer ( 'like_count' ) -> default ( 0 );
        $table -> integer ( 'funder_count' ) -> default ( 0 );
        $table -> integer ( 'comment_count' ) -> default ( 0 );
        $table -> integer ( 'saved_count' ) -> default ( 0 );
        $table -> double ( 'target_fund' ) -> default ( 0 );
        $table -> string ( 'proposal_link' ) -> nullable ();
        $table -> timestamp ( 'project_deadline' );
        $table -> timestamps ();
      } );
    }

    /**
     * Reverse the migrations.
     */
    public function down () : void
    {
      Schema ::dropIfExists ( 'projects' );
    }
  };
