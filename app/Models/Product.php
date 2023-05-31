<?php

    namespace App\Models;

    use Illuminate\Database\Eloquent\Factories\HasFactory;
    use Illuminate\Database\Eloquent\Model;
    use Illuminate\Database\Eloquent\Relations\HasMany;

    class Product extends Model
    {
        use HasFactory;

        protected $fillable = [
            'name' , 'price', 'qty', 'status', 'type', 'description', 'image'
        ];

        public function Invoice ()
        {
            return $this -> belongsToMany ( Invoice::class );
        }

        public function reviews ()
        {
          return $this->hasMany(Review::class,'product_id','id');
        }


    }
