import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios'
import {UserDataContext} from '../context/UserContext'
import { useContext } from 'react'
const UserLogin = () => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [userData,setUserData]=useState({});

    const {user,setUser}=useContext(UserDataContext)
    const navigate=useNavigate()
    
    const submitHandler =async(e) => {
        e.preventDefault();
       
        //pass khali ho gya login k bad
        // setUserData({
        //     email:email,
        //     password:password
        // })
        const userData={
            email:email,
            password:password
        }
        const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`,userData)
        
        if(response.status===200){
            const data=response.data
            setUserData(data.user)
            localStorage.setItem('token', data.token)
           
            navigate('/home')
           
        }
        console.log(response.status);
        setEmail('');
        setPassword('');
        console.log(email,password);
    }
  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
        <img className='w-16 mb-10'  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png"></img>
        <form onSubmit={(e)=>{submitHandler(e)}}>
        <h3  className='text-lg font-medium mb-2 ' >What's your email</h3>
        <input 
        required 
        value={email}
        onChange={(e)=>{
            setEmail(e.target.value);
        }}
        className='bg-[#eeeeee] mb-7  rounded px-4 py-2 border w-full text-lg placeholder:text-base'
        type='email' 
        placeholder='youremail@mail.com'/>
        <h3  className='text-lg font-medium mb-2 ' >Enter Password</h3>
        <input 
        required 
        value={password}
        onChange={(e)=>{
            setPassword(e.target.value) }}
        type="password" 
        className='bg-[#eeeeee] mb-7  rounded px-4 py-2 border w-full text-lg placeholder:text-base'
        
        placeholder='password'/>
        <button
        className='bg-[#111] text-white font-semibold mb-3  rounded px-4 py-2 w-full text-lg placeholder:text-base'
        > Login</button>
        <p className='text-center'>New here?<Link to='/signup' className='text-blue-600 '>Create New Account</Link></p>
        
        </form>
        </div>
        <div>
            <Link 
            to ='/captain-login'
            className='bg-[#10b461]  flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base'>
                Sign In as Captain</Link>
        </div>
    </div>
  )
}

export default UserLogin