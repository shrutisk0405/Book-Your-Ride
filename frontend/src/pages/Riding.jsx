import React from "react";
import {Link,useLocation} from 'react-router-dom' 
import { useEffect,useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import { useNavigate } from "react-router-dom";
import LiveTracking from "../components/LiveTracking";
const Riding = () => {
  const location=useLocation();
  const {ride}=location.state||{};
  const {socket}=useContext(SocketContext)
  const navigate=useNavigate()

  socket.on("ride-ended", () =>{
    navigate('/home')
  })


  return (
    <div className="h-screen">
        <Link to='/home' className="fixed left-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full">
        <i className="text-xl font-bold ri-home-2-line"></i>
        </Link>
      <div className="h-1/2">
        <LiveTracking />
      </div>
      <div className="h-1/2 p-2">
        <div className="flex items-center justify-between pl-10 pr-10">
          <img
            className="h-14"
            src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
          ></img>
          <div className=" ">
            <h2 className="text-medium font-medium">{ride?.captain.fullname.firstname}</h2>
            <h4 className="text-medium font-semibold -mt-1 -mb-1">{ride?.captain.vehicle.plate}</h4>
            <p className="text-sm text-gray-600">Wagon-R</p>
          </div>
        </div>
        <div className="flex gap-2 justify-between flex-col items-center"></div>
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
                    Destination:
                  </span>{" "}
                 {ride?.destination}
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
                  {ride?.fare}
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
        <button className="w-full bg-green-600 text-white font-semibold p-3 rounded-xl">Make Your Payment</button>
      </div>
    </div>
  );
};

export default Riding;
