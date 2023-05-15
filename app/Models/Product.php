<?php

    namespace App\Models;

    use Illuminate\Database\Eloquent\Factories\HasFactory;
    use Illuminate\Database\Eloquent\Model;

    class Product extends Model
    {
        use HasFactory;

        protected $fillable = [
<<<<<<< HEAD
            'name' , 'price', 'qty', 'status', 'type', 'description','image'
=======
            'name' , 'price', 'qty', 'status', 'type', 'description', 'picture'
>>>>>>> 8e20bf3435be8f809ce89f4a7e664f36e796c1b5
        ];

        public function Invoice ()
        {
            return $this -> belongsToMany ( Invoice::class );
        }
    }
