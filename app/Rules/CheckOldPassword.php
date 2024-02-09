<?php

namespace App\Rules;

use App\Models\Admin;
use App\Models\User;
use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class CheckOldPassword implements Rule
{
    protected $user_id;
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct($user_id)
    {
        $this->user_id = $user_id;
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        if(Auth::guard('admin')->check()){
            $user = Admin::findOrFail($this->user_id);
        }
        else{
            $user = User::findOrFail($this->user_id);
        }

        return Hash::check($value, $user->password);
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'The current password does not match.';
    }
}
