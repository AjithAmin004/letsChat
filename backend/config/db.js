import mongoose from "mongoose";

async function dbConection(url) {
    try{
         // Establishes a connection to the MongoDB database using the provided URL.
       let conn =  await mongoose.connect(url);
       console.log('mongodb connected:',conn.connection.host)
     }catch(error){
         console.log(error)
         process.exit(1)
     }    
}

export default dbConection;
