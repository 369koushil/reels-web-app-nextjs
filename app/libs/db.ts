import mongoose from "mongoose";
const MONGODB_URI=process.env.MONGODB_URI!;

if(!MONGODB_URI)throw new Error("please define MONGODB_URI in .env file")

let cached=global.mongoose;

if(!cached){
    cached=global.mongoose={conn:null,promise:null}
}

export async function connectDB(){
    if(cached.conn){
        return cached.conn
    }
    if(!cached.promise){
      const opts={
        bufferCommands:true,
        maxPoolSize:5
      }
    
    cached.promise=mongoose.connect(MONGODB_URI,opts).then(()=>{
        return mongoose.connection
    })
}try{
    cached.conn=await cached.promise;
}catch(error){
    cached.promise=null
    throw error
}

return cached.conn
}