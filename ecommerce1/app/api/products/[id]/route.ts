import { NextRequest } from "next/server";

import { connectToDb } from "../../db";
type Params={
  id:string
}


export async function GET(request:NextRequest,{params}:{params:Params}){
const {db} = await connectToDb()
const productid=params.id

const product=await db.collection('products').findOne({id:productid})

if(!product){
  return new Response('product not found',{
status:404
  })
}
return new Response(JSON.stringify(product),{
  status:200,
  headers:{
    'Content-Type':'application/json'
  }
})
}
