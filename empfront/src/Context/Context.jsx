import React, { createContext, useState } from 'react'


export const Admininfo=createContext();
const Context = (props) => {
    const [adname,setadname]=useState(localStorage.getItem("adname") || "")
    const [logedin,setlogedin]=useState(false)
    const [isAuth,setIsAuth] = useState(localStorage.getItem("isAuth") || false);
  return (
      <Admininfo.Provider value={{adname,setadname,logedin,setlogedin,setIsAuth,isAuth}}>
          {props.children}
      </Admininfo.Provider>
  )
}

export default Context
