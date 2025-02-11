import React from "react";

const confirmRide = (props) => {
  return (
    <div>
      <h5
        className="p-1 w-[93%] text-center absolute top-0 "
        onClick={() => {
          props.setConfirmRidePanel(false)
        }}
      >
        <i className=" text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Confirm Your ride</h3>
      <div className="flex gap-2 justify-between flex-col items-center">
        <img
          className="h-20"
          src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
        ></img>
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
               {props.pickup}
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
                  Destination
                </span>{" "}
                {props.destination}
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
                {props.fare[props.vehicleType]}
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
      <button onClick={()=>{
        props.setvehicleFound(true)
        props.setConfirmRidePanel(false)
        props.createRide()
      }} className="w-full bg-green-600 text-white font-semibold p-3 rounded-xl">
        Confirm
      </button>
    </div>
  );
};

export default confirmRide;
