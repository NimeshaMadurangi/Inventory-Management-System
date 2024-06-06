<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Item;
use Inertia\Inertia;
use Inertia\Response;

class ItemController extends Controller
{
    public function view()
    {
        return Inertia::render('Index');
    }

    public function index()
    {
        $items = Item::all();
        return response()->json($items);
    }

    public function create()
    {
        return Inertia::render('ItemForm');
    }

    public function store(Request $request)
    {
        {
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'price' => 'required|integer',
                'quantity' => 'required|integer',
                'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
                'status' => 'required|string|max:255',
            ]);
    
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $imageName = time().'.'.$image->extension();
                $image->move(public_path('images'), $imageName);
                $validatedData['image'] = $imageName;
            }
    
            Item::create($validatedData);
    
            return redirect()->route('dashboard')->with('success', 'Item added successfully');
        }
    }

    public function destroy($id)
    {
        $item = Item::findOrFail($id);
        $item->delete();
        return response()->json(['message' => 'Item deleted successfully']);
    }

    public function edit(Request $request)
    {
        $itemId = $request->query('id');
        $item = Item::findOrFail($itemId);
        return view('edit-item')->with('item', $item);
    }

    public function update(Request $request, $id)
    {
        $item = Item::findOrFail($id);
        $item->update($request->all());
        return response()->json(['message' => 'Item updated successfully']);
    }

    public function updateStatus(Request $request, $id)
    {
            $validatedData = $request->validate([
                'status' => 'required|in:available,notavailable',
            ]);

            $item = Item::findOrFail($id);
            $item->status = $validatedData['status'];
            $item->save();

            return response()->json(['message' => 'Item status updated successfully']);
    }

}
