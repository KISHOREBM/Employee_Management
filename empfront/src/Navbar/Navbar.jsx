import React, { useContext,useEffect } from 'react'
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
    const {logedin,setlogedin,setIsAuth,setadname,adname,isAuth}=useContext(Admininfo);
    const navigate= useNavigate()
    const change=()=>
    {
        if(localStorage.getItem("isAuth"))
        {    
            console.log("in true");
            setlogedin(false);
            setIsAuth(false);
            localStorage.setItem("adname","")
            localStorage.setItem("isAuth",false);
            toast.error("logedout")
            navigate("/login")
            return;
        }

        else
            {
                navigate("/login");
                console.log("in false");
                console.log(isAuth)
            }
    }
  return (
    <div className="flex flex-col h-screen bg-[#4a0e4a] w-[200px] sticky text-white justify-between">
        <div>
            {/* <div className='m-2 p-2 cursor-pointer transition duration-200 hover:scale-105'>
                <img src="" alt="" />
                <Link to="/update">Update</Link>
                </div> */}
            <div className='m-2 p-2 cursor-pointer transition duration-200 hover:scale-105 hover:text-red-500 flex flex-row  items-center space-x-2'>
                <img src={add} alt="" className='w-[20px] h-[20px]' onClick={()=>{navigate("/create")}}/>
                <Link to="/create">Create</Link>
            </div>
            <div className='m-2 p-2 cursor-pointer transition duration-200 hover:scale-105  hover:text-red-500 flex flex-row  items-center space-x-2'>
                <img src={employeedetail} alt="" className='w-[20px] h-[20px] bg-white rounded-[23px]' onClick={()=>{navigate("/")}}/>
                <Link to="/">Employee Detail</Link>
            </div>
            {/* <div className='m-2 p-2 cursor-pointer transition duration-200 hover:scale-105'>
                <img src="" alt="" />
                <Link to="/delete">Delete</Link>
            </div> */}
        </div>
        <div>
        <div className='m-2 p-2 cursor-pointer transition duration-200 hover:scale-105  hover:text-red-500 flex flex-row  items-center space-x-2' onClick={()=>{change()}}>
                {!isAuth &&<img src={login} alt="" className='w-[20px] h-[20px] '/>}
                {isAuth && <img src={logout} alt="" className='w-[20px] h-[20px] '/>}

                <button onClick={()=>{change()}}>{(isAuth)?"logout":"login"}</button>
        </div>
        
        {!isAuth && <div className='m-2 p-2 cursor-pointer transition duration-200 hover:scale-105  hover:text-red-500 flex flex-row  items-center space-x-2'>
                <img src={signupi} alt="" onClick={()=>{navigate("/signup")}} className='w-[20px] h-[20px] bg-white rounded-[23px]'/>
                <Link to="/signup">Sign up</Link>
        </div>}
        </div>
    </div>
  )
}

export default Navbar;
