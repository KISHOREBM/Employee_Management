import React, { createContext, useState ,useEffect} from 'react'


export const Admininfo=createContext();
const Context = (props) => {
    const [adname,setadname]=useState("")
    const [isAuth,setIsAuth] = useState(localStorage.getItem("isAuth") || false);

    useEffect(()=>{
        setIsAuth(localStorage.getItem("isAuth"))
        setadname(localStorage.getItem("adname"))
    },[])

    
  return (
      <Admininfo.Provider value={{adname,setadname,setIsAuth,isAuth}}>
          {props.children}
      </Admininfo.Provider>
  )
}

export default Context
