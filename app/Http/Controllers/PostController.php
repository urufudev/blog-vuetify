<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use App\Http\Resources\PostResource;

class PostController extends Controller
{
    public function index()
    {
        return PostResource::collection(Post::latest()->get());
    }

    public function store()
    {

        $post = Post::create(request()->all());

        return PostResource::make($post);
    }

    public function update(Post $post)
    {

        $post->update(request()->all());

        return PostResource::make($post);
    }

    public function destroy(Post $post)
    {

        $post->delete();

        return response()->json([
            'delete' => true,
        ], 200);
    }
}
