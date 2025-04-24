import express from 'express'
import { login, signUp } from '../controllers/authControllers.js'
const router = express.Router()
// Routing 
//sign up ||method :Post
router.post("/signup",signUp)



// Login || method :Post
router.post("/login",login)



export default router 