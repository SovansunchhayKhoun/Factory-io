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
      Schema ::create ( 'messages' , function ( Blueprint $table ) {
        $table -> id ();
        $table -> text ( 'msg_content' );
        $table -> text ( 'image' ) -> nullable ();
        $table -> foreignId ( 'chat_id' ) -> references ( 'id' ) -> on ( 'chats' );
        $table -> integer ( 'sender_id' );
        $table -> integer ( 'admin_id' );
        $table -> timestamp ( 'time_sent' );
        $table -> timestamps ();
      } );
    }

    /**
     * Reverse the migrations.
     */
    public function down () : void
    {
      Schema ::dropIfExists ( 'messages' );
    }
  };
