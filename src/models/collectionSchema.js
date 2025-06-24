import mongoose from "mongoose";

const collectionSchema= new mongoose.Schema({
   name :{
        type:String,
        required:[true,"name is Required"],
        trim:true,
        maxlength:[25,"name should not exceed 25 chars"],

    },
    slug:{
        type:String,
        lowercase:true
    }




},{
    timestamps:true 
})

export default mongoose.model("Collection",collectionSchema)