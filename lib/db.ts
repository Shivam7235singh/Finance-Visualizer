import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGO_URI!;

if(!MONGODB_URI){
   throw new Error ('please add mongodb uri in env variable ')
}

let cached = global.mongoose

if(!cached){
    cached = global.mongoose = {conn : null , promise : null};
}

export async function connectToDatabase (){
    if(cached.conn){
        return cached.conn;
    }

    if(!cached.promise){
       const opts = {
         bufferCommands : true,
         maxPoolSize :10
       }
        mongoose
        .connect(MONGODB_URI, opts)
        .then(() => mongoose.connection)
    }

    try {
        cached.conn = await cached.promise
    } catch (error) {
         cached.promise = null;
         console.error("mongodb connection error" , error);
    }
   
     return cached.conn;

}