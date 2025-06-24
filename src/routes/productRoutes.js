import formidable from "express-formidable";
import express from "express"
import { createProduct,getallproducts,singleProduct,productPhoto ,deleteProduct} from "../controllers/productController.js";
import { isAdmin, isLoggedIn } from "../middleswares/authMiddlewares.js";


const router = express.Router()
router.post("/create-product", formidable(),createProduct)
router.get("/getall-product",getallproducts)
router.get("/single-product/:slug",isLoggedIn,singleProduct )
router.get("/product-photo/:pid",productPhoto )
router.delete("/delete-Product/:pid",isLoggedIn,isAdmin,deleteProduct )
export default router;