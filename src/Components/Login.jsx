import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import {Admininfo} from '../Context/Context'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
  const [username,setusername]=useState("")
    // const [email,setemail]=useState("")
    const [password1,setpassword1]=useState("")
    const navigate=useNavigate()
    // const [withname,setwithname]=useState(true)
    const {setadname,adname,setIsAuth}=useContext(Admininfo)
    
    const seelogin=async (e)=>{
      e.preventDefault()
        const response =await axios.post("http://127.0.0.1:8000/app/login/",{"username":`${username}`,"password":`${password1}`})
        console.log(response.data)
        if(response.data.value==="true")
        {
          setadname(username)
          setIsAuth(true);
          localStorage.setItem("isAuth",true)
          localStorage.setItem("adname",username)
          console.log(adname)
          navigate("/")
          toast.success("succesfully loged in")

        }
        else{
          toast.error("username or password is wrong");
        }
    }
    
  return (
    <div className='flex justify-center items-center  flex-col relative w-full h-screen '>
    <div className='flex border-2 border-black w-[400px] rounded-[20px] items-center'>
      <form onSubmit={(e)=>(seelogin(e))}>
        <div className='flex flex-col m-2 p-2 space-y-2 w-full'>
          <label htmlFor="">Name:</label>
          <input type="text" placeholder='Enter Name' className='outline-none w-[300px]' required value={username} onChange={(e)=>{setusername(e.target.value)}} />
        </div>
        {/* {!withname && (<div className='flex flex-col m-2 p-2 space-y-2 w-full'>
          <label htmlFor="">Email:</label>
          <input type="email" placeholder='Email' className='outline-none w-[300px]' required value={email} onChange={(e)=>{setemail(e.target.value)}}/>
        </div>)} */}
        <div className='flex flex-col m-2 p-2 space-y-2 w-full'>
          <label htmlFor="">Password:</label>
          <input type="password" placeholder='Password' className='outline-none w-[300px]' required value={password1} onChange={(e)=>{setpassword1(e.target.value)}}/>
        </div>
        
        
        <div className='flex flex-row m-2 p-2 justify-evenly w-full'>
        <Link to="/signup">Sign Up</Link>
          <input type="submit"  className='outline-none w-[70px]  bg-[aqua] border-2 border-black rounded-[20px] text-white cursor-pointer' />
        </div>

      </form>
    </div>
   
  </div>
  )
}

export default Login
