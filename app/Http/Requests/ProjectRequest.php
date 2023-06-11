<?php

  namespace App\Http\Requests;

  use Illuminate\Foundation\Http\FormRequest;

  class ProjectRequest extends FormRequest
  {
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize () : bool
    {
      return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules () : array
    {
      return [
        'name' => [ 'required' ] ,
        'description' => [ 'nullable' ] ,
        'rating' => [ 'nullable', 'numeric', 'min:0' ] ,
        'funder_count' => [ 'nullable' , 'min:0' ] ,
        'target_fund' => [ 'required' , 'numeric' , 'min:0' , 'not_in:0' ] ,
        'project_deadline' => [ 'required' ] ,
        'image' => [ 'required' ] ,
        'file' => [ 'required' , 'mimes:zip,rar,7z,gz' ] ,
        'category' => [ 'required' ]
      ];
    }
  }
