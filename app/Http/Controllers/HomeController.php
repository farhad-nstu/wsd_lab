<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        $products = [];
        return view('layouts.pages.dashboard', compact('products'));
    }
}
