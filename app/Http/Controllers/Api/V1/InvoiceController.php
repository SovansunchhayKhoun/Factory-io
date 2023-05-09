<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreInvoiceRequest;
use App\Http\Resources\V1\InvoiceResource;
use App\Models\Invoice;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
  public function index ()
  {
    return InvoiceResource::collection (Invoice::all ());
  }

  public function store (StoreInvoiceRequest $request )
  {
    Invoice::create($request->validated ());
    return response()->json ('Invoice Created');
  }

  public function show ( Invoice $invoice )
  {
    return  new InvoiceResource($invoice);
  }

  public function update ( )
  {

  }

  public function destroy (  )
  {

  }
}
