const rideService = require('../services/ride.service');
const {validationResult}=require('express-validator');
const mapService=require('../services/maps.service');
const {sendMessageToSocketId}=require('../socket');
const rideModel=require('../models/ride.model')
module.exports.createRide =async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});

    }
    const {userId,pickup,destination,vehicleType}=req.body;
    console.log("response for:",req.body)

    try{
        console.log("User Object galti check:", req.user);

        const ride=await rideService.createRide({user:req.user._id,pickup,destination,vehicleType});
        res.status(201).json(ride);
        
        const pickupCoordinates= await mapService.getAddressCoordinate(pickup);
        console.log("pickupCoordinates",pickupCoordinates);

        const CaptainsInRadius=await mapService.getCaptainsInTheRadius(pickupCoordinates.ltd,pickupCoordinates.lng,2);
        ride.otp=""

        const rideWithUser = await rideModel
       .findOne({ _id: ride._id })
       .populate('user');


        CaptainsInRadius.map(captain=>{
            // console.log(ride);
            console.log("___**___");
            console.log(captain,"helloooo___***____",rideWithUser)
            // console.log(captain,ride);
            console.log('captain in radius checked')
            sendMessageToSocketId(captain.socketId,{
                event:'new-ride',
                data: rideWithUser
                // data: ride
                   
            })

        })
        console.log("CaptainsInRadius",CaptainsInRadius);
       

    }catch(err){
        console.log(err)
        return res.status(500).json({message:err.message});

    }
}
module.exports.getFare = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // console.log(errors)
        return res.status(400).json({ errors: errors.array() });

    }

    const { pickup, destination } = req.query;

    try {
        const fare = await rideService.getFare(pickup, destination);
        return res.status(200).json(fare);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}
module.exports.confirmRide=async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {rideId}=req.body;

    try{
        const ride=await rideService.confirmRide({rideId,captain:req.captain});

        sendMessageToSocketId(ride.user.socketId,{
            event:'ride-confirmed',
            data:ride
        })
        res.status(200).json(ride);
    }catch(err){                   
        console.log(err);
        res.status(500).json({message:err.message});
    }
}
module.exports.startRide=async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {rideId,otp}=req.query;
    try{
        const ride=await rideService.startRide({rideId,otp,captain:req.captain});
        sendMessageToSocketId(ride.user.socketId,{
            event:'ride-started',
            data:ride
        })
        res.status(200).json(ride);
    }catch(err){
        console.log(err);
        res.status(500).json({message:err.message});
    }
}

module.exports.endRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await rideService.endRide({ rideId, captain: req.captain });

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride
        })



        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    } 
}