<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            // para poder manejar los mensaje y datos de retorno del controlador con useForm de inertia reactjs que trae por defecto
            'flash' => [
                'success' => $request->session()->get('success'),
                'data' => $request->session()->get('data'), // añadido para poder obtener los datos desde useForm de inertia reactjs
            ],
        ];
    }
}
