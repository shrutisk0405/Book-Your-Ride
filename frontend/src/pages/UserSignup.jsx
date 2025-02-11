import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios'
import {UserDataContext} from '../context/UserContext'
import { useContext } from 'react'
const UserSignup = () => {
    const [firstName,setfirstName] =useState('')
    const [lastName,setlastName] =useState('')
    const [email,setemail] = useState('')
    const [password,setpassword] = useState('')
    const[userData,setUserData] = useState({})

    const navigate=useNavigate()

    const {user,setUser} = useContext(UserDataContext)
    const submitHandler = async(e) =>{
        e.preventDefault()
        const newUser={
            fullname:{
                        firstname:firstName,
                        lastname:lastName
                    },
                    email:email,
                    password:password

        }
        const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`,newUser)
        console.log("POST URL:", `${import.meta.env.VITE_BASE_URL}/users/register`);
        if(response.status===201){
            const data=response.data
            setUser(data.user)
            localStorage.setItem('token', data.token)
            navigate('/home')
        }


        setemail('');
        setfirstName('');
        setlastName('');
        setpassword('');
        


    }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
    <div>
    <img className='w-16 mb-10'  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png"></img>
    <form onSubmit={(e)=>{submitHandler(e)}}>

    <h3  className='text-base font-medium mb-2 ' >Enter your name</h3>
    <div className='flex gap-4 mb-6'>
    <input 
    required 
    className='bg-[#eeeeee] w-1/2   rounded px-4 py-2 border  text-base placeholder:text-sm'
    type='text' 
    placeholder='Enter Firstname'
    value={firstName} 
    onChange={(e)=>
        setfirstName(e.target.value)}
    />
    <input 
    required 
    className='bg-[#eeeeee]  w-1/2  rounded px-4 py-2 border  text-base placeholder:text-sm'
    type='text' 
    placeholder='Enter Lastname'
    value={lastName} 
    onChange={(e)=>
        setlastName(e.target.value)}/>

    </div>
   
    
    <h3  className='text-base font-medium mb-6 ' >Enter Your Email</h3>
    <input 
    required 
    
    className='bg-[#eeeeee] mb-6  rounded px-4 py-2 border w-full text-base placeholder:text-sm'
    type='email' 
    placeholder='youremail@mail.com'
    value={email} 
    onChange={(e)=>
        setemail(e.target.value)}/>
    <h3  className='text-base font-medium mb-2 ' >Enter Password</h3>
    <input 
    required 
    
    className='bg-[#eeeeee] mb-6  rounded px-4 py-2 border w-full text-base placeholder:text-sm'
    
    placeholder='password'
    value={password}  
    onChange={(e)=>
        setpassword(e.target.value)}
        />
    <button
    className='bg-[#111] text-white font-semibold mb-5  rounded px-4 py-2 w-full text-base placeholder:text-sm'
    > Login</button>
    
    
    </form>
    <p className='text-center leading-tight'>Already Have a Account?<Link to='/login' className='text-blue-600 '>Login Here</Link></p>
    </div>
    <div>
        <p className='text-[10px]'>By proceeding, you consent to get calls, WhatsApp or SMS messages, including by automated means, from Uber and its affiliates to the number provided.</p>
        
    </div>
</div>
  )
}

export default UserSignup