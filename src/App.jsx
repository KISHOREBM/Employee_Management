import React, { useContext,useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Search from "./Components/Search";
import Create from "./Components/Create";
import Login from "./Components/Login";
import Signup from "./Components/Signup";


function App() {

  return (
    <div className="flex h-screen w-full relative ">
      <Router>
        <Navbar />
          <Routes>
            <Route path="/" element={<Search />} />
            <Route path="/create" element={<Create />} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
          </Routes>
      </Router>
    </div>
  );
}

export default App;
