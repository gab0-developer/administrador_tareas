<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Tarea
 * 
 * @property int $id
 * @property string $tarea
 * @property int $identificador_id
 * @property Carbon $created_at
 *
 * @package App\Models
 */
class Tarea extends Model
{
	protected $table = 'tareas';
	public $timestamps = false;

	protected $casts = [
		'identificador_id' => 'int'
	];

	protected $fillable = [
		'tarea',
		'identificador_id'
	];
}
