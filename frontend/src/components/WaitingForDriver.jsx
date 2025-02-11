import React from "react";

const WaitingForDriver = (props) => {
 
  return (
    
      <div>
        <h5
          className="p-1 w-[93%] text-center absolute top-0 "
          onClick={() => {
            props.waitingForDriver(false);
          }}
        >
          <i className=" text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
        </h5>
        <div className="flex items-center justify-between pl-10 pr-10">
          <img
            className="h-14"
            src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
          ></img>
          <div className=" ">
            <h2 className="text-medium font-medium captalize">{props.ride?.captain.fullname.firstname}</h2>
            <h4 className="text-medium font-semibold -mt-1 -mb-1">{props.ride?.captain.vehicle.plate}</h4>
            <p className="text-sm text-gray-600">Wagon-R</p>
            <h1 className='text-lg font-semibold'>  {props.ride?.otp} </h1>
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
      </div>
    
  );
};

export default WaitingForDriver;
