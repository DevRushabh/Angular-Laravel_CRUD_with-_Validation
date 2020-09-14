<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use App\UserData;

class UserDetailsController extends Controller
{
    public function getData()
    {
         $domains = DB::table('userdata')
        ->select('*')
        ->get(); // you were missing the get method
        return response()->json($domains);
    }
    public function DelData($id)
    { 
      // Delete the Product
      if ($id != null) 
      {
        $product = UserData::find($id);
        $product->delete();    
        return response()->json("Data Deleted  Successfully");
      }
        
    }
    public function userDetails(Request $req)
    {
           foreach($req->params as $postdata)
        {
            $datainserted = DB::table('userdata')->insert(
                [   'firstName' => $postdata['updates'][0]['value'], 
                     'lastName' => $postdata['updates'][1]['value'],
                     'phone' => $postdata['updates'][2]['value'],
                     'gender' => $postdata['updates'][3]['value'],
                     'hobbies' => $postdata['updates'][4]['value']
                ]
            );
            if($datainserted)
              {
                return response()->json("Data Added Successfully");
                }
      }
      
    }
  
}
