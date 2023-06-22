<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class SignupRequest extends FormRequest
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
            'firstName' => 'required|string|max:55',
            'lastName' => 'required|string|max:55',
            'phoneNumber' => 'required|string|max:55',
            'email' => 'required|email|unique:users,email',
          'gender' => 'string|max:10',
            'username' => 'required|string|unique:users,username',
          'address' => 'string|max:155',
            'password' => [
                'required',
                'confirmed',
                Password::min(8)
                    ->numbers()
                    ->mixedCase()
                    ->letters()
                    ->symbols(),
            ],
        ];
    }
}
