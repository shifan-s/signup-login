import mongoose from "mongoose";
import AuthRoles from "../utils/AuthRoles.js";
import bcrypt from "bcrypt"
const userSchema = new mongoose.Schema({
    name :{
        type:String,
        required:[true,"name is required"],
        trim:true,
        maxlength:[25,"Name should not exceed 25 charachter"]
    },email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
    },password:{
        type:String,
      
        minlength:[8,"Must contain atleast 8 characters"],
        select:false
    },phone :{
        type:String,
        required:true 
    },address :{
        type:String,
        maxlength:[120,"donot exceed 120 characters"],
        trim:true,
        required:[true,"address is required"]
    },role:{
        type:String,
        enum:Object.values.AuthRoles,
        default:AuthRoles.USER , 
    }
},{
    timestamps:true
})
userSchema.pre("save",async function(next){
 if (!this.isModified ("password")) return next ()
    this.password=await bcrypt.hash(this.password,10)
})




// Schema Methods

userSchema.methods ={
    comparePassword:async function (enteredPassword) {
        return await bcrypt.compare(enteredPassword,this.password)
    }
}

export default mongoose.model("User",userSchema)