<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;

class AddressController extends Controller
{
    public function index()
    {
        return response()->json('Address index');
    }
}
