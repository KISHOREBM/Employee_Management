import React, { useContext,useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Admininfo } from '../Context/Context'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import add from "../assets/add.png"
import employeedetail from "../assets/employeedetail.png"
import login from "../assets/login.png"
import logout from "../assets/logout.png"
import signupi from '../assets/signup.png';
const Navbar = () => {
    const {setIsAuth,setadname,adname,isAuth}=useContext(Admininfo);
    const [showword,setshowword] = useState()
    const navigate= useNavigate()
    const change=()=>
    {
        if(isAuth)
        {    
            
            console.log("in false");
            console.log(isAuth)
            toast.error("loged out")
            setIsAuth(false)
            setadname("")
            localStorage.removeItem("isAuth")
            localStorage.removeItem("adname")
        }
        navigate("/login");
    }
    useEffect(()=>{
        if(window.innerWidth < 330)
        {
            setshowword(flase)
        }
        else{
            setshowword(true)
        }
    },[window.screen])
  return (
    <div className={`flex flex-col  bg-[#301a30] w-[200px] text-[25px]  text-white justify-between sm:w-[60px] h-screen overflow-scroll flex-shrink-0 overflow-x-hidden overflow-y-hidden`}>
        <div>
            <div className='mt-[10px] ml-[10px]'>
                <h1 className='text-[29px]'>Employee Management</h1>
            </div>
            <div className='m-2 p-2 cursor-pointer transition duration-200 hover:scale-105 hover:text-red-500 flex flex-row  items-center space-x-2 sm:hiden'>
                {showword && <img src={add} alt="" className='w-[20px] h-[20px]' onClick={()=>{navigate("/create")}}/>}
                <Link to="/create" className='flex sm:hidden'>Create</Link>
            </div>
            <div className='m-2 p-2 cursor-pointer transition duration-200 hover:scale-105  hover:text-red-500 flex flex-row  items-center space-x-2'>
                {showword &&<img src={employeedetail} alt="" className='w-[20px] h-[20px] bg-white rounded-[23px]' onClick={()=>{navigate("/")}}/>}
                <Link to="/" className='flex sm:hidden'>Employee Detail</Link>
            </div>
            {/* <div className='m-2 p-2 cursor-pointer transition duration-200 hover:scale-105'>
                <img src="" alt="" />
                <Link to="/delete">Delete</Link>
            </div> */}
        </div>
        <div>
        <div className='m-2 p-2 cursor-pointer transition duration-200 hover:scale-105  hover:text-red-500 flex flex-row  items-center space-x-2' onClick={()=>{change()}}>
                 {!isAuth && showword && <img src={login} alt="" className='w-[20px] h-[20px] '/>}
                {isAuth && showword && <img src={logout} alt="" className='w-[20px] h-[20px] '/>}

                <button onClick={()=>{change()} } className='flex sm:hidden'>{isAuth?"logout":"login"}</button>
        </div>
        
        {!isAuth && <div className='m-2 p-2 cursor-pointer transition duration-200 hover:scale-105  hover:text-red-500 flex flex-row  items-center space-x-2'>
                {showword && <img src={signupi} alt="" onClick={()=>{navigate("/signup")}} className='w-[20px] h-[20px] bg-white rounded-[23px]'/>}
                <Link to="/signup" className='flex sm:hidden'>Sign up</Link>
        </div>}
        </div>
    </div>
  )
}

export default Navbar;
