<?php

  namespace App\Models;

  use Illuminate\Database\Eloquent\Factories\HasFactory;
  use Illuminate\Database\Eloquent\Model;
  use Illuminate\Database\Eloquent\Relations\BelongsTo;

  class Invoice extends Model
  {
    use HasFactory;

    protected $fillable = [
      'id' , 'user_id' , 'date' , 'status' , 'address', 'placeId' , 'totalPrice' , 'payment_pic' , 'item_count'
    ];

    public function products ()
    {
      return $this -> belongsToMany ( Product::class , 'invoice_products' , 'invoice_id' , 'product_id' ) -> withPivot ( [ 'cart_item_price' , 'qty' ] );
    }

    public function user () : BelongsTo
    {
      return $this -> belongsTo ( User::class );
    }

  }
