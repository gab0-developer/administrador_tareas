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
        Schema::table('tareas', function (Blueprint $table) {
            $table->foreign(['estatu_id'], 'tareas_ibfk_1')->references(['id'])->on('estatus')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign(['identificador_id'], 'tareas_ibfk_2')->references(['id'])->on('identificador_task')->onUpdate('restrict')->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tareas', function (Blueprint $table) {
            $table->dropForeign('tareas_ibfk_1');
            $table->dropForeign('tareas_ibfk_2');
        });
    }
};
