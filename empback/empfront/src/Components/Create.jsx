import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Admininfo } from '../Context/Context'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Create = () => {
  const [name,setname]=useState("")
  const [empid,setempid]=useState("")
  const [email,setemail]=useState("")
  const [age,setage]=useState("")
  const [job,setjob]=useState("")
  const [dept,setdept]=useState("")
  const [date,setdate]=useState("")
  const navigate=useNavigate()
  const {adname,isAuth}=useContext(Admininfo)
  const backpost=async (e)=>
  {
    if(!isAuth){
      toast.error("please login");
      navigate("/login")
      return;
    }
    e.preventDefault();
    const response =await axios.post("http://127.0.0.1:8000/app/createmp/",{"empid":empid,"empname":`${name}`,"email":`${email}`,"age":`${age}`,"job":`${job}`,"dept":`${dept}`,"date":`${date}`,"adname":`${adname}`})
    console.log(adname)
    console.log(response.data)
    if(response.data.detail === "true") 
    {navigate("/") ;
      toast.success("employee created");
    }
    // Redirect or take some action on success
    const error=response.data
      console.log(error)
      if(error.info['email'])
      {
        console.log(response.data);
        toast.error(`${error.info['email']}`);  
      }
      else if(error.info['empid'])
      {
        console.log(response.data);
          toast.error(`${error.info['empid']}`);  // Show the error message from the backend
      }
    }
    useEffect(()=>{
      backpost()
    },[])
  return (
    <div className='flex flex-col  m-[4px] w-full h-full capitalize overflow-scroll overflow-x-hidden overflow-y-hidden'>
      <h1 className='mb-4 font-bold w-full font-serif justify-center text-center'>Add Employee</h1>
      <form className='flex flex-col space-y-4' onSubmit={backpost}>
        <div className='flex flex-col  w-[300px] space-y-2'>
          <label htmlFor="Empid">Empid:</label>
          <input type="text" placeholder='enter employee id' className='outline-none transform uppercase' required value={empid} onChange={(e)=>{setempid(e.target.value)}}/>
        </div>
        <div className='flex flex-col  w-[300px] space-y-2'>
          <label htmlFor="Name">Name:</label>
          <input type="text" placeholder='enter name' className='outline-none' required value={name} onChange={(e)=>{setname(e.target.value)}}/>
        </div>
        <div className='flex flex-col  w-[300px] space-y-2'>
          <label htmlFor="email">email:</label>
          <input type="email" placeholder='enter email' className='outline-none ' required value={email} onChange={(e)=>{setemail(e.target.value)}}/>
        </div>
        <div className='flex flex-col  w-[300px] space-y-2'>
          <label htmlFor="Age">age:</label>
          <input type="number" placeholder='enter age' className='outline-none' required value={age} onChange={(e)=>{setage(e.target.value)}}/>
        </div>
        
        <div className='flex flex-col  w-[300px] space-y-2'>
          <label htmlFor="Job">Job title:</label>
        <select id="dropdown" className='outline-none' required value={job} onChange={(e)=>{setjob(e.target.value)}}>
        <option value="">Select an option</option>
        <option value="Full Stack Developer">Full Stack Developer</option>
        <option value="Data Analysis">Data Analysis</option>
        <option value="Game Developer">Game Developer</option>
        <option value="Machine Learning">Machine Learning</option>
      </select>
        </div>
        <div className='flex flex-col  w-[300px] space-y-2'>
          <label htmlFor="Department">Department:</label>
          <input type="text" placeholder='enter Department' className='outline-none' required value={dept} onChange={(e)=>{setdept(e.target.value)}}/>
        </div>
        <div className='flex flex-col  w-[300px] space-y-2'>
          <label htmlFor="Date">Date-of-hire:</label>
          <input type="date" placeholder='enter date' className='outline-none cursor-pointer' required value={date} onChange={(e)=>{setdate(e.target.value)}}/>
        </div>
        <input type="submit" className='flex border-2 border-black bg-[#095e9b] text-white w-16 cursor-pointer rounded-[18px]' />
      </form>
    </div>
  )
}

export default Create
