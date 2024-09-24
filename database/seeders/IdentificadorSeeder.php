<?php

namespace Database\Seeders;

use App\Models\IdentificadorTask;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class IdentificadorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $identificador= IdentificadorTask::create([
            'titulo' => 'Salud',
            'user_id' => '1',
        ]);
    }
}
