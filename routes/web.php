<?php

//use Illuminate\Support\Facades\Route;

//Route::get('/', function () {
//    return view('welcome');
//});

use app\Http\Controllers\HomeController;

Route::get('/', function () {
    return view('home');
});