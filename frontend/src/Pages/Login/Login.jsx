import React, { useContext, useRef, useState } from 'react'
import {useNavigate} from "react-router-dom"
import "../../Components/EmployeeForm/form.css"
import axios from "axios";
import {ToastContainer, toast} from "react-toastify";
import { AuthContext } from '../../context/auth.context';


const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {dispatch} = useContext(AuthContext);
    const navigate = useNavigate();

    const submitForm=(e)=>{
        e.preventDefault();
        
        let formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);
        axios.post("http://localhost:8080/admin/login", formData, {headers: {"Content-Type": "application/json"}}).then(res=>{
         toast.success("Logged In Successfully!");
         dispatch({type: "login", payload: res.data.token})
        //  navigate("/")
      }).catch(err=>{
        err.response.data.message && toast.error(err.response.data.message)
      })

    }

    const handleUserName = (e)=>{
      setUsername(e.target.value)
    }
    const handlePassword = (e)=>{
      setPassword(e.target.value)
    }

  return (
    <div className='login_page' >
      <ToastContainer />
        <div className='employee_form' style={{backgroundColor: "transparent", boxShadow: "none"}} >
        <form style={{boxShadow: "0px 0px 8px 3px rgba(0, 0 , 0, 0.3)", borderRadius: "10px", padding: "2%"}} action="" onSubmit={submitForm}>
            <h3>Login</h3>  
            <div className='input_container' > 
            <label>Username</label> <input onChange={handleUserName}  type="text" />
            </div>
            <div className='input_container' >
            <label>Password</label> <input onChange={handlePassword}  type="text" />
            </div>
            <button type='submit'> Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login
