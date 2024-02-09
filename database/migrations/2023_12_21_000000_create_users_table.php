<?php

use App\Models\BusinessChannel;
use App\Models\Office;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create(with(new User())->getTable(), function (Blueprint $table) {
            $table->id();
            $table->string('name',50);
            $table->string('mobile',12)->nullable();
            $table->string('email',100)->unique();
            $table->date('email_verified_at')->nullable();
            $table->string('password');
            $table->date('last_login_at')->nullable();
            $table->string('avatar')->nullable();
            $table->rememberToken();
            $table->boolean('status')->default(0)->comment('1: Active, 0: Inactive');
            $table->date('status_date')->default(now()->format('Y-m-d H:i:s'))->comment('Active or Inactive date.');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists(with(new User())->getTable());
    }
}
