import express from 'express'
import { createCollection, deleteCollection, getAllCollection, singleCollection, updateCollection } from '../controllers/CollectionControllers.js'
import { isAdmin, isLoggedIn } from '../middleswares/authMiddlewares.js'

const router = express.Router()

// routes

router.post("/create-collection",isLoggedIn,isAdmin,createCollection)
router.get("/get-allcollection",getAllCollection)
router.put("/update-collection/:id",isLoggedIn,isAdmin,updateCollection)
router.delete("/delete-collection/:id",deleteCollection)
router.get("/single-collection/:slug/",singleCollection)
export default router