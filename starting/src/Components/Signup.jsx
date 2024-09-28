import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Admininfo } from '../Context/Context'
import { toast } from 'react-toastify'
const Signup = () => {
    const [username,setusername]=useState("")
    const [email,setemail]=useState("")
    const [password1,setpassword1]=useState("")
    const [password2,setpassword2]=useState("")
    const navigate=useNavigate()
    const {adname}=useContext(Admininfo)
    const submi=async(e)=>
    {
        e.preventDefault();
        if(password1!=password2)
        {
            toast.error("password dosen't match")
            return;
        }
        const response = await axios.post("http://127.0.0.1:8000/app/signup/",{"username":username,"email":email,"password":password1,"adname":username})
        console.log(response.data)
        if(response.data.detail==="true")
        {
            navigate("/login")
        }
        else{
            if (response.data['info']['username'])
              
              toast.error(`${response.data['info']['username']}`)
            
            if (response.data.info['non_field_errors'])
              toast.error(`${response.data["info"]['non_field_errors']}`)

        }
    }
    return (
    <div className='flex justify-center items-center h-screen'>
    <div className='flex border-2 border-black w-[400px] rounded-[20px] items-center'>
      <form onSubmit={submi}>
        <div className='flex flex-col m-2 p-2 space-y-2 w-full'>
          <label htmlFor="">Name:</label>
          <input type="text" placeholder='Enter Name' className='outline-none w-[300px]' required value={username} onChange={(e)=>{setusername(e.target.value)}} />
        </div>
        <div className='flex flex-col m-2 p-2 space-y-2 w-full'>
          <label htmlFor="">Email:</label>
          <input type="email" placeholder='Email' className='outline-none w-[300px]' required value={email} onChange={(e)=>{setemail(e.target.value)}}/>
        </div>
        <div className='flex flex-col m-2 p-2 space-y-2 w-full'>
          <label htmlFor="">Password:</label>
          <input type="password" placeholder='Password' className='outline-none w-[300px]' required value={password1} onChange={(e)=>{setpassword1(e.target.value)}}/>
        </div>
        <div className='flex flex-col m-2 p-2 space-y-2 w-full'>
          <label htmlFor="">Confirm Password:</label>
          <input type="password" placeholder='Confirm Password' className='outline-none w-[300px]' required value={password2} onChange={(e)=>{setpassword2(e.target.value)}}/>
        </div>
        <div className='flex flex-row m-2 p-2 justify-evenly w-full'>
        <Link to="/login">Login?</Link>
          <input type="submit"  className='outline-none w-[70px]  bg-[aqua] border-2 border-black rounded-[20px] text-white cursor-pointer' />
        </div>

      </form>
    </div>
  </div>
  
  )
}

export default Signup
