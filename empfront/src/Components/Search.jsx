import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Admininfo } from '../Context/Context';
import updatei from "../assets/edit.png"
import deletei from "../assets/delete.png"
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Search = () => {
  const [show,setshow]=useState(true)
  const [name,setname]=useState("")
  const [empid,setempid]=useState("")
  const [email,setemail]=useState("")
  const [age,setage]=useState("")
  const [job,setjob]=useState("")
  const [dept,setdept]=useState("")
  const [date,setdate]=useState("")
  const [see,setsee]=useState(true)
  const [update,setupdate]=useState()
  const [valu,setvalue]=useState([])
  const {adname,isAuth,setisAuth}=useContext(Admininfo)
  const [showimage,setimage]= useState(false)
  const navigate=useNavigate()
    const getinfo=async()=>{
      console.log(isAuth)
      if(!isAuth){
        toast.error("please login");
        navigate("/login")
        return;
      }
      const response = await axios.get("http://127.0.0.1:8000/app/getemp/",{params: {
        adname: adname
      }})
      console.log("hello")
      console.log(response.data)
      console.log(adname)
      if(response.data.detail=="true")
      {
        setvalue(response.data.info);
        setsee(false);
      }
      else{
        setsee(true)
        toast.error(" Data NOT Found ")
      }
    }
    const updateinfo=async(e)=>{
      // console.log("i am in")
      e.preventDefault();
      
      
      const response = await axios.put("http://127.0.0.1:8000/app/getemp/",{"value":update,"data":{"empid":empid,"empname":`${name}`,"email":`${email}`,"age":`${age}`,"job":`${job}`,"dept":`${dept}`,"date":`${date}`,"adname":`${adname}`}})
      console.log("hello")
      console.log(response.data)
      if(response.data['detail']==="true")
      {
        getinfo();
        setshow(true)
      }
      else 
      toast.error(`${response.data['info']}`)
      // navigate("/");
      // alert(response.data)
      
    }
    function changeshow(index){
      setshow(false);
      setname(valu[index].empname)
      setemail(valu[index].email)
      setage(valu[index].age)
      setdate(valu[index].date)
      setdept(valu[index].dept)
      setjob(valu[index].job)
      setempid(valu[index].empid)
      setupdate(valu[index].empid)
    }
    const changeDelete=async(index)=>{
      toast.success(`${valu[index]['empid']} deleted`)
      const response = await axios.delete("http://127.0.0.1:8000/app/getemp/",{data:{"empid":`${valu[index]['empid']}`}})
      
      if (valu==="")
      {
        setsee(true)
        toast.error("no element found")
      }
      else
      getinfo()
    }
 
  return (
      <div className='h-screen w-full overflow-scroll overflow-x-hidden'>
          {see && (
            <div className='w-full flex justify-center items-center mt-80 flex-col'>
              <p className='text-gray-500   '>Click button for detail</p>
              <button onClick={()=>{getinfo()}} className='bg-blue-400 text-white w-[70px] text-wrap border-3 rounded-[45px] transform transition delay-200 hover:scale-125'>Get Info</button>
            </div>
          )}

  {!see && show && <div className='flex flex-row flex-wrap justify-between m-[10px] gap-[20px] transition-all duration-2000 '>
      {valu.map((value, index) => (
        <div
          className={`flex flex-col flex-wrap justify-center m-[4px] overflow-hidden hover:scale-105 transition-all duration-1000 }`}
          key={index}
          onMouseOver={() => setimage(index)} 
          onMouseOut={() => setimage(null)} 
        >
          <div>
            <img
              src="https://icons.veryicon.com/png/o/miscellaneous/standard/user-274.png"
              alt="no photo"
              className='w-[75px] h-[75px] rounded-[15px]'
            />
          </div>
          <div>Name: {value.empname}</div>
          <div>Empid: {value.empid}</div>
          <div>Email: {value.email}</div>
          <div>Age: {value.age}</div>
          <div>Job: {value.job}</div>
          <div>Department: {value.dept}</div>
          <div>Date: {value.date}</div>
          
          <div className={`${showimage === index ? 'flex ' : 'hidden'} flex-row items-start gap-[10px]`}>
            <div className='flex gap-[10px]  text-[purple] cursor-pointer '>
              <h4 onClick={() => changeshow(index)}>Update</h4>
            </div>
            <div className='flex gap-[10px] text-[purple] cursor-pointer'>
              <h4 onClick={() => changeDelete(index)}>Delete</h4>
            </div>
          </div>
        </div>))}
    </div>}



        {!show && 
        (<form className='flex flex-col space-y-4' onSubmit={(e)=>{updateinfo(e)}}>
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
    )}
      </div>
  )
}

export default Search
