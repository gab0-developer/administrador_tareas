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
 * @property int $estatu_id
 * @property Carbon $created_at
 * 
 * @property Estatus $estatus
 *
 * @package App\Models
 */
class Tarea extends Model
{
	protected $table = 'tareas';
	public $timestamps = false;

	protected $casts = [
		'identificador_id' => 'int',
		'estatu_id' => 'int'
	];

	protected $fillable = [
		'tarea',
		'identificador_id',
		'estatu_id'
	];

	public function estatus()
	{
		return $this->belongsTo(Estatus::class, 'estatu_id');
	}
}
