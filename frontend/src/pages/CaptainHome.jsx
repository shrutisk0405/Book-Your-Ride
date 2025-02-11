import React, { useContext, useRef,useState,useEffect } from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import {useGSAP} from'@gsap/react'
import gsap from 'gsap';
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import { CaptainDataContext } from "../context/CaptainContext";
import { SocketContext } from "../context/SocketContext";
import axios from "axios";
const CaptainHome = () => {
  const [ridePopUpPanel, setridePopUpPanel] = useState(false)
  const ridePopUpPanelRef = useRef(null)
  const [ConfirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false)
  const confirmRidePopUpPanelRef = useRef(null)
  const [ride,setRide]=useState(null)
  
  const {socket}=useContext(SocketContext)
  const {captain}=useContext(CaptainDataContext);

  useEffect(() =>{
    console.log("Captain ID:", captain._id);
    socket.emit('join',{
      userId:captain._id,
      userType:'captain'
    });

    const updateLocation= () =>{
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position)=>{

          console.log({
            userId: captain._id,
            location: {
              ltd: position.coords.longitude,
              lng: position.coords.latitude,
            }
          })
         
          socket.emit('update-location-captain',{
            userId:captain._id,
           location:
            {
              ltd:position.coords.latitude,
              lng:position.coords.longitude,
            }
          })
        })
      }
    }
    const locationInterval=setInterval(updateLocation,10000)
    updateLocation()

    // return ()=>clearInterval(locationInterval)

  })
  socket.on('new-ride',(data)=>{
    console.log("New ride received for captain:", data);
    setRide(data);
    setridePopUpPanel(true);
  })
  async function confirmRide() {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
        rideId: ride._id,
        captainId: captain._id,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log(response);
      setridePopUpPanel(false);
      setConfirmRidePopUpPanel(true);
    } catch (error) {
      console.error("Error confirming ride:", error);
      alert("Failed to confirm the ride. Please try again.");
    }
  }

  

  useGSAP(function(){
    if(ridePopUpPanel){
      gsap.to(ridePopUpPanelRef.current, {transform: 'translateY(0%)'})
    }
    else{
      gsap.to(ridePopUpPanelRef.current, {transform: 'translateY(100%)'})
    }
  }, [ridePopUpPanel])

  useGSAP(function(){
    if(ConfirmRidePopUpPanel){
      gsap.to(confirmRidePopUpPanelRef.current, {transform: 'translateY(0%)'})
    }
    else{
      gsap.to(confirmRidePopUpPanelRef.current, {transform: 'translateY(100%)'})
    }
  }, [ConfirmRidePopUpPanel])




  return (
    <div className="h-screen">
      {/* Top section with separated icons */}
      <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
        {/* Left Icon */}
        <div className="flex items-center">
          <img
            className="w-16"
            src="data:image/png;base64,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"
            alt="Icon 1"
          />
        </div>

        {/* Right Icon */}
        <Link
          to="/captain-home"
          className="fixed top-8 right-6 h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="ri-logout-box-r-line text-gray-900"></i>
        </Link>
      </div>

      {/* Profile Section */}
      <div className="h-1/2">
        <img
          className="h-full w-full object-cover"
          src="https://images.prismic.io/superpupertest/75d32275-bd15-4567-a75f-76c4110c6105_1*mleHgMCGD-A1XXa2XvkiWg.png?auto=compress,format&w=1966&h=1068"
          alt="Background"
        />
      </div>

      {/* Content Section */}
      <div className="h-1/2 p-4">
        <CaptainDetails />
      </div>
      
    <div  ref={ridePopUpPanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-8 pt-12'>
          <RidePopUp
          ride={ride}
          setridePopUpPanel={setridePopUpPanel}
          setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
          confirmRide={confirmRide}
           />
    </div>
    <div  ref={confirmRidePopUpPanelRef} className='fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-8 pt-12'>
          <ConfirmRidePopUp
          ride={ride}
           setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} setridePopUpPanel={setridePopUpPanel} />
    </div>

    </div>
  );
};

export default CaptainHome;
