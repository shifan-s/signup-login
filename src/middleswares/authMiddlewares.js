import JWT from "jsonwebtoken"
import config from "../config/config.js"
import User from "../models/UserSchema.js"
import AuthRoles from "../utils/AuthRoles.js"

export const isLoggedIn =(req,res,next) =>{
    try{
        const decode = JWT.verify(req.headers.authorization,config.JWT_SECRET)
        req.user =decode
        console.log(req.user)
        next()
    }catch(error){
        console.log(error)
    }
  
}






export const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findOne(req.user._id);
        console.log(user)

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (user.role !== AuthRoles.ADMIN) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to access this resource"
            });
        }

        next(); // User is admin, proceed

    } catch (error) {
        console.error("isAdmin middleware error:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};



