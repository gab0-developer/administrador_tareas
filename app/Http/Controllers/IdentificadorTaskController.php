<?php

namespace App\Http\Controllers;

use App\Models\IdentificadorTask;
use App\Models\Tarea;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class IdentificadorTaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $userAuth = Auth::user()->id;
        $identificadores = IdentificadorTask::where('user_id',$userAuth)->get();
        return Inertia::render('Tarea/index',compact('identificadores'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        // return $request;
        $userAuth = Auth::id();
        $identificador = IdentificadorTask::create([
            'titulo' => $request->titulo,
            'user_id' => $userAuth,
        ]);

        $tareasUser = $request->tarea;
        foreach ($tareasUser as $tarea) {
            // $actividades[] = $tarea['actividad'];
            Tarea::create([
                'tarea' => $tarea['actividad'],
                'identificador_id' => $identificador->id,
            ]);
        }
        return redirect()->back()->with('success', 'tareas registradas exitosamente');
        // $tareas = Tarea::create([
        //     'tarea' => $request->tarea,
        //     'identificador_id' => $identificador->id,
        // ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
        $tareasId = Tarea::where('identificador_id',$id)->get();
        return response()->json([
            'actividades' => $tareasId,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}