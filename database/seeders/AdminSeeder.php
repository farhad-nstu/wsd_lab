<?php

namespace Database\Seeders;

use App\Models\Admin;
use Illuminate\Database\Seeder;
use Str;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user_data = [
            'name' => 'Seller',
            'email' => 'seller@gmail.com',
            'email_verified_at' => now(),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'avatar' => 'https://picsum.photos/200/300?nocache=' . microtime(),
            'status' => 1,
            'remember_token' => Str::random(10),
        ];
        $admin = Admin::create($user_data);
        $admin->assignRole('Admin');

        $super_admin = [
            0 => [
                'name' => 'Super Admin',
                'email' => 'super.dev@gmail.com',
                'email_verified_at' => now(),
                'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
                'avatar' => 'https://picsum.photos/200/300?nocache=' . microtime(),
                'status' => 1,
                'remember_token' => Str::random(10),
            ],
            1 => [
                'name' => 'Mr. XYZ',
                'email' => 'info@softograph.com',
                'email_verified_at' => now(),
                'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
                'avatar' => 'https://picsum.photos/200/300?nocache=' . microtime(),
                'status' => 1,
                'remember_token' => Str::random(10),
            ],
        ];

        foreach ($super_admin as $admin) {
            $admin = Admin::create($admin);
            $admin->assignRole('Admin');
        }
    }
}
