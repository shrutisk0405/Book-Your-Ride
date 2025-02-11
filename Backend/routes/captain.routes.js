const express = require('express');
const router= express.Router();
const {body}=require('express-validator');
const captainController=require('../controllers/captain.controller');
const authMiddleware= require('../middlewares/auth.middleware')


router.post('/register',[
        body('email').isEmail().withMessage("invalid email"),
        body('fullname.firstname').isLength({min:3}).withMessage("first name must be 3 chars long"),
        body('password').isLength({min:6}).withMessage("pass must be 6 chars long"),
        body('vehicle.color').isLength({min:3}).withMessage('color must be 3 chars long'),
        body('vehicle.plate').isLength({min:3}).withMessage('plate must be 3 chars long'),
        body('vehicle.capacity').isInt({min:1}).withMessage('capacity must be at least 1'),
        body('vehicle.vehicleType').isIn(['car','motorcycle','auto']).withMessage('Invalid type')
],
captainController.registerCaptain)

router.post('/login',[
    body('email').isEmail().withMessage("invalid email"),
    body('password').isLength({min:6}).withMessage("pass must be 6 chars long"),
],
captainController.loginCaptain
)
router.get('/profile',authMiddleware.authCaptain,captainController.getCaptainProfile);

router.get('/logout',authMiddleware.authCaptain,captainController.logOutCaptain);
module.exports=router;