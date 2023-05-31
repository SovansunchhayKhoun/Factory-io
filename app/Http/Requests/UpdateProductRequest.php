<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProductRequest extends FormRequest
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
            'price' => ['required'],
            'type' => ['required'],
            'status' => ['required'],
            'description' => ['required'],
            'qty' => ['required', 'numeric', 'min:0 '],
            'image' => 'nullable',
            'name' => ['required', Rule::unique('products')->ignore($this->product)],
        ];
    }
}
