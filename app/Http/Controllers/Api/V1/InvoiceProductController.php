<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreInvoiceProductRequest;
use App\Http\Resources\V1\InvoiceProductResource;
use App\Models\InvoiceProduct;
use App\Models\Product;
use Illuminate\Support\Facades\DB;

class InvoiceProductController extends Controller
{
  public function index()
  {
    return InvoiceProductResource::collection(InvoiceProduct::all());
  }

  public function store(StoreInvoiceProductRequest $request)
  {
    InvoiceProduct::create($request->validated());

    return response()->json('Invoice Product Created');
  }

  public function update(StoreInvoiceProductRequest $request, InvoiceProduct $invoiceProduct)
  {
    $invoiceProduct->update($request->validated());

    return response()->json('Invoice Product Updated');
  }

  public function mostSoldItem()
  {
    return DB::select("SELECT product_id,SUM(qty) FROM `invoice_products` group BY product_id order by SUM(qty) desc LIMIT 5");
  }
}
