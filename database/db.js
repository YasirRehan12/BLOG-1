import mongoose from "mongoose"



 const Connection = async (username,password)=>{
    const URL=`mongodb+srv://${username}:${password}@cluster0.9umbm.mongodb.net/`
    try {
       await mongoose.connect(URL, { useNewUrlParser:true })   // connect() two parameter leta hay Url our useNewUrlParser
        console.log("Database connected successfully");
        
    } catch (error) {
        console.log("Error while connecting with the database",error);
        
    }
}

export default Connection;