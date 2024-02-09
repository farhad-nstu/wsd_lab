<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $all_users = [
            [
                'name' => 'Mr. XYZ',
                'email' => 'xyz@gmail.com',
                'email_verified_at' => now(),
                'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
                'avatar' => 'https://picsum.photos/200/300?nocache=' . microtime(),
                'remember_token' => Str::random(10),
                'status' => 1,
                'status_date' => now()->format('Y-m-d H:i:s'),
            ],
            [
                'name' => 'Mr. ABC',
                'email' => 'abc@gmail.com',
                'email_verified_at' => now(),
                'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
                'avatar' => 'https://picsum.photos/200/300?nocache=' . microtime(),
                'remember_token' => Str::random(10),
                'status' => 1,
                'status_date' => now()->format('Y-m-d H:i:s'),
            ]
        ];
        foreach ($all_users as $all_user) {
            $user = User::create($all_user);
            $user->assignRole('User');
        }
    }
}
