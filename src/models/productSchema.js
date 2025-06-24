import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    name: {
          type:String,
          required:[true ,"name is required"],
          trim:true,
          maxlength:[25,"name should not exceed 25 charecter"]
    },
    slug:{
          type:String,
          required:true
    },

    description:{
                type:String,
                required:[true,"product description is required"],
                 trim:true,
                 maxlength:[100,"decription should not exceed 100 charcter"]
    },

    price:{
           type:Number,
           required :[true,"price is required"],
    },

    collection:{
                type:mongoose.ObjectId,//relationship connecting an object
                ref:"Collection",
                required:true,

    },
     quantity:{
               type:Number,
               required:true,
     },
    photo:{
            data:Buffer,
            contentType:String,
    },

    shipping:{
               type:Boolean
    }
},{timestamps:true})




export default mongoose.model("Product",productSchema)