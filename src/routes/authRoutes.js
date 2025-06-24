import express from 'express'
import { login, logOut, signUp, testController } from '../controllers/authControllers.js'
import { isAdmin, isLoggedIn } from '../middleswares/authMiddlewares.js'
import { singleCollection, updateCollection } from '../controllers/CollectionControllers.js'
const router = express.Router()
// Routing 
//sign up ||method :Post
router.post("/signup",signUp)


// Login || method :Post
router.post("/login",login)

//Protected user Route
router.get("/user-auth",isLoggedIn,(req,res) =>{
    res.status(200).json({
        ok:true
    })
})

// Test 

router.get("/test",isLoggedIn,isAdmin,testController)


// LogOut
router.post("/logout",logOut)

//Single delete
router.get("/single-collection/:slug",singleCollection)

export default router 