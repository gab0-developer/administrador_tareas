<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('identificador_task', function (Blueprint $table) {
            $table->foreign(['user_id'], 'identificador_task_ibfk_1')->references(['id'])->on('users')->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('identificador_task', function (Blueprint $table) {
            $table->dropForeign('identificador_task_ibfk_1');
        });
    }
};
