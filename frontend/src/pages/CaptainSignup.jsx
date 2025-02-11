import React, { useState } from 'react'; 
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CaptainContext, { CaptainDataContext } from '../context/CaptainContext';
const CaptainSignup = () => {

    const navigate=useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userData, setUserData] = useState({});

    const [vehicleColor, setVehicleColor] = useState('');
    const [vehiclePlate, setVehiclePlate] = useState('');
    const [vehicleCapacity, setVehicleCapacity] = useState('');
    const [vehicleType, setVehicleType] = useState('');

    const {captain,setCaptain}=React.useContext(CaptainDataContext);

    const submitHandler = async(e) => {
        e.preventDefault();
        const captainData={
            fullname: {
                firstname: firstName,
                lastname: lastName,
            },
            email: email,
            password: password,
            vehicle:{
                color:vehicleColor,
                plate:vehiclePlate,
                capacity:vehicleCapacity,
                vehicleType:vehicleType

            }
        };
        const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`,captainData)
       
        if(response.status===201){
            const data=response.data
            setCaptain(data.captain)
            localStorage.setItem('token',data.token);
            navigate('/captain-home');

        }

        setEmail('');
        setFirstName('');
        setLastName('');
        setPassword('');
        setVehicleColor('');
        setVehiclePlate('');
        setVehicleCapacity('');
        setVehicleType('');
    }

    return (
        <div className="p-7 h-screen flex flex-col justify-between">
            <div>
                <img className="w-16 mb-10" src="data:image/png;base64,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" alt="Logo" />
                <form onSubmit={submitHandler}>
                    <h3 className="text-base font-medium mb-2">Enter your name</h3>
                    <div className="flex gap-4 mb-6">
                        <input
                            required
                            className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-base placeholder:text-sm"
                            type="text"
                            placeholder="Enter Firstname"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <input
                            required
                            className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-base placeholder:text-sm"
                            type="text"
                            placeholder="Enter Lastname"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>

                    <h3 className="text-base font-medium mb-6">Enter Your Email</h3>
                    <input
                        required
                        className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
                        type="email"
                        placeholder="youremail@mail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <h3 className="text-base font-medium mb-2">Enter Password</h3>
                    <input
                        required
                        className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-base placeholder:text-sm"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <h3 className="text-base font-medium mb-2">Vehicle Information</h3>
                    <div className="flex gap-4 mb-6">
                        <input
                            required
                            className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-base placeholder:text-sm"
                            type="text"
                            placeholder="Vehicle Color"
                            value={vehicleColor}
                            onChange={(e) => setVehicleColor(e.target.value)}
                        />
                        <input
                            required
                            className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-base placeholder:text-sm"
                            type="text"
                            placeholder="Vehicle Plate"
                            value={vehiclePlate}
                            onChange={(e) => setVehiclePlate(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-4 mb-6">
                        <input
                            required
                            className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-base placeholder:text-sm"
                            type="number"
                            placeholder="Vehicle Capacity"
                            value={vehicleCapacity}
                            onChange={(e) => setVehicleCapacity(e.target.value)}
                        />
                        <select
                            required
                            className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-base placeholder:text-sm"
                            value={vehicleType}
                            onChange={(e) => setVehicleType(e.target.value)}
                        >
                            <option value="" disabled>Select Vehicle Type</option>
                            <option value="car">Car</option>
                            <option value="auto">Auto</option>
                            <option value="motorcycle">motorcycle</option>
                        </select>
                    </div>
                    <button className="bg-[#111] text-white font-semibold mb-5 rounded px-4 py-2 w-full text-base placeholder:text-sm">
                        Create Capitan Account
                    </button>
                </form>
                <p className="text-center leading-tight">
                    Already Have an Account? <Link to="/captain-login" className="text-blue-600">Login Here</Link>
                </p>
            </div>
            <div>
                <p className='text-[10px] mt-6 leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
          Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
            </div>
        </div>
    )
}

export default CaptainSignup;