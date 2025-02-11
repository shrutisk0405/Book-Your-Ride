import React from 'react'
import { useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ConfirmRidePopUp = (props) => {
  const navigate = useNavigate()

    const [otp, setotp] = useState('')
    const submitHandler=async (e)=>{
        e.preventDefault()

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
          params: {
              rideId: props.ride._id,
              otp: otp
          },
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
          }
      })
      if(response.status===200){
        props.setConfirmRidePopUpPanel(false)
        props.setridePopUpPanel(false)
        navigate('/captain-riding', { state: { ride: props.ride } });

      }
    }
  return (
    <div >
    <h5 className="p-1 w-[93%] text-center absolute top-0 " onClick={() => {
      props.setridePopUpPanel(false)
    }}><i className=" text-3xl text-gray-200 ri-arrow-down-wide-line"></i> </h5>
    <h3 className="text-2xl font-semibold mb-5">Confirm and Let's GO!</h3>
  <div className='flex items-center justify-between p-3 bg-[#cffafe] rounded-lg border-[#67e8f9] mt-4'>
    <div className='flex items-center gap-3 '>
        <img className="h-12 w-12 object-cover rounded-full" src="https://photosking.net/wp-content/uploads/iphone-girls-dp_25.webp"/>
        <h2 className='text-lg text-block capitalize'>{props.ride?.user.fullname.firstname}</h2>
    </div>
    <h5 className='text-sm text-block font-semibold'> 2.2km</h5>
  </div>
  <div className="flex gap-2 justify-between flex-col items-center">
   
  </div>
  <div className="w-full mt-5">
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
            ₹{props.ride?.fare}
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
  <div className='mt-6 w-full'>
  <form onSubmit={submitHandler}>
    <input value={otp} onChange={(e)=>setotp(e.target.value)} type="text" placeholder='Enter OTP' style={{
          backgroundColor: '#e6f7ff', // Light blue background
          width: '100%', // Full width
          padding: '12px 12px', // Padding inside the input
          margin: '10px 0', // Space between inputs
          border: '1px solid #ccc', // Light border
          borderRadius: '8px', // Rounded corners
          fontSize: '14px', // Font size
          color: '#333', // Text color
          outline: 'none', // Remove default outline
          fontFamily: 'monospace', // Monospace font
  }}/>

  <div className='justify-between flex gap-2'>
  <button
  className="w-full flex justify-center bg-green-600 text-[#dcfce7] font-semibold p-3 rounded-xl">
    Confirm
  </button>
  <button onClick={()=>{
    props.setConfirmRidePopUpPanel(false)
    props.setridePopUpPanel(false)
   
  }} className="w-full bg-[#b91c1c] text-[#fef2f2] font-semibold p-3 rounded-xl">
    Cancel
  </button>
  </div>
  </form>
  </div>
  </div>
  )
}



export default ConfirmRidePopUp

// import React from 'react'
// import { useState } from 'react'
// import {Link} from 'react-router-dom'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'

// const ConfirmRidePopUp = (props) => {
//   const navigate = useNavigate()

//     const [otp, setotp] = useState('')
//     const submitHandler=async (e)=>{
//         e.preventDefault()

//         const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
//           params: {
//               rideId: props.ride._id,
//               otp: otp
//           },
//           headers: {
//               Authorization: `Bearer ${localStorage.getItem('token')}`
//           }
//       })
//       if(response.status===200){
//         props.setConfirmRidePopUpPanel(false)
//         props.setridePopUpPanel(false)
//         navigate('/captain-riding', { state: { ride: props.ride } });

//       }
//     }
//   return (
//     <div >
//     <h5 className="p-1 w-[93%] text-center absolute top-0 " onClick={() => {
//       props.setridePopUpPanel(false)
//     }}><i className=" text-3xl text-gray-200 ri-arrow-down-wide-line"></i> </h5>
//     <h3 className="text-2xl font-semibold mb-5">Confirm and Let's GO!</h3>
//   <div className='flex items-center justify-between p-3 bg-[#cffafe] rounded-lg border-[#67e8f9] mt-4'>
//     <div className='flex items-center gap-3 '>
//         <img className="h-12 w-12 object-cover rounded-full" src="https://photosking.net/wp-content/uploads/iphone-girls-dp_25.webp"/>
//         <h2 className='text-lg text-block capitalize'>dekho user confirm</h2>
//     </div>
//     <h5 className='text-sm text-block font-semibold'> 2.2km</h5>
//   </div>
//   <div className="flex gap-2 justify-between flex-col items-center">
   
//   </div>
//   <div className="w-full mt-5">
//     <div>
//       {/* Destination */}
//       <div
//         style={{
//           display: "flex",
//           gap: "1.25rem",
//           alignItems: "center",

//           padding: "10px",
//           borderRadius: "8px",
//           marginBottom: "10px",
//         }}
//       >
//         <i
//           className="ri-map-pin-2-fill"
//           style={{ fontSize: "1.25rem", color: "#111827" }} // Tailwind's text-gray-900
//         ></i>
//         <div>
//           <h3
//             style={{
//               fontSize: "1rem",
//               fontWeight: "600",
//               color: "#1f2937", // Tailwind's gray-800
//             }}
//           >
//             <span style={{ color: "#3b82f6" /* Blue color */ }}>
//               Pickup:
//             </span>{" "}
//             {props.ride?.pickup}
//           </h3>
          
//         </div>
//       </div>

//       {/* From */}
//       <div
//         style={{
//           display: "flex",
//           gap: "1.25rem",
//           alignItems: "center",

//           padding: "10px",
//           borderRadius: "8px",
//           marginBottom: "10px",
//         }}
//       >
//         <i
//           className="ri-map-pin-user-fill"
//           style={{ fontSize: "1.25rem", color: "#111827" }} // Tailwind's text-gray-900
//         ></i>
//         <div>
//           <h3
//             style={{
//               fontSize: "1rem",
//               fontWeight: "600",
//               color: "#1f2937", // Tailwind's gray-800
//             }}
//           >
//             <span style={{ color: "#10b981" /* Green color */ }}>
//               Destination:
//             </span>{" "}
//             {props.ride?.destination}
//           </h3>
          
//         </div>
//       </div>

//       {/* Amount to Pay */}
//       <div
//         style={{
//           display: "flex",
//           gap: "1.25rem",
//           alignItems: "center",

//           padding: "10px",
//           borderRadius: "8px",
//           marginBottom: "10px",
//         }}
//       >
//         <i
//           className="ri-currency-line"
//           style={{ fontSize: "1.25rem", color: "#111827" }} // Tailwind's text-gray-900
//         ></i>
//         <div>
//           <h3
//             style={{
//               fontSize: "1rem",
//               fontWeight: "600",
//               color: "#1f2937", // Tailwind's gray-800
//             }}
//           >
//             <span style={{ color: "#facc15" /* Yellow color */ }}>
//               Amount:
//             </span>{" "}
//             ₹{props.ride?.fare}
//           </h3>
//           <p
//             style={{
//               fontSize: "0.875rem",
//               marginTop: "-4px",
//               color: "#6b7280", // Tailwind's gray-600
//             }}
//           >
//             Pay
//           </p>
//         </div>
//       </div>
//     </div>
//   </div>
//   <div className='mt-6 w-full'>
//   <form onSubmit={submitHandler}>
//     <input value={otp} onChange={(e)=>setotp(e.target.value)} type="text" placeholder='Enter OTP' style={{
//           backgroundColor: '#e6f7ff', // Light blue background
//           width: '100%', // Full width
//           padding: '12px 12px', // Padding inside the input
//           margin: '10px 0', // Space between inputs
//           border: '1px solid #ccc', // Light border
//           borderRadius: '8px', // Rounded corners
//           fontSize: '14px', // Font size
//           color: '#333', // Text color
//           outline: 'none', // Remove default outline
//           fontFamily: 'monospace', // Monospace font
//   }}/>

//   <div className='justify-between flex gap-2'>
//   <button
//   className="w-full flex justify-center bg-green-600 text-[#dcfce7] font-semibold p-3 rounded-xl">
//     Confirm
//   </button>
//   <button onClick={()=>{
//     props.setConfirmRidePopUpPanel(false)
//     props.setridePopUpPanel(false)
   
//   }} className="w-full bg-[#b91c1c] text-[#fef2f2] font-semibold p-3 rounded-xl">
//     Cancel
//   </button>
//   </div>
//   </form>
//   </div>
//   </div>
//   )
// }

// export default ConfirmRidePopUp