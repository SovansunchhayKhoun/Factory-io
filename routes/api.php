<?php

  use App\Http\Controllers\Api\AuthController;
  use App\Http\Controllers\Api\V1\ChatController;
  use App\Http\Controllers\Api\V1\InvoiceController;
  use App\Http\Controllers\Api\V1\InvoiceProductController;
  use App\Http\Controllers\Api\V1\MessageController;
  use App\Http\Controllers\Api\V1\ProductController;
  use App\Http\Controllers\Api\V1\ProjectController;
  use App\Http\Controllers\Api\V1\ProjectUsersController;
  use App\Http\Controllers\Api\V1\ReviewController;
  use App\Http\Controllers\Api\V1\UserController;
  use Illuminate\Http\Request;
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
    Route ::apiResource ( 'project_users' , ProjectUsersController::class );
    Route ::get ( 'last_project' , [ ProjectController::class , 'fetchLastProject' ] );
    Route ::get ( 'mostSoldItem' , [ InvoiceProductController::class , 'mostSoldItem' ] );
    Route ::get ( 'getLastInv' , [ InvoiceController::class , 'getLastInv' ] );
    Route ::get ( 'getAllItems' , [ ProductController::class , 'getAllItems' ] );
    Route ::get ( 'getAllTypes' , [ ProductController::class , 'getAllType' ] );
    // fetch all items in pagination
    Route ::get ( 'fetchItems' , [ ProductController::class , 'fetchItems' ] );
    // fetch items by type in pagination
    Route ::get ( 'fetchItems/{type}' , [ ProductController::class , 'fetchItemsPaginate' ] );
  } );

  Route ::middleware ( 'auth:sanctum' ) -> group ( function () {
    Route ::get ( '/user' , function ( Request $request ) {
      return $request -> user ();
    } );
    Route ::apiResource ( '/users' , UserController::class );
    Route ::post ( '/logout' , [ AuthController::class , 'logout' ] );
  } );
  Route ::put ( 'v1/users/{id}/change-password' , [ UserController::class , 'changePassword' ] );
//Route::put('v1/products/update/{id}',[ProductController::class,'update']);
  Route ::get ( 'v1/getAdmin' , [ UserController::class , 'getAdmins' ] );
  Route ::get ( 'v1/getAdmin' , [ UserController::class , 'getAdmins' ] );
  Route ::post ( '/signup' , [ AuthController::class , 'signup' ] );
  Route ::post ( '/login' , [ AuthController::class , 'login' ] );
  Route ::post ( '/loginAsAdmin' , [ AuthController::class , 'loginAsAdmin' ] );
