import axios from 'axios';
import React, { Suspense, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Admininfo } from '../Context/Context';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import userphot from '../assets/userphoto.png'
import Create from './Create';

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
      
    }
    const changeshow = (index) => {
  const selected = valu[index];
  navigate('/create', {
    state: {
      name1: selected.empname,
      empid1: selected.empid,
      email1: selected.email,
      ag: selected.age,
      jo: selected.job,
      dep: selected.dept,
      dat: selected.date,
      isUpdate: true,
    },
  });
};
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
    useEffect(()=>{
      getinfo();
    },[])
  return (
      
        <div className='h-screen w-full overflow-scroll overflow-x-hidden t-[27px]'>
        {!see && show && <div className='flex flex-row flex-wrap  m-[10px] gap-[20px] transition-all duration-2000 '>
      {valu.map((value, index) => (
        <div
          className={`flex flex-col flex-wrap justify-center m-[4px] overflow-hidde  hover:scale-105 transition-all duration-1000 }`}
          key={index}
          onMouseOver={() => setimage(index)} 
          onMouseOut={() => setimage(null)} 
        >
          <div>
            <img
              src={userphot}
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
              <h4 onClick={() => changeshow(index)} className='cursor-pointer'>Update</h4>
            </div>
            <div className='flex gap-[10px] text-[purple] cursor-pointer'>
              <h4 onClick={() => changeDelete(index)} className='cursor-pointer'>Delete</h4>
            </div>
          </div>
        </div>))}
    </div>}
             
        {/* </Suspense> */}
        <div className='flex justify-center items-center mt-[30px] w-full h-screen'>
          <button className='bg-[blue] text-[white]  p-[10px] sm:w-auto rounded-[23px]' onClick={()=>{navigate('/create')}}>Add Employee</button>
        </div>
      </div>
     
  )
}

export default Search
