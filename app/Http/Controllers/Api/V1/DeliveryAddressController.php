<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\DeliveryAddressRequest;
use App\Http\Resources\V1\DeliveryAddressResource;
use App\Models\DeliveryAddresses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DeliveryAddressController extends Controller
{
  public function index()
  {
    return DeliveryAddressResource::collection(DeliveryAddresses::all());
  }

  public function store(DeliveryAddressRequest $request)
  {
    $data = $request->validated();
    DeliveryAddresses::create($data);
    return response()->json('Successfully created');
  }

  public function update(DeliveryAddressRequest $request, DeliveryAddresses $address)
  {
    $data = $request->validated();
    $address->update($data);
    return response()->json('Address updated');
  }

  public function destroy(DeliveryAddresses $address)
  {
    $address->delete();
    return response()->json('address deleted');
  }


  public function getAddressByUserID(Request $request)
  {
    return DeliveryAddressResource::collection(DB::table('delivery_addresses')->where('user_id', $request->route('id'))->get());
  }

}
