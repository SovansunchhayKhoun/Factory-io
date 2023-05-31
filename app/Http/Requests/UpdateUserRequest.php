<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
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
            'firstName' => 'string|max:55',
            'lastName' => 'string|max:55',
            'gender' => 'string|max:10',
            'pfp' => 'string|max:155',
            'bio' => 'string|max:155',
            'phoneNumber' => 'string|max:55',
            'username' => 'string|max:55',
            'email' => ['required', Rule::unique('users')->ignore($this->user)],
            'password' => 'required',
        ];
    }
}
