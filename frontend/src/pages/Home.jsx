import React, { useContext, useEffect } from 'react'
import { useState,useRef } from 'react'
import {useGSAP} from'@gsap/react'
import gsap from 'gsap';
import axios from 'axios';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/confirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import { SocketContext } from '../context/SocketContext';
import {UserDataContext} from '../context/UserContext'
import { useNavigate } from 'react-router-dom';
import LiveTracking from '../components/LiveTracking';


const Home = () => {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const vehiclePanelRef = useRef(null)
  const confirmRidePanelRef = useRef(null)
  const vehicleFoundRef = useRef(null)
  const panelCloseRef = useRef(null)
  const panelRef = useRef(null)
  const waitingForDriverRef = useRef(null)
  const [vehiclePanel, setvehiclePanel] = useState(false)
  const [confirmRidePanel, setConfirmRidePanel] = useState(false)
  const [vehicleFound, setvehicleFound] = useState(false)
  const [waitingForDriver, setwaitingForDriver] = useState(false)
  const [ pickupSuggestions, setPickupSuggestions ] = useState([])
  const [ destinationSuggestions, setDestinationSuggestions ] = useState([])
  const [ activeField, setActiveField ] = useState(null)
  const [fare, setFare] = useState({})
  const [vehicleType, setvehicleType] = useState(null)
  const [ride, setRide] = useState(null)
  
//new code 
const navigate = useNavigate()
const {socket} =useContext(SocketContext) 
const {user}=useContext(UserDataContext)
const stableUserId = user?._id;
useEffect(() => {
  console.log(user);
  console.log("hiii");

  socket.emit("join", { userType: "user", userId: stableUserId });
}, [user]);
// useEffect(() => {
//   console.log(user);
//   console.log("hiii")

//   socket.emit("join",{userType:"user",userId:user._id})
// },[user])

socket.on('ride-confirmed', ride => {


  setvehicleFound(false);
  setwaitingForDriver(true)
  setRide(ride)
})

socket.on('ride-started', ride => {
  console.log("ride") 
  setwaitingForDriver(false)
  navigate('/riding', { state: { ride } }) // Updated navigate to include ride data
})


const handlePickupChange = async (e) => {
  setPickup(e.target.value)
  try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
          params: { input: e.target.value },
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
          }

      })

       console.log('Pickup Suggestions:', response.data); // Check the API response
       setPickupSuggestions(response.data);
       console.log(pickupSuggestions);
  } catch(error) {
      // handle error
      console.error('Error fetching pickup suggestions:', error);
  }
}
// useEffect(() => {
//   console.log('Updated Pickup Suggestions:', pickupSuggestions);
// }, [pickupSuggestions]);

const handleDestinationChange = async (e) => {
  setDestination(e.target.value)
  try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
          params: { input: e.target.value },
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
          }
      })
      setDestinationSuggestions(response.data)
  } catch(error) {
    // handle error
    console.error('Error fetching pickup destination:', error);
  }
}



 ///end 
  const submitHandler = (e) => {
    e.preventDefault()

  }
  useGSAP(function(){
   if(panelOpen){
    gsap.to(panelRef.current, {height: '70%', opacity:'1',padding:'2px', })
    gsap.to(panelCloseRef.current,{
    opacity: '1'
   })
   
   }
   else{
    gsap.to(panelRef.current, {height: '0%', 
      // opacity: '0%'
      padding:'0%'
    })
    gsap.to(panelCloseRef.current,{
      opacity: '0%'
     })
   }
  },[panelOpen])

  useGSAP(function(){
    if(vehiclePanel){
      gsap.to(vehiclePanelRef.current, {transform: 'translateY(0%)'})
    }
    else{
      gsap.to(vehiclePanelRef.current, {transform: 'translateY(100%)'})
    }
  },[vehiclePanel])

  useGSAP(function(){
    if(confirmRidePanel){
      gsap.to(confirmRidePanelRef.current, {transform: 'translateY(0%)'})
    }
    else{
      gsap.to(confirmRidePanelRef.current, {transform: 'translateY(100%)'})
    }
  }, [confirmRidePanel])

  useGSAP(function(){
    if(vehicleFound){
      gsap.to(vehicleFoundRef.current, {transform: 'translateY(0%)'})
    }
    else{
      gsap.to(vehicleFoundRef.current, {transform: 'translateY(100%)'})
    }
  }, [vehicleFound])
  
  useGSAP(function(){
    if(waitingForDriver){
      gsap.to(waitingForDriverRef.current, {transform: 'translateY(0%)'})
    }
    else{
      gsap.to(waitingForDriverRef.current, {transform: 'translateY(100%)'})
    }
  }, [waitingForDriver])

  async function findTrip(){
    setvehiclePanel(true);
    setPanelOpen(false);

    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
      params: { pickup, destination },
      headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
      }
  })
  console.log(response.data);
  setFare(response.data)


  }
  async function createRide(){
    const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`,{
      pickup,
      destination,
      vehicleType,
      
    },{
      headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    console.log("create ride ka response",response.data);

  }
  
  return (
    
    <div className='h-screen relative overflow-hidden'>
      <img className='w-16 absolute left-5 top-5'  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png"></img>

      <div  className='h-screen w-screen'>
        {/* image for temp use */}
        <LiveTracking/>
        </div>
    
    <div className=' flex flex-col justify-end h-screen absolute top-0 w-full '>
     <div className='h-[30%]  p-6 bg-white relative'>
      <h5 ref={panelCloseRef}
      onClick={()=>setPanelOpen(!panelOpen)}
      className='absolute opacity-0  flex flex-col items-center top-1 right-5 text-3xl space-y-0.2 '>
      
      <i className="ri-arrow-down-double-fill"></i>
      <i className="ri-arrow-down-double-fill"></i>
      </h5>
    
     <h4 className='text-3xl font-semibold'>Find a trip</h4>
     
      <form onSubmit={(e) => 
        {
          submitHandler(e)
        }}>
        
        <input  
        onClick={()=>{
          setPanelOpen(true)
          setActiveField('pickup')
        }}
        value={pickup}
        onChange={handlePickupChange}
        style={{
          backgroundColor: '#e6f7ff', // Light blue background
          width: '100%', // Full width
          padding: '10px 12px', // Padding inside the input
          margin: '10px 0', // Space between inputs
          border: '1px solid #ccc', // Light border
          borderRadius: '8px', // Rounded corners
          fontSize: '14px', // Font size
          color: '#333', // Text color
          outline: 'none', // Remove default outline
  }} type="text" placeholder="Add a pick-up location"></input>
  

        <input 
         onClick={() => {
          setPanelOpen(true)
          setActiveField('destination')
      }}
        value={destination}
        onChange={handleDestinationChange}
         style={{
          backgroundColor: '#e6f7ff', // Light blue background
          width: '100%', // Full width
          padding: '10px 12px', // Padding inside the input
          margin: '10px 0', // Space between inputs
          border: '1px solid #ccc', // Light border
          borderRadius: '8px', // Rounded corners
          fontSize: '14px', // Font size
          color: '#333', // Text color
           // Remove default outline
            }}
             type="text" placeholder="Enter your Destination"></input>
                </form>
                <div className='  bg-black-400 '>
                <button 
                onClick={findTrip}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full"
                >
            Find trip
                </button>
                </div>
              
               </div>

               {/* when h-[0] the second screen is below and when h-[70%] second screen comes upr and form go more */}
     <div ref={panelRef} className='  bg-[#a5f3fc] h-0' >
      <LocationSearchPanel
        suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
        setPanelOpen={setPanelOpen} 
        setvehiclePanel={setvehiclePanel}
        setPickup={setPickup}
        setDestination={setDestination}
        activeField={activeField}

        />
     </div>
    </div>
    
    <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-8 pt-12'>
          <VehiclePanel 
          selectVehicle={setvehicleType} fare={fare} setConfirmRidePanel={setConfirmRidePanel} setvehiclePanel={setvehiclePanel} />
    </div>
    <div ref={confirmRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
          <ConfirmRide
          pickup={pickup}
          destination={destination}
            createRide={createRide}
            fare={fare}
            vehicleType={vehicleType}
           setConfirmRidePanel={setConfirmRidePanel} setvehicleFound={setvehicleFound}/>

    </div>
    <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
          <LookingForDriver 
           pickup={pickup}
           destination={destination}
             createRide={createRide}
             fare={fare}
             vehicleType={vehicleType}
          setvehicleFound={setvehicleFound} />
          
    </div>
    <div ref={waitingForDriverRef} className='fixed w-full z-10 bottom-0 bg-white px-3 py-6 pt-12'>
          <WaitingForDriver
          ride={ride}
          setvehicleFound={setvehicleFound}
          setwaitingForDriver={setwaitingForDriver}
           waitingForDriver={waitingForDriver} />
          
    </div>
        

    </div>
  ) 
}

export default Home