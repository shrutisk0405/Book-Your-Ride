import React ,{useContext} from 'react'
import {CaptainDataContext }from '../context/CaptainContext'
const CaptainDetails = () => {
  const { captain }=useContext(CaptainDataContext)
  return (
    
    <div>
        <div className="flex flex-col items-start gap-4">
          <div className="flex items-center gap-4">
            <img className="h-14 w-14 rounded-full object-cover border-2 border-blue-500"
              src="https://resize.indiatvnews.com/en/resize/newbucket/1080_-/2023/05/bts-kim-taehyung-airport-pics-1684124471.jpg"
              alt="Profile"
            />
            <h4 className="text-xl font-semibold capitalize">{captain.fullname.firstname+" "+captain.fullname.lastname}</h4>
         </div>
         <div>
              
              <h4 className="text-md font-medium">Rs 296.2</h4>
              <p className="text-sm text-gray-500 font-medium">Earned</p>
         </div>
         </div>
        

          {/* Hours Online Section */}
          <div className='flex p-3 mt-8 bg-gray-100 rounded-xl justify-center gap-5 items-start'>
            <div className="text-center">
              <i className="text-2xl font-thin ri-timer-2-line"></i>
              <h5 className="text-lg font-medium">10.2</h5>
              <p className="text-sm text-gray-500 font-medium">Hours Online</p>
            </div>
            <div className="text-center">
              <i className="text-2xl font-thin ri-roadster-fill"></i>
              <h5 className="text-lg font-medium">12.5</h5>
              <p className="text-sm text-gray-500 font-medium">Miles Driven</p>
            </div>
            <div className="text-center">
              <i className="text-2xl font-thin ri-road-map-line"></i>
              <h5 className="text-lg font-medium">8.3</h5>
              <p className="text-sm text-gray-500 font-medium">Trips Completed</p>
            </div>
          </div>

    
        
    </div>
  )
}

export default CaptainDetails