const express=require('express');
const router=express.Router();
const authMiddleware=require('../middlewares/auth.middleware')
const mapController=require('../controllers/map.controllers')
const {query}=require('express-validator')

// Validation Middleware
const validateAddress = [
    query('address')
        .isString()
        .withMessage('Address must be a string')
        .isLength({ min: 3 })
        .withMessage('Address must be at least 3 characters long'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

router.get('/get-coordinates',
    query('address').isString().isLength({min:3}),
    // validateAddress,
    authMiddleware.authUser,
    mapController.getCoordinates)

router.get('/get-distance-time',
    query('origin').isString().isLength({min:3}),
    query('destination').isString().isLength({min:3}),
    authMiddleware.authUser,
    mapController.getDistanceTime
)
router.get('/get-suggestions',
    query('input').isString().isLength({min:3}),
    authMiddleware.authUser,
    mapController.getAutoCompleteSuggestions

)




    module.exports=router; 

