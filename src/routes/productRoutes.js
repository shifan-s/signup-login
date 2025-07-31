import formidable from "express-formidable";
import express from "express"
import { createProduct,getAllProducts,singleProduct,productPhoto ,deleteProduct, updateProduct, filterProduct,productCount,productList} from "../controllers/productController.js";
import { isAdmin, isLoggedIn } from "../middleswares/authMiddlewares.js";
//import { productCount } from './../controllers/productController';

const router = express.Router()
router.post("/create-product", formidable(),createProduct)
router.get("/getall-product", getAllProducts)
router.get("/single-product/:slug",isLoggedIn,singleProduct )
router.get("/product-photo/:pid",productPhoto )
router.delete("/delete-Product/:pid",isLoggedIn,isAdmin,formidable(),deleteProduct )
router.put("/update-product",isLoggedIn ,formidable(),updateProduct)
router.post("/product-filters",filterProduct)
 //router.get("/product-count",productCount)
 //router. get("/product-list/:page",productList)

export default router;
