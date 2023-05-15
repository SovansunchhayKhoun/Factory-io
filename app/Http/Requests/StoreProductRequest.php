<?php

  namespace App\Http\Requests;

  use Illuminate\Foundation\Http\FormRequest;
  use Illuminate\Validation\Rule;

  class StoreProductRequest extends FormRequest
  {
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize ()
    {
      return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules ()
    {
      return [
//        'toSeeError' => ['required'],
//        'name' => [ 'required' , Rule ::unique ( 'products' ) -> ignore ( $this -> product ) ] ,
        'name' => [ 'required' ] ,
        'price' => [ 'required' ] ,
        'type' => [ 'required' ] ,
        'description' => [ 'required' ],
        'image' => ['required'],
        'qty' => [ 'required','numeric', 'min:0', 'not_in:0' ] ,
        // 'status' => ['required'] ,
        // 'picture' => ['nullable']
// =======
        'status' => ['required'] ,
        // 'type' => [ 'required' ] ,
        // 'description' => [ 'required' ],
        // 'picture' => ['nullable']
// >>>>>>> 8e20bf3435be8f809ce89f4a7e664f36e796c1b5
      ];
    }
  }
