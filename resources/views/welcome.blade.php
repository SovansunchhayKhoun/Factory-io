<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  @vite('resources/css/app.css')
</head>
<body>
<div>
  <div class="mb-3">
    Product List >
    @foreach($products as $product)
      <div class="inline-block bg-gray-700 text-white px-2 py-1 rounded-md">{{ $product->name }}</div>

    @endforeach
  </div>
  <br>
  <div>
    Invoice List >
    <br>
    @foreach($invoices as $invoice)
      Invoice ID: {{ $invoice->id.', Total Price: '.$invoice->totalPrice }}
      @foreach($invoice->products as $invoice_item)
        <div class="inline-block bg-gray-700 text-white px-2 py-1 rounded-md mb-3">
          <div class="">
            Product ID: {{ $invoice_item->id }}
          </div>
          <div>
            Product Name: {{ $invoice_item->name }}
          </div>
          <div>
            Product Price: {{ $invoice_item->price }}
          </div>
        </div>
        <br>
      @endforeach
      <br>
    @endforeach

    @foreach($invoices as $invoice)
      @foreach($invoice->products as $item)
        <div class="inline-block bg-gray-700 text-white px-2 py-1 rounded-md mb-3">
          <div class="">
            {{ $item->name }}
            {{ $item->id }}
          </div>
        </div>
      @endforeach
      <br>
    @endforeach

  </div>
</div>
</body>
</html>
