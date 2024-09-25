<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class IdentificadorTask
 * 
 * @property int $id
 * @property string $titulo
 * @property int|null $user_id
 * @property Carbon $created_at
 * 
 * @property User|null $user
 * @property Collection|Tarea[] $tareas
 *
 * @package App\Models
 */
class IdentificadorTask extends Model
{
	protected $table = 'identificador_task';
	public $timestamps = false;

	protected $casts = [
		'user_id' => 'int'
	];

	protected $fillable = [
		'titulo',
		'user_id'
	];

	public function user()
	{
		return $this->belongsTo(User::class);
	}

	public function tareas()
	{
		return $this->hasMany(Tarea::class, 'identificador_id');
	}
}
