<?php

namespace Database\Seeders;

use App\Models\Estatus;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EstatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $estatus= Estatus::create([
            'estatus' => 'PENDIENTE',
        ]);
        $estatus= Estatus::create([
            'estatus' => 'COMPLETADO',
        ]);
    }
}
