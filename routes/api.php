<?php

  use App\Http\Controllers\Api\AuthController;
  use App\Http\Controllers\Api\V1\DeliveryAddressController;
  use App\Http\Controllers\Api\V1\ChatController;
use App\Http\Controllers\Api\V1\DonationController;
use App\Http\Controllers\Api\V1\InvoiceController;
  use App\Http\Controllers\Api\V1\InvoiceProductController;
  use App\Http\Controllers\Api\V1\MessageController;
  use App\Http\Controllers\Api\V1\ProductController;
  use App\Http\Controllers\Api\V1\ProjectAssetController;
  use App\Http\Controllers\Api\V1\ProjectController;
  use App\Http\Controllers\Api\V1\ProjectPrototypeController;
  use App\Http\Controllers\Api\V1\ReviewController;
  use App\Http\Controllers\Api\V1\UserController;
  use App\Http\Controllers\TemporaryFileController;
  use App\Models\ProjectPrototype;
  use Illuminate\Http\Request;
  use Illuminate\Support\Facades\Auth;
  use Illuminate\Support\Facades\Route;

  Route ::group ( [ 'prefix' => 'v1' ] , function () {
    Route ::apiResource ( 'products' , ProductController::class );
    Route ::apiResource ( 'invoices' , InvoiceController::class );
    Route ::apiResource ( 'invoice_products' , InvoiceProductController::class );
    Route ::apiResource ( 'chat' , ChatController::class );
    Route ::apiResource ( 'message' , MessageController::class );
    Route ::apiResource ( 'reviews' , ReviewController::class );
    Route ::apiResource ( 'users' , UserController::class );
    Route ::apiResource ( 'projects' , ProjectController::class );
    Route ::apiResource ( 'project_prototypes' , ProjectPrototypeController::class );
    Route ::apiResource ( 'project_assets' , ProjectAssetController::class );
    Route ::apiResource ( 'addresses' , DeliveryAddressController::class );
    Route ::apiResource ( 'donations' , DonationController::class );
    Route ::get('getChat/{sender}/{receiver}', [ChatController::class, 'getChat']);
    Route ::get ( 'checkAddress/{address}' , [ DeliveryAddressController::class , 'checkAddress' ] );
    Route ::get ( 'getLastInvoice' , [ DeliveryAddressController::class , 'getLastInvoice' ] );
    Route ::get ( 'getAddress/{address}' , [ DeliveryAddressController::class , 'getAddress' ] );
    Route ::get ( 'getLastAddress' , [ DeliveryAddressController::class , 'getLastAddress' ] );
    Route ::get ( 'prototypes/{id}' , [ ProjectPrototypeController::class , 'prototypes' ] );
    Route ::get ( 'last_project' , [ ProjectController::class , 'fetchLastProject' ] );
    Route ::get ( 'userAddress/{id}' , [ DeliveryAddressController::class , 'getAddressByUserID' ] );
    Route ::get ( 'mostSoldItem' , [ InvoiceProductController::class , 'mostSoldItem' ] );
    Route ::get ( 'getLastInv' , [ InvoiceController::class , 'getLastInv' ] );
    Route ::get ( 'getAllItems' , [ ProductController::class , 'getAllItems' ] );
    Route ::get ( 'getAllTypes' , [ ProductController::class , 'getAllType' ] );
    Route ::get ( 'fetchItems' , [ ProductController::class , 'fetchItems' ] );
    Route ::get ( 'fetchItems/{type}' , [ ProductController::class , 'fetchItemsPaginate' ] );
    Route ::put ( 'users/{id}/change-password' , [ UserController::class , 'changePassword' ] );
    Route ::put ( 'admins/{id}/change-password' , [ UserController::class , 'changeAdminPassword' ] );
    Route ::get ( 'getAdmin' , [ UserController::class , 'getAdmins' ] );
    Route ::put ( 'updateAdmin/{id}' , [ UserController::class , 'updateAdmin' ] );
    Route ::post ( '/tmp-post' , [ TemporaryFileController::class , 'store' ] );
    Route ::delete ( '/tmp-delete' , [ TemporaryFileController::class , 'delete' ] );
  } );

  Route ::middleware ( 'auth:sanctum' ) -> group ( function () {
    Route ::get ( '/user' , function ( Request $request ) {
      return $request -> user ();
    } );
    Route ::apiResource ( '/users' , UserController::class );
    Route ::post ( '/logout' , [ AuthController::class , 'logout' ] );
  } );

//Route::put('v1/products/update/{id}',[ProductController::class,'update']);
  Route ::post ( '/signup' , [ AuthController::class , 'signup' ] );
  Route ::post ( '/login' , [ AuthController::class , 'login' ] );
  Route ::post ( '/loginAsAdmin' , [ AuthController::class , 'loginAsAdmin' ] );
  Route ::post ( '/submitForgotPasswordForm' , [ AuthController::class , 'submitForgotPasswordForm' ] );
  Route ::post ( '/resetPassword' , [ AuthController::class , 'resetPassword' ] );
