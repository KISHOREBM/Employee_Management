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
    const [first,setfirst]=useState()
    const [third,setthird]=useState()
    const [secand,setsecand]=useState()
    const [forth,setforth]=useState()
    const [enterotp, setenteropt] = useState(false)
    const [otp,setotp]=useState(0)
    const checkotp=(e)=>{
      e.preventDefault();
      let value = first*1000+secand*100+third*10+forth*1
      // console.log(first*1000,secand*100,third*10,forth)
      // console.log(value)
      // console.log(otp)
      if(value==otp)
      {
        toast("verified sucesssfully")
        setenteropt(false)
        submi()
        setfirst('')
      setsecand('')
      setthird('')
      setforth('')
        return
      }
      
      toast("wrong otp")
      return
    }
    const VerifyOtp=async(e)=>{
      e.preventDefault();
      if(password1!=password2)
        {
            toast.error("password dosen't match")
            return;
        }
        setenteropt(true);
        const response = await axios.post("http://127.0.0.1:8000/app/otpverify/",{'email':email})
        if(response.data.detail)
        {
            toast("sucessfully created");
            setotp(response.data.value);
            
        }
        else{
            toast("Some error occured");
            return
        }

    }
    const submi=async()=>
    {
        
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
    <div className='flex justify-center items-center h-screen relative w-full ' >
    <div className='flex border-2 border-black w-[400px] rounded-[20px] items-center '>
      <form onSubmit={VerifyOtp}>
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
    {enterotp && <form  className='flex h-screen  w-full justify-center items-center absolute bg-[rgba(0,0,0,0.5)]' onSubmit={checkotp}>
        <div className='flex justify-center item-center flex-col  border-[3px] rounded-[19px] w-[200px] h-[150px] '>
            <div className='flex m-[4px] p-[2px] w-full justify-center'>
                <h4>Enter the otp</h4>
            </div>
            <div className='flex justify-between items-center m-[4px] p-[2px] '>
                <input type="numeric" name="" id="" maxLength="1" value={first} onChange={(e)=>{setfirst(e.target.value)}} className='w-[20px] border-2 rounded-[20px] text-center'/>
                <input type="numeric" name="" id="" maxLength="1" value={secand} onChange={(e)=>{setsecand(e.target.value)}} className='w-[20px] border-2 rounded-[20px] text-center'/>
                <input type="numeric" name="" id="" maxLength="1" value={third} onChange={(e)=>{setthird(e.target.value)}} className='w-[20px] border-2 rounded-[20px] text-center'/>
                <input type="numeric" name="" id="" maxLength="1" value={forth} onChange={(e)=>{setforth(e.target.value)}} className='w-[20px] border-2 rounded-[20px] text-center'/>
            </div>
            <div className='flex w-full justify-center items-center'>
                <input type="submit" value="Verify" className='cursor-pointer m-[2px] p-[5px]  justify-center items-center bg-green-500 text-white text-center rounded-[23px] ' />
                <button className='' onClick={()=>{setenteropt(!enterotp)}}>back</button>
            </div>
        </div>
    </form>}
  </div>
  
  )
}

export default Signup
