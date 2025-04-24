import User from "../models/UserSchema.js"
import JWT from "jsonwebtoken"
import config from "../config/config.js"


export const cookieOptions = {
    expires : new Date(Date.now()+3*24*60*60*1000),httpOnly:true
}
  /*  
    * signUp
    * route :http://localhost:8080/api/v1/auth/signup
    * discription :user signup controller to create new user
    */
export const signUp = async(req,res) =>{


try{ 
    // Get the info from the front-end
    const {name,email,password,address,phone} = req.body

    // validate info
    if (!name|| !email ||!password ||!address||!phone){
        res.status(400).json({
            success :false,
            message : "Mandatory"
        })
    }
   // Check if the user is exist in our database
    const existingUser = await User.findOne({email })
 
    // if existing send the response
    if(existingUser) {
        res.status(200).json({
            success:false,
            message:"Already singin so please Login"
        })
    }
    // if not existing create a new user
    const user = await User.create({
        name,
        email,
        password,
        phone,
        address
    })
   user.password = undefined //:- For extra saftey 
    // Send a success msg to the user or frontend
  res.status(200).json({
    success:true,
    messag:"User successfully Signed Up",
user
  })

}catch (error){
console.log(error)
res.status(500).json({
    success :false,
    messag:`Error in singing up ${error}`,
    error
})
}
}




 /*  
    * login
    * route :http://localhost:8080/api/v1/auth/login
    * discription :user login controller to login existing user
    */
    // Get the info from the front-end

 export const login = async(req,res) =>{ 
    try{
        const {email,password} = req.body

         // validate info
        if (!email ||!password ){
            return res.status(400).json({
                success :false,
                message : "Invalid email or paasword"
            })
        }

         // if existing user
        const user = await User.findOne({email}).select("+password")
    

        // If user doesnt exist send response 
      
        if(!user){
            res.status(404).json({
                success:false,
                message:`No User Found Please signup First`
            })
           }


    //        //if user exist comapre password
           const isPasswordMatch = await user.comparePassword(password)
 


    //   // if password doesnt Match send the response
       if (!isPasswordMatch){
        res.status(400).json({
            success:false,
            message:`Invalid Password`
        })
       }


        //if password match generate JWT token 
         const token = JWT.sign({id:user._id,role:user.role},config.JWT_SECRET,{expiresIn:config.JWT_EXPIRY}) 

         //Fleshout Password
         user.password = undefined

        //setup cookie
        res.cookie("token",token,cookieOptions)


  
        //send success message to the user
        res.status(200).json({
            success:true,
            message:"Sucessfully logged In",
            user:{
                id :user._id,
                name : user.name,
                email:user.email,
                phone:user.phone,
                address:user.address,
                role :user.role,

            },
            token
        })


    }catch(error){
        console.log(error)
        res.status(500).json({
            success:false,
            message:`Error in login ${error}`,
            error
        })
    }

 }
  










