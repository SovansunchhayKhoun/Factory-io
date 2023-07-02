<?php

  namespace App\Http\Requests;

  use Illuminate\Foundation\Http\FormRequest;

  class ProjectLikeRequest extends FormRequest
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
        'project_id' => [ 'required' ] ,
        'user_id' => [ 'required' ] ,
        'like_state' => [ 'nullable' ] ,
        'like_indicator' => [ 'nullable' ] ,
        'like_time' => [ 'required' ]
      ];
    }
  }
