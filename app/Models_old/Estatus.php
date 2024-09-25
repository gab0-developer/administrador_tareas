<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Estatus
 * 
 * @property int $id
 * @property string $estatus
 * @property Carbon $fecha_registro
 * 
 * @property Collection|Tarea[] $tareas
 *
 * @package App\Models
 */
class Estatus extends Model
{
	protected $table = 'estatus';
	public $timestamps = false;

	protected $casts = [
		'fecha_registro' => 'datetime'
	];

	protected $fillable = [
		'estatus',
		'fecha_registro'
	];

	public function tareas()
	{
		return $this->hasMany(Tarea::class, 'estatu_id');
	}
}
