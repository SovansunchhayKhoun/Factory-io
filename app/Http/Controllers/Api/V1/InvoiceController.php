<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreInvoiceRequest;
use App\Http\Requests\UpdateInvoiceRequest;
use App\Http\Resources\V1\InvoiceResource;
use App\Models\Invoice;
use Illuminate\Support\Facades\Storage;

class InvoiceController extends Controller
{
    public function index()
    {
        return InvoiceResource::collection(Invoice::all());
    }

    public function store(StoreInvoiceRequest $request)
    {
        $data = $request->validated();
        if ($request->file('payment_pic')) {
            $filename = $request->file('payment_pic')->getClientOriginalName();
            Storage::disk('invoices')->put($filename, file_get_contents($data['payment_pic']));
            $filepath = 'invoices/'.$filename;
            $data['payment_pic'] = $filepath;
        }
        Invoice::create($data);

        return response()->json('Invoice Created');
    }

    public function show(Invoice $invoice)
    {
        return new InvoiceResource($invoice);
    }

    public function update(UpdateInvoiceRequest $request, Invoice $invoice)
    {
        $invoice->update($request->validated());

        return response()->json('Invoice updated');
    }

    public function destroy(Invoice $invoice)
    {
        $invoice->delete();

        return response()->json('Invoice deleted');
    }
}
