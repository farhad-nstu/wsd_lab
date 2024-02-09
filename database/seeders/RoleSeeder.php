<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $role = Role::first();
        if (is_null($role)) {
            $s_admin = Role::create(['name' => 'Admin', 'guard_name' => 'admin']);
            $admin = Role::create(['name' => 'User', 'guard_name' => 'web']);
        }

        // // Permission List as array for admin guard
        $admin_guard_permissions = [
            [
                'group_name' => 'role',
                'permissions' => role_permissions(),
            ],
            [
                'group_name' => 'user',
                'permissions' => user_permissions(),
            ]
        ];

        // Create and Assign Permissions for admin guard
        foreach ($admin_guard_permissions as $group_permissions) {
            foreach ($group_permissions['permissions'] as $permission) {
                $permission = Permission::create([
                    'name' => $permission,
                    'guard_name' => 'admin',
                    'group_name' => $group_permissions['group_name'],
                ]);
                $s_admin->givePermissionTo($permission);
            }
        }
    }
}
