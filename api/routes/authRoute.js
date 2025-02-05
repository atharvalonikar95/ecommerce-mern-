import express from 'express'
import { forgotpasswordController, loginController, registerController, testController } from '../controllers/authController.js'
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'

//router object
const router = express.Router()

//routing
//register || method : POST
router.post('/register',registerController)
router.post('/login',loginController)

//forgot password ||post
router.post('/forgotpassword',forgotpasswordController)

//test route
router.get('/test',requireSignIn,isAdmin,testController)

//protected route auth for user
router.get('/user-auth',requireSignIn,(req,res)=>{
    res.status(200).send({ok:true})
})

//protected route auth for admin
router.get('/admin-auth',requireSignIn,isAdmin,(req,res)=>{
    res.status(200).send({ok:true})
})

export default router