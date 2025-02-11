import axios from 'axios'
import React from 'react'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const FinishRide = (props) => {
  const navigate=useNavigate()
  async function endRide() {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, { rideId: props.ride._id }, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        console.log("Response:", response.data);  // Debugging

        if (response.status === 200) {
            navigate('/captain-home');
        }
    } catch (error) {
        console.error("Error:", error.response?.data || error.message);
    }
}

  return (
    <div >
    <h5
    className="p-1 w-[93%] text-center absolute top-0 "
    onClick={() => {
      props.setfinishRidePanel(false)
    }}
  >
    <i className=" text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
  </h5>
  <h3 className="text-2xl font-semibold mb-5">Finish This Ride!</h3>

  <div className='flex items-center justify-between p-3 bg-[#cffafe] rounded-lg border-[#67e8f9] mt-4'>
    <div className='flex items-center gap-3 '>
        <img className="h-12 w-12 object-cover rounded-full" src="https://photosking.net/wp-content/uploads/iphone-girls-dp_25.webp"/>
        <h2 className='text-lg text-block'>{props.ride?.user.fullname.firstname} </h2>
    </div>
    <h5 className='text-sm text-block font-semibold'> 2.2km</h5>
  </div>
  <div className="flex gap-2 justify-between flex-col items-center">
   
  </div>
  <div className="w-full">
    <div>
      {/* Destination */}
      <div
        style={{
          display: "flex",
          gap: "1.25rem",
          alignItems: "center",

          padding: "10px",
          borderRadius: "8px",
          marginBottom: "10px",
        }}
      >
        <i
          className="ri-map-pin-2-fill"
          style={{ fontSize: "1.25rem", color: "#111827" }} // Tailwind's text-gray-900
        ></i>
        <div>
          <h3
            style={{
              fontSize: "1rem",
              fontWeight: "600",
              color: "#1f2937", // Tailwind's gray-800
            }}
          >
            <span style={{ color: "#3b82f6" /* Blue color */ }}>
              Pickup:
            </span>{" "}
            {props.ride?.pickup}
          </h3>
          
        </div>
      </div>

      {/* From */}
      <div
        style={{
          display: "flex",
          gap: "1.25rem",
          alignItems: "center",

          padding: "10px",
          borderRadius: "8px",
          marginBottom: "10px",
        }}
      >
        <i
          className="ri-map-pin-user-fill"
          style={{ fontSize: "1.25rem", color: "#111827" }} // Tailwind's text-gray-900
        ></i>
        <div>
          <h3
            style={{
              fontSize: "1rem",
              fontWeight: "600",
              color: "#1f2937", // Tailwind's gray-800
            }}
          >
            <span style={{ color: "#10b981" /* Green color */ }}>
              Destination:
            </span>{" "}
           {props.ride?.destination}
          </h3>
          
        </div>
      </div>

      {/* Amount to Pay */}
      <div
        style={{
          display: "flex",
          gap: "1.25rem",
          alignItems: "center",

          padding: "10px",
          borderRadius: "8px",
          marginBottom: "10px",
        }}
      >
        <i
          className="ri-currency-line"
          style={{ fontSize: "1.25rem", color: "#111827" }} // Tailwind's text-gray-900
        ></i>
        <div>
          <h3
            style={{
              fontSize: "1rem",
              fontWeight: "600",
              color: "#1f2937", // Tailwind's gray-800
            }}
          >
            <span style={{ color: "#facc15" /* Yellow color */ }}>
              Amount:
            </span>{" "}
            Rs {props.ride?.fare}
          </h3>
          <p
            style={{
              fontSize: "0.875rem",
              marginTop: "-4px",
              color: "#6b7280", // Tailwind's gray-600
            }}
          >
            Pay
          </p>
        </div>
      </div>
    </div>
  </div>
  

  <div className='justify-between flex gap-2'>
  <button onClick={endRide}
  className="w-full flex justify-center bg-green-600 text-[#dcfce7] font-semibold p-3 rounded-xl">
    Complete Ride
  </button>
 
  
  </div>
  <h6 className='text-red-500 mt-6 text-xs'> Payment method to be implemented</h6>
  <p className='text-red-500 mt-6 text-xs'>Click on finish ride only if payment is complete</p>
  
  
  </div>
  )
}

export default FinishRide