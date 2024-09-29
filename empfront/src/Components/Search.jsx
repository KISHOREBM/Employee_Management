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
  const [valu,setvalue]=useState()
  const {adname,isAuth,setisAuth}=useContext(Admininfo)
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
      <div >
          {see && (
            <div className='w-full flex justify-center items-center mt-80 flex-col'>
              <p className='text-gray-500   '>Click button for detail</p>
              <button onClick={()=>{getinfo()}} className='bg-blue-400 text-white w-[70px] text-wrap border-3 rounded-[45px] transform transition delay-200 hover:scale-125'>Get Info</button>
            </div>
          )}

{!see && show && (
  <table className='border-none w-full'>
    <thead className=' w-full'>
      <tr >
        <th>Name</th>
        <th>Epid</th>
        <th>Email</th>
        <th>Age</th>
        <th>Job</th>
        <th>Department</th>
        <th>Hiredate</th>
        <th></th>
      </tr>
    </thead>
    <tbody className=' w-full text-center'>
      {valu.map((value, index) => (
        <tr key={index} className=' '>
          <td className='m-2'>{value.empname}</td>
          <td className='m-2'>{value.empid}</td>
          <td className='m-2'>{value.email}</td>
          <td className='m-2'>{value.age}</td>
          <td className='m-2'>{value.job}</td>
          <td className='m-2'>{value.dept}</td>
          <td className='m-2'>{value.date}</td>
          <td className='flex flex-row justify-center items-center'>
            <img src={updatei} className='w-[40px] cursor-pointer h-[40px] bg-purple-500 m-3 p-2 ' onClick={() => changeshow(index)}/>
            <img src={deletei} className='w-[40px] cursor-pointer h-[40px] bg-purple-500 m-3 p-2' onClick={() => changeDelete(index)}/>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)}

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
          {/* <option value="">Select an option</option> */}
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
