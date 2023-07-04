<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BackProjectRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
          'funder_id' => ['required'],
          'project_id' => ['required'],
          'prototype_id' => ['required'],
          'qty' => ['required', 'numeric', 'min:0', 'not_in:0'],
          'image' => ['required','image'],
          'amount' => ['required', 'numeric', 'min:0', 'not_in:0'],
          'comment' => ['required']
        ];
    }
}
