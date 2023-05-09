<?php

    namespace App\Models;

    use Illuminate\Database\Eloquent\Factories\HasFactory;
    use Illuminate\Database\Eloquent\Model;
    use Illuminate\Database\Eloquent\Relations\HasMany;

    class Invoice extends Model
    {
        use HasFactory;

        protected $fillable = [
            'id' , 'date' , 'status' , 'address', 'totalPrice', 'payment_pic'
        ];

        public function products ()
        {
            return $this -> belongsToMany ( Product::class );
        }
    }
