<?php

namespace App\Http\Controllers;

use App\Models\Tarea;
use Illuminate\Http\Request;

class TareaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $tareasId = Tarea::where('identificador_id',$id)->get();
        return response()->json([
            'actividades' => $tareasId,
            // 'countTareas' => $countTareas,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
        $tareasId = Tarea::find($id);
        return response()->json([
            'actividades' => $tareasId,
            // 'countTareas' => $countTareas,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        // return $request;
        $tarea = Tarea::find($id);
        if($request->estatusTask == '2'){
            $tarea->update([
                'id' => $tarea->id,
                'estatu_id' => $request->estatusTask
            ]);
            return redirect()->back()->with('success', 'tarea completada');
        }else{
            $tarea->update([
                'id' => $tarea->id,
                'tarea' => $request->tarea
            ]);
            return redirect()->back()->with('success', 'tarea actualizada exitosamente');
        }
        
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        // return $id;
        $tareasId = Tarea::find($id);
        // return $tareasId;
        $tareasId->delete();
        return redirect()->back()->with('success', 'tareas eliminada exitosamente');
    }
}
