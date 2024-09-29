import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Context from './Context/Context.jsx'
import { ToastContainer, toast } from 'react-toastify';
ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
      <Context>
      <ToastContainer />
      <App/>
      </Context>
  </React.StrictMode>,
  
)