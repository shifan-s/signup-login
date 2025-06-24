
import express from 'express'
import cookieParser from 'cookie-parser' 
import cors from 'cors'
import morgan from 'morgan'
import authRoutes from './routes/authRoutes.js'
import CollectionRoutes from './routes/CollectionRoutes.js'
import productRoutes from './routes/productRoutes.js'
import crypto from "crypto"
const app = express()
// Middle wares:- when 2 functions intract ,it plays role in middle

app.use(cors()) // it must be in first and intract with client which located in diff domain
app.use(express.json()) //Instructing the app to accept data in  json format
app.use(cookieParser() ) // 
app.use(morgan("dev")) //LOG REQ AND MORE TO THE CONTROL


//routes 
app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/collection",CollectionRoutes)
app.use("/api/v1/product",productRoutes)
//Generate secret Key
/*
const key = crypto.randomBytes(64).toString("hex")
console.log(key)
*/


app.get('/', (req, res) => {
    res.send('<h1 >Hello-World</h1>')
  }) 

  export default app