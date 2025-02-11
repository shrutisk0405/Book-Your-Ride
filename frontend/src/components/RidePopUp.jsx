import React from 'react'

const RidePopUp = (props) => {
  console.log("props in ride popup",props);
  return (
    <div>
      <h5
        className="p-1 w-[93%] text-center absolute top-0"
        onClick={() => {
          props.setridePopUpPanel(false)
        }}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">New Ride Awaits!</h3>

      <div className='flex items-center justify-between p-3 bg-[#cffafe] rounded-lg border-[#67e8f9] mt-4'>
        <div className='flex items-center gap-3'>
          <img className="h-12 w-12 object-cover rounded-full" src="https://photosking.net/wp-content/uploads/iphone-girls-dp_25.webp" />
          <h2 className='text-lg text-block'>{props.ride?.user.fullname.firstname +" " +props.ride?.user.fullname.lastname}</h2>
        </div>
        <h5 className='text-sm font-semibold'>2.2km</h5>
      </div>

      <div className="w-full">
        {/* Pickup Location */}
        <div className="flex gap-4 items-center p-3 bg-white rounded-lg mb-4">
          <i className="ri-map-pin-2-fill text-xl text-gray-900"></i>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              <span className="text-blue-600">Pickup:</span> {props.ride?.pickup}
            </h3>
          </div>
        </div>

        {/* Destination */}
        <div className="flex gap-4 items-center p-3 bg-white rounded-lg mb-4">
          <i className="ri-map-pin-user-fill text-xl text-gray-900"></i>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              <span className="text-green-600">Destination:</span> {props.ride?.destination}
            </h3>
          </div>
        </div>

        {/* Fare */}
        <div className="flex gap-4 items-center p-3 bg-white rounded-lg mb-4">
          <i className="ri-currency-line text-xl text-gray-900"></i>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              <span className="text-yellow-400">Amount:</span> ₹{props.ride?.fare}
            </h3>
            <p className="text-sm text-gray-500">Pay</p>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2 justify-between">
        <button
          onClick={() => {
            props.setConfirmRidePopUpPanel(true)
            props.confirmRide()
          }}
          className="w-full bg-green-600 text-[#dcfce7] font-semibold p-3 rounded-xl"
        >
          Accept
        </button>
        <button
          onClick={() => {
            props.setridePopUpPanel(false)
          }}
          className="w-full bg-[#fee2e2] text-[#b91c1c] font-semibold p-3 rounded-xl"
        >
          Ignore
        </button>
      </div>
    </div>
  )
}

export default RidePopUp
