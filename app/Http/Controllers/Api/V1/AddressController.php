<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\AddressRequest;
use App\Http\Resources\V1\AddressResource;
use App\Models\Address;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AddressController extends Controller
{
    public function index()
    {
        return response()->json('Address index');
    }

    public function store(AddressRequest $request)
    {
      $data = $request->validated();
      Address::create($data);
      return response()->json('Successfully created');
    }

    public function getAddressByUserID(Request $request)
    {
      return AddressResource::collection(DB::table('addresses')->where('user_id', $request->route('id'))->get());
    }

}
