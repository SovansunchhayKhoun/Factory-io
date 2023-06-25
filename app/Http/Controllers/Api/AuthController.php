<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AdminRequest;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Http\Resources\V1\UserResource;
use App\Models\Admin;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        if (! Auth::attempt($credentials)) {
            return response([
                'message' => 'Provided email or password is incorrect',
            ], 422);
        }
        /** @var User $user */
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        return response(compact('user', 'token'));
    }

  public function loginAsAdmin(AdminRequest $request)
  {
      $credentials = $request->validated();
      if (Auth::guard('admin')->attempt([
          'email' => $credentials['email'],
          'password' => $credentials['password'],
      ])) {
          /* @var Admin $user */
          $user = Auth::guard('admin')->user();
          $token = $user->createToken('main')->plainTextToken;

          return response(compact('user', 'token'));
      } else {
          return response([
              'message' => 'Provided email or password is incorrect',
          ], 422);
      }
  }

    public function signup(SignupRequest $request)
    {
        $data = $request->validated();
        /** @var User $user */
        $user = User::create([
            'firstName' => $data['firstName'],
            'lastName' => $data['lastName'],
            'phoneNumber' => $data['phoneNumber'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'username' => $data['username'],
//            'address' => $data['address'],
//          'gender' => $data['gender']
        ]);

        $token = $user->createToken('main')->plainTextToken;

        return response(compact('user', 'token'));

    }

    public function logout(Request $request)
    {
        /** @var User $user */
        $user = $request->user();
        $user->currentAccessToken()->delete();

        return response('', 204);
    }

    public function resetPassword(Request $request){
      $data = $request->validate([
        'password' => 'required',
        'confirm_password' => 'required',
        'token' => 'required'
      ]);
      if(DB::table('password_reset_tokens')->where('token', $request['token'])->first()){
        if($request['password'] === $request['confirm_password']){
          $email = DB::table('password_reset_tokens')->where('token', $request['token'])->first();
          $user_id = DB::table('users')->where('email', $email->email)->first()->id;
          $user = User::find($user_id);
          $data['password'] = bcrypt($data['confirm_password']);
          $user->update($data);
          DB::table('password_reset_tokens')->where('token', $request['token'])->delete();
          return response([
            'message' => 'Sucess',
          ]);
        }else{
          return response([
            'message' => 'Password does not matched',
          ],422);
        }

      }else{
        return response([
          'message' => 'Invalid token please try again',
        ],401);
      }

    }

    public function submitForgotPasswordForm(Request $request){
      $request->validate([
        'email' => 'required|email'
      ]);
      if(DB::table('password_reset_tokens')->where('email','=', $request['email'])->first()){
        DB::table('password_reset_tokens')->where('email','=', $request['email'])->delete();
      }

      if($user = User::where('email','=',$request['email'])->first()){
//        dd(Str::random(64));

        $token = Str::random(64);
        DB::table('password_reset_tokens')->insert([
          'email' => $request['email'],
          'token' => $token,
          'created_at' => Carbon::now()
        ]);

        Mail::send('forgotPassword',['token' => $token, 'email' => $request['email'], 'name' => $user['firstName'] . ' ' . $user['lastName']],function($message) use ($request){
          $message->to($request['email']);
          $message->subject('Password Reset Request');
        });
        return response([
          'message' => 'We have e-mailed your password reset link!',
        ]);
      }else{
        return response([
          'message' => 'Email does not exists',
        ], 422);
      }
    }

}
