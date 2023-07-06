<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    Schema::create('back_projects', function (Blueprint $table) {
      $table->id();
      $table->integer('project_id');
      $table->foreign('project_id')->references('id')->on('projects')->onDelete('cascade');
      $table->integer('funder_id');
      $table->foreign('funder_id')->references('id')->on('users')->onDelete('cascade');
      $table->integer('prototype_id');
      $table->foreign('prototype_id')->references('id')->on('project_prototypes')->onDelete('cascade');
      $table->integer('qty');
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
    Schema::dropIfExists('back_projects');
  }
};
