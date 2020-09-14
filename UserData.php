<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserData extends Model
{
    public $table = 'userdata';
    protected $fillable = array('firstName', 'lastName','phone','gender','hobbies'); 
}
