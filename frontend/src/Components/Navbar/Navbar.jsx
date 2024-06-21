import React, { useContext, useState, useEffect } from 'react'
import "./navbar.css"
import {Nav,Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Login from '../../Pages/Login/Login'
import { AuthContext } from '../../context/auth.context'


const Navbar = () => {
    const [logout,setLogout] =useState("false");
    const[login,setLogin] = useState(false);
    const {dispatch,data} = useContext(AuthContext);

 
    return (
        <div className='amp_navbar' >
            <div className='left_nav_sec nav_sec' >
                <h3>LOGO</h3>
            </div>
            <div className='center_nav_sec nav_sec' >
                <ul>
                    <li><Link to="/" >Home</Link></li>
                    <li><Link to="/employees" >Employee List</Link></li>

                </ul>
            </div>
            <div className='right_nav_sec nav_sec' >    
                <ul>
                        <li> Account</li>
                        <li style={{cursor: "pointer"}} > {data ? <span onClick={()=>dispatch({type:"logout"})} > Logout </span>: <Link to="/login" >Login</Link> }  </li>
                    </ul>
            </div>
        </div>
    )
}

export default Navbar
