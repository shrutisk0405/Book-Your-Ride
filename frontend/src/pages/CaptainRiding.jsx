import React from 'react'
import { Link,useLocation } from 'react-router-dom'
import FinishRide from '../components/FinishRide'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'
import { useState } from 'react'
import LiveTracking from '../components/LiveTracking'

const CaptainRiding = () => {


    const [finishRidePanel, setfinishRidePanel] = useState(false)
    const finishRidePanelRef = useRef(null)
    const location=useLocation()
    const rideData=location.state?.ride
    console.log(rideData)

    useGSAP(function(){
        if(finishRidePanel){
          gsap.to(finishRidePanelRef.current, {transform: 'translateY(0%)'})
        }
        else{
          gsap.to(finishRidePanelRef.current, {transform: 'translateY(100%)'})
        }
      }, [finishRidePanel])
 
    return (
    <div className="h-screen relative flex flex-col justify-end">
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
      
      {/* Content Section */}
      <div className="h-1/5 p-6 flex items-center justify-between relative  bg-[#cffafe] "
       onClick={()=>{
        setfinishRidePanel(true);
       }}>


      <h5 className="p-1  text-center w-[95%] absolute top-1 pr-12">
     <i className=" text-3xl text-gray-400  ri-arrow-up-wide-line top-0"></i></h5>
      <h4 className='text-xl font-semibold'>1 KM Away</h4>
      <button className="bg-green-600 text-[#dcfce7] font-semibold p-3 rounded-xl"> Complete Ride</button>
    </div>
    <div  ref={finishRidePanelRef} className='fixed w-full z-10 bottom-0 trans-y-full bg-white px-3 py-8 pt-12'>
          <FinishRide 
          ride={rideData}
           setfinishRidePanel={setfinishRidePanel} />
    </div>
    <div className="h-screen fixed w-full top-0 z-[-1]">
        <LiveTracking />
      </div>

    
    </div>
  )
}

export default CaptainRiding