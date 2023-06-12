<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\ChangePasswordRequest;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\AdminResource;
use App\Http\Resources\V1\UserResource;
use App\Models\Admin;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        return UserResource::collection(User::all());
    }

    public function getAdmins()
    {
        return AdminResource::collection(Admin::all());
    }

    public function getAdmin(Admin $user)
    {
        return new AdminResource($user);
    }

    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        /** @var User $user */
        $user = User::create([
            'firstName' => $data['firstName'],
            'lastName' => $data['lastName'],
            'phoneNumber' => $data['phoneNumber'],
            'gender' => $data['gender'],
            'email' => $data['email'],
            'username' => $data['username'],
            'address' => $data['address'],
            'password' => bcrypt($data['password']),
        ]);

        return response()->json('User Created');
    }

    public function changePassword(Request $request, User $user, ChangePasswordRequest $req)
    {
        $data = $req->validated();
        $user = User::find($request->route('id'));
        if (Hash::check($data['password'], $user['password'])) {
            if ($data['new_password'] === $data['password_confirmation']) {
                $data['password'] = bcrypt($data['new_password']);
                $user->update($data);
            } else {
                return response([
                    'message' => 'Password is not matched',
                ], 422);
            }
        } else {
            return response([
                'message' => 'Incorrect old password',
            ], 422);
        }
    }

    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();
        if (Hash::check($data['password'], $user['password'])) {
            $data['password'] = bcrypt($data['password']);
            $user->update($data);

            return response()->json('User updated');
        } else {
            return response([
                'message' => 'Provided password is incorrect',
            ], 422);
        }
    }

    public function destroy(User $user)
    {
        $user->delete();
        $user->reviews()->delete();

        return response()->json('user deleted');
    }

    public function show(User $user)
    {
        return new UserResource($user);
    }
}
