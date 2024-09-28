import React, { useContext,useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Search from "./Components/Search";
import Create from "./Components/Create";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import { Admininfo } from "./Context/Context";

function App() {
  const {setadname,setlogedin,adname,logedin,isAuth,setIsAuth}=useContext(Admininfo);
  useEffect(()=>{
      setloged()
  },[])
  const setloged=()=>{
    setIsAuth(localStorage.getItem("isAuth"));
    setlogedin(localStorage.getItem("isAuth"));
    setadname(localStorage.getItem("adname"));
  }
  return (
    <div className="h-screen flex">
      <Router>
        <Navbar />
        <div className="flex-grow p-4">
          <Routes>
            <Route path="/" element={<Search />} />
            <Route path="/create" element={<Create />} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
