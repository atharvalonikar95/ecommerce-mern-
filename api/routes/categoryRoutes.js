import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'
import { createcategoryController, deleteCategoryController, getCategoryController, singleCategoryController, updateCategoryController } from '../controllers/categoryController.js'

const router = express.Router()

//routes
//create category
router.post('/create-category',requireSignIn,isAdmin,createcategoryController)

//update category
router.put('/update-category/:id',requireSignIn,isAdmin,updateCategoryController)

//get all category
router.get('/getcategory',getCategoryController)

// get single category 
router.get('/single-category/:slug',singleCategoryController)

//delete category
router.delete('/delete-category/:id',requireSignIn,isAdmin,deleteCategoryController)

export default router