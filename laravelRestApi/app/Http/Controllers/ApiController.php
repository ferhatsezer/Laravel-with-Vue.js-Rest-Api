<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ApiController extends Controller
{
    public function login(Request $request)
    {
        $request->validate(
            [
                'email' => 'required|email',
                'password' => 'required'
            ],
            [
                'email.required' => 'E-Posta Alanı Zorunludur',
                'email.email' => 'Lütfen E-Posta Formatı Giriniz',
                'password.required' => 'Şifre Alanı Zorunludur',
            ]);

        $email = $request->email;
        $password = $request->password;

        if (Auth::attempt(['email' => $email, 'password' => $password])) {

            $user = Auth::user();
            $tokenResult = $user->createToken('Login');
            $response = [
                'status' => true,
                'message' => 'Giriş Başarılı',
                'token' => $tokenResult->accessToken,
                'expires_in' => strtotime($tokenResult->token->expires_at),
            ];

            return response()->json($response, 200);

        } else {
            return response()->json([
                'status' => false,
                'message' => 'E-posta veya şifre hatalı',
                'error' => 'unauthorized'
            ], 401);
        }
    }

    public function register(Request $request)
    {

        $request->validate(
            [
                'email' => 'required|email|unique:users',
                'password' => 'required|min:8',
                'role' => 'required'
            ],
            [
                'email.required' => 'E-Posta Alanı Zorunludur',
                'email.email' => 'Lütfen E-Posta Formatı Giriniz',
                'email.unique' => 'E-Posta Zaten alındı, Lütfen Farklı bir E-Posta Giriniz',
                'password.required' => 'Şifre Alanı Zorunludur',
                'password.min' => 'Şifre en az 8 karakter olmalıdır.',
                'role.required' => 'Rol Alanı Zorunludur',
            ]);

        $email = $request->email;
        $password = $request->password;
        $role = $request->role;

        $result = User::create([
            'name' => '',
            'email' => $email,
            'role' => $role,
            'password' => bcrypt($password),
        ]);

        if ($result) {
            $response = [
                'status' => true,
                'message' => 'İşlem Başarılı',
            ];
            $status = 200;
        } else {
            $response = [
                'status' => false,
                'message' => 'İşlem Başarısız',
            ];
            $status = 400;
        }

        return response()->json($response, $status);
    }

    public function logout(Request $request)
    {
        $request->user()->token()->revoke();
        return response()->json([
            'status' => true,
            'message' => 'Çıkış işlemi başarılı'
        ], 200);
    }

    public function getAllUsers(Request $request)
    {
        $result = User::all();
        return response()->json([
            'status' => true,
            'users' => $result->toArray()
        ], 200);
    }

    public function getUsersReports(Request $request)
    {
        $result = User::all()->groupBy('role');
        $response = null;
        foreach ($result->toArray() as $index => $item) {
            $response[] = [
                'name' => $index,
                'y' => count($item)
            ];
        }


        return response()->json([
            'status' => true,
            'title' => 'Kullanıcı Gruplarının Raporlanması',
            'data' => $response
        ], 200);
    }
}
