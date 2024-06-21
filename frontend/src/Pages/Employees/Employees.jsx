import React, { useContext, useEffect, useState } from 'react'
import './employees.css'
import EmployeeCard from '../../Components/EmployeeCard/EmployeeCard'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from '../../context/auth.context';
const EmployeesPage = ()=>{
    const [employeeList, setEmployeeList] = useState([]);
    const {data} = useContext(AuthContext);
    const getEmployees = ()=>{
        console.log("Called from child")
        axios.get("http://localhost:8080", {headers: {Authorization: localStorage.getItem("token")}}).then(data=>{ setEmployeeList(data.data.data);}).catch(err=>{
            console.log(err)
            toast("Error in fetching data!")
        })
    }

    useEffect(()=>{
        console.log(data, "CONTEXT")
        getEmployees();
    }, [])

  return (
        <> <ToastContainer /> <EmployeeCard employeelist={employeeList} fetchData={getEmployees} /></>
  )
}

export default EmployeesPage;