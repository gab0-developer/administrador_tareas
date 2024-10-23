<?php

namespace App\Http\Controllers;

use App\Http\Requests\IdentificadorTaskRequest;
use App\Models\IdentificadorTask;
use App\Models\Tarea;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
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
    public function store(IdentificadorTaskRequest $request)
    {
        //
        // return $request->identificadoriD;
        // vacio indica que la tarea no tiene indicadores
        if ($request->identificadoriD == 'vacio') {
            # code...
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
                    'estatu_id' => '1',
                ]);
            }
            return redirect()->back()->with('success', 'tareas registradas exitosamente');
        }else{
    
            $tareasUser = $request->tarea;
            $nuevasTareas = []; // Array para almacenar las nuevas tareas
        
            foreach ($tareasUser as $tarea) {
                // Crea la tarea y almacena en el array
                $nuevaTarea = Tarea::create([
                    'tarea' => $tarea['actividad'],
                    'identificador_id' => $request->identificadoriD,
                    'estatu_id' => '1',
                ]);
        
                // Agrega la tarea recién creada al array
                $nuevasTareas[] = [
                    'id' => $nuevaTarea->id, // ID de la tarea
                    'tarea' => $nuevaTarea->tarea,
                    'estatu_id' => $nuevaTarea->estatu_id,
                ];
            }
            // Redirecciona con el mensaje de éxito y las nuevas tareas
            return redirect()->back()->with([
                'success' => 'Tareas registradas exitosamente', 
                'data' => $nuevasTareas
            ]);
            
        }
        
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
        $identificadorId = IdentificadorTask::find($id);
        return response()->json([
            'identificador' => $identificadorId,
            // 'countTareas' => $countTareas,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $identificador= IdentificadorTask::find($id);
        $identificador->update([
            'titulo' => $request->titulo,
        ]);
        return redirect()->back()->with('success', 'Identificador de tareas modificado');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $identificador = IdentificadorTask::find($id);
        if ($identificador) {
            // Eliminar tareas relacionadas
            $identificador->tareas()->delete();
            $identificador->delete(); //luego eliminar identificador de tareas
            return redirect()->back();
        }
        return redirect()->back();
        // return redirect()->back()->with('success', 'Identificador de tareas eliminado permanentemente');
    }
}
