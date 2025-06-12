import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import { Admininfo } from '../Context/Context'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Create = () => {
  const location = useLocation()
  const {
    name1 = '',
    empid1 = '',
    email1 = '',
    ag = '',
    jo = '',
    dep = '',
    dat = '',
    isUpdate = false
  } = location.state || {}

  const [name, setname] = useState(name1)
  const [empid, setempid] = useState(empid1)
  const [email, setemail] = useState(email1)
  const [age, setage] = useState(ag)
  const [job, setjob] = useState(jo)
  const [dept, setdept] = useState(dep)
  const [date, setdate] = useState(dat)

  const navigate = useNavigate()
  const { adname, isAuth } = useContext(Admininfo)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isAuth) {
      toast.error('Please login')
      navigate('/login')
      return
    }

    const payload = {
      empid,
      empname: name,
      email,
      age,
      job,
      dept,
      date,
      adname,
    }

    try {
      let response
      if (isUpdate) {
        response = await axios.put('http://127.0.0.1:8000/app/getemp/', {
          value: empid1,
          data: payload
        })
      } else {
        response = await axios.post('http://127.0.0.1:8000/app/createmp/', payload)
      }

      if (response.data.detail === 'true') {
        toast.success(isUpdate ? 'Employee updated' : 'Employee created')
        navigate('/')
      } else if (response.data.info) {
        const error = response.data.info
        if (error.email) toast.error(error.email)
        else if (error.empid) toast.error(error.empid)
        else toast.error(response.data.info)
      }
    } catch (error) {
      toast.error('Something went wrong!')
    }
  }

  return (
    <div className='flex flex-col items-center justify-center w-full h-full p-4'>
      <h1 className='mb-4 text-3xl font-bold'>
        {isUpdate ? 'Update Employee' : 'Add Employee'}
      </h1>
      <form
        onSubmit={handleSubmit}
        className='w-full max-w-xl p-6 border-2 rounded-lg space-y-4'
      >
        <div>
          <label>Emp ID:</label>
          <input
            type='text'
            className='w-full p-2 border rounded'
            value={empid}
            required
            disabled={isUpdate}
            onChange={(e) => setempid(e.target.value)}
          />
        </div>
        <div>
          <label>Name:</label>
          <input
            type='text'
            className='w-full p-2 border rounded'
            value={name}
            required
            onChange={(e) => setname(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type='email'
            className='w-full p-2 border rounded'
            value={email}
            required
            onChange={(e) => setemail(e.target.value)}
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type='number'
            className='w-full p-2 border rounded'
            value={age}
            required
            onChange={(e) => setage(e.target.value)}
          />
        </div>
        <div>
          <label>Job Title:</label>
          <select
            className='w-full p-2 border rounded'
            value={job}
            required
            onChange={(e) => setjob(e.target.value)}
          >
            <option value=''>Select Job</option>
            <option value='Full Stack Developer'>Full Stack Developer</option>
            <option value='Data Analysis'>Data Analysis</option>
            <option value='Game Developer'>Game Developer</option>
            <option value='Machine Learning'>Machine Learning</option>
          </select>
        </div>
        <div>
          <label>Department:</label>
          <input
            type='text'
            className='w-full p-2 border rounded'
            value={dept}
            required
            onChange={(e) => setdept(e.target.value)}
          />
        </div>
        <div>
          <label>Date of Hire:</label>
          <input
            type='date'
            className='w-full p-2 border rounded'
            value={date}
            required
            onChange={(e) => setdate(e.target.value)}
          />
        </div>
        <div className='flex justify-center'>
          <button
            type='submit'
            className='px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700'
          >
            {isUpdate ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Create
