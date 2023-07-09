<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('fundings', function (Blueprint $table) {
            $table->id();
//            $table->integer('project_id');
            $table->foreignId('project_id')->references('id')->on('projects')->onDelete('cascade');

//            $table->string('funder_id');
            $table->foreignId('funder_id')->references('id')->on('users')->onDelete('cascade');
            $table->string('comment');
            $table->float('amount');
            $table->string('image');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fundings');
    }
};
