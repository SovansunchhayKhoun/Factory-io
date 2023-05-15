<?php

  use App\Http\Controllers\Api\V1\InvoiceController;
  use App\Http\Controllers\Api\V1\InvoiceProductController;
  use App\Http\Controllers\Api\V1\ProductController;
use App\Http\Controllers\Api\V1\UserController;
use App\Http\Controllers\Auth\AdminAuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::group (['prefix' => 'v1'], function () {
   Route::apiResource ('products',ProductController::class);
   Route::apiResource ('invoices',InvoiceController::class);
   Route::apiResource ('invoice_products', InvoiceProductController::class );
   Route::apiResource('users',UserController::class);
});

Route::middleware('auth:sanctum')->group(function (){
  Route::get('/user', function (Request $request) {
    return $request->user();
  });
  Route::apiResource('/users', UserController::class);
  Route::post('/logout',[AuthController::class,'logout']);
});
Route::put('v1/users/{id}/change-password',[UserController::class,'changePassword']);
Route::get('v1/getAdmin',[UserController::class,'getAdmins']);
Route::post('/signup',[AuthController::class,'signup']);
Route::post('/login',[AuthController::class,'login']);
Route::post('/loginAsAdmin',[AuthController::class,'loginAsAdmin']);

