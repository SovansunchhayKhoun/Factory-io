<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\InvoiceResource;
use Illuminate\Http\Request;

class InvoiceController extends Controller
{
  public function index ()
  {
    return response ()->json ('Invoice Index');
  }

  public function store (  )
  {

  }

  public function show (  )
  {

  }

  public function update ( )
  {

  }

  public function destroy (  )
  {

  }
}
