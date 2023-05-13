<?php

    namespace App\Models;

    use Illuminate\Database\Eloquent\Factories\HasFactory;
    use Illuminate\Database\Eloquent\Model;

    class Product extends Model
    {
        use HasFactory;

        protected $fillable = [
            'name' , 'price', 'qty', 'status', 'type', 'description', 'picture'
        ];

        public function Invoice ()
        {
            return $this -> belongsToMany ( Invoice::class );
        }
    }
