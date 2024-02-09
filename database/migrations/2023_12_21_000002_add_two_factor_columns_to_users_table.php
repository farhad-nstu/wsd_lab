<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Laravel\Fortify\Fortify;
use App\Models\User;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table(with(new User())->getTable(), function (Blueprint $table) {
            $table->text('two_factor_secret')
                ->after('password')
                ->nullable();

            $table->text('two_factor_recovery_codes')
                ->after('two_factor_secret')
                ->nullable();

            if (Fortify::confirmsTwoFactorAuthentication()) {
                $table->date('two_factor_confirmed_at')
                    ->after('two_factor_recovery_codes')
                    ->nullable();
            }
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table(with(new User())->getTable(), function (Blueprint $table) {
            $table->dropColumn(array_merge([
                'two_factor_secret',
                'two_factor_recovery_codes',
            ], Fortify::confirmsTwoFactorAuthentication() ? [
                'two_factor_confirmed_at',
            ] : []));
        });
    }
};
