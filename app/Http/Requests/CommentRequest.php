<?php

  namespace App\Http\Requests;

  use Illuminate\Foundation\Http\FormRequest;

  class CommentRequest extends FormRequest
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
        'body' => [ 'nullable' ] ,
        'image' => [ 'nullable' , 'image' ] ,
        'comment_time' => [ 'required' ] ,
        'comment_indicator' => [ 'required' ] ,
        'comment_seen' => [ 'required' ] ,
        'user_id' => [ 'required' ] ,
        'replier_id' => [ 'nullable' ] ,
        'project_id' => [ 'required' ] ,
        'parent_id' => [ 'nullable' ]
      ];
    }
  }
