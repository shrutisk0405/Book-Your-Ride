const express = require('express');
const router=express.Router();
const {body}=require('express-validator');
const userController=require('../controllers/user.controller');
const authMiddleware=require('../middlewares/auth.middleware')

router.post('/register',
    [
        body('email').isEmail().withMessage("invalid email"),
        body('fullname.firstname').isLength({min:3}).withMessage("first name must be 3 chars long"),
        body('password').isLength({min:6}).withMessage("pass must be 6 chars long"),
    ],
    userController.registerUser
);
router.post('/login',[
    body('email').isEmail().withMessage("invalid email"),
    body('password').isLength({min:6}).withMessage("pass must be 6 chars long")

],
userController.loginUser
)
router.get('/profile',authMiddleware.authUser,userController.getuserProfile)
router.get('/logout',authMiddleware.authUser,userController.logoutUser)

module.exports =router;