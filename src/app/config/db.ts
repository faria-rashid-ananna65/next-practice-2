import {connect} from "mongoose"
const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/miku";

if(!mongoUri){
  throw new Error("DB Uri not found")
}

let cached = global.mongoose

if(!cached){
    throw new Error("Cached not found")
}

const connectDB = async ()=>{
    if(cached.conn){
        return cached.conn
    }
    if(!cached.promise){
        cached.promise = connect(mongoUri).then((c)=>c.connection)
    }
    try{
        cached.conn = await cached.promise
        return cached.conn
    }catch(err){
        throw new Error("DB connection Failed")
    }
}

export default connectDB