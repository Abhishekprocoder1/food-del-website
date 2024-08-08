import React, { useContext, useEffect, useState } from 'react'
import './LoginPop.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../ContextApi/ShopContext';
import axios from "axios"


const LoginPop = ({ setShow }) => {
  
  const [current, setCurrState] = useState("Login");
  const {url,setToken,token} =useContext(StoreContext)
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })



  const onChangehandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }))
  }


  
  const onLogin=async(event)=>{
    event.preventDefault()
    let newUrl=url;
    
    if (current==="Login") {
      newUrl+="/api/user/login"
    } else {
      newUrl+="/api/user/register"
    }

    const respones= await axios.post(newUrl,data);

    if (respones.data.success) {
      setToken(respones.data.token)
      localStorage.setItem("token",respones.data.token)
      setShow(false)
    } else {
      alert(respones.data.message)
    }
  }
  
 

  return (
    <div className='loginpop'>
      <form onSubmit={onLogin} className='login-pop-continainer'>
        <div className="login-pop-title">
          <h2>{current}</h2>
          <img onClick={() => setShow(false)} src={assets.cross_icon} />
        </div>
        <div className="login-popup-inputs">
          {
            current === "Login" ? <></> : <input onChange={onChangehandler} value={data.name} name='name' type='text' placeholder='Your name' required />
          }
          <input type='email' onChange={onChangehandler} name='email' value={data.email} placeholder='Your email' required />
          <input type='Password' onChange={onChangehandler} name='password' value={data.password} placeholder='Your password' required />
        </div>
        <button type='submit'>{current === "Sign Up" ? "Create account" : "Login"}</button>
        <div className="login-pop-condtion">
          <input type='checkbox' required />
          <p>By continuing, i argree to the terms of use & privacy policy.</p>
        </div>
        {current === "Login" ? <p>Crete a new account?<span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
          : <p>Already have an account? <span onClick={() => { setCurrState("Login") }}>Login here</span></p>}
      </form>
    </div>
  )
}

export default LoginPop