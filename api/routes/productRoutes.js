import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { createProductController, deleteProductController, getProductController, getSingleProductController, productphotoController, updateProductController } from "../controllers/productContoller.js";
import formidable from "express-formidable";

const router = express.Router()

//routes
router.post('/create-product',requireSignIn,isAdmin,formidable(),createProductController)

router.get('/get-products',getProductController)

//get single product
router.get('/get-product/:slug',getSingleProductController)

//get photo
router.get('/product-photo/:pid',productphotoController)

//delete product
router.delete('/delete-product/:pid',requireSignIn,isAdmin,deleteProductController)

//update product 
router.put('/update-product/:pid',requireSignIn,isAdmin,formidable(),updateProductController)

export default router