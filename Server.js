import app from "./src/App.js";
import colors from "colors"
import mongoose from "mongoose";
import config from "./src/config/config.js";
(async(req,res)=>{
    try{
        await mongoose.connect(config.MONGODB_URL)
   console.log("successfully connected to MONGODB".bgBlack.blue)
    }catch(error){
        console.log(`Error in DB Connection ${error}`.bgRed.white)
        res.status(500).json({
            success:false,
            message:"Error in DB connection",
            error
        })
    }

}) ()
const PORT = config.PORT        
app.listen(PORT,() =>{
    console.log(`App is running at PORT : ${PORT} Sucessfully`.rainbow)
})

