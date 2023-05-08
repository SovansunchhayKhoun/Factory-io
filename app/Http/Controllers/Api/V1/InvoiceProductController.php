<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreInvoiceProductRequest;
use App\Models\InvoiceProduct;
use Illuminate\Http\Request;

class InvoiceProductController extends Controller
{
    public function index() {
      return response () -> json ('Invoice Product Index');
    }
    public function store( StoreInvoiceProductRequest $request) {
      InvoiceProduct::create ($request->validated ());
      return response () -> json ('Invoice Product Created');
    }
}
