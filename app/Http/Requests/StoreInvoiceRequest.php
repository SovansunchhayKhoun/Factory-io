<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreInvoiceRequest extends FormRequest
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
            'user_id' => ['required'],
            'date' => ['required'],
            'status' => ['required'],
            'payment_pic' => ['required', 'image'],
            'address' => ['required'],
            'placeId' => ['required'],
            'item_count' => ['required', 'min: 1', 'not_in:0'],
            'totalPrice' => ['required', 'numeric', 'min:0', 'not_in:0'],
        ];
    }
}
