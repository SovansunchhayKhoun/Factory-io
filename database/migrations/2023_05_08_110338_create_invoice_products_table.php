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
      Schema::create('invoice_products', function (Blueprint $table) {
        $table->id();
        $table->integer ('invoice_id');
        $table->integer ('product_id');

        $table->integer('product_qty');
        $table->double('product_price');

        $table->foreign ('invoice_id')->references ('id')->on ('invoices')->onDelete ('cascade');
        $table->foreign ('product_id')->references ('id')->on ('products')->onDelete ('cascade');
      });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoice_products');
    }
};
