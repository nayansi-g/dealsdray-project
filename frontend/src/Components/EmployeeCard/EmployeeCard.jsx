
import React, { useState } from "react";
import './EmployeeCard.css'
import { MdOutlineDelete } from "react-icons/md";
import { GrDocumentUpdate } from "react-icons/gr";
import axios from "axios";
import { toast } from "react-toastify";
import UpdateEmployee from "../UpdateEmployee/UpdateEmployee";
import EmployeeForm from "../EmployeeForm/EmployeeForm";
import { IoAddCircleSharp } from "react-icons/io5";
const EmployeeCard = ({employeelist, fetchData})=>{
    let id = sessionStorage.getItem("id");
    const [updateVisible, setUpdateVisible] = useState(false);
    const [addFormVisible, setAddFormVisible] = useState(false);
    const [updateItem, setUpdateItem] = useState({});

    const del = (id) => {
         axios.delete(`http://localhost:8080/employee/delete/${id}`, {headers:{Authorization: localStorage.getItem("token")}}).then((response)=>{
         console.log(response);
         fetchData();
         toast.success("successfully deleted");
         
        }).catch((err)=>{
            toast.err("data is not deleted")
        })
 
     }

     const handleUpdate = ()=>{
        fetchData();
     };
     
     const closePopUp = (item)=>{
      item == "update" ?  setUpdateVisible(false) : setAddFormVisible(false);
     }

    return <>
    <div className='employeeList'>
        <div className="add_btn" > <span style={{backgroundColor: "#f5bf42"}} > Total Count: {employeelist.length} </span> <span style={{cursor: "pointer"}} onClick={()=>setAddFormVisible(true)} >Add Employee <IoAddCircleSharp /> </span> </div>
        { updateVisible && <div className="update_popup"   ><div  className="form_container" > <span onClick={()=> setUpdateVisible(false)} id="close_btn" >Close</span> <UpdateEmployee fetchData={handleUpdate} updateItem={updateItem} closeUpdate={closePopUp} /></div></div>}
        { addFormVisible && <div className="update_popup"   ><div  className="form_container" > <span onClick={()=> setAddFormVisible    (false)} id="close_btn" >Close</span> <EmployeeForm fetchData={handleUpdate} closeUpdate={closePopUp} /></div></div>}
        <div  className='list_header' >
        <div className='list_row' >
            <div className='list_header_item' >
                Id
            </div>
            <div className='list_header_item'>
                Image
            </div>
            <div className='list_header_item'>
                Name
            </div>
            <div className='list_header_item' >
                    Email
            </div>
            <div className='list_header_item' >
                Mobile No.
            </div>
            <div className='list_header_item' >
                Designation
            </div>
            <div className='list_header_item'>
                Gender
            </div>
            <div className='list_header_item' >
                Course
            </div>
            <div className='list_header_item' >
                Create Date
            </div>
            <div className='list_header_item' >
                Action
            </div>
        </div>
        </div>
        <div className='employee_cards' >
            {
                employeelist && employeelist.map(a=>{
                    return <div key={a.id} className='list_item_row' >
                    <div className='list_item text-break' >
                        {a.empId}
                    </div>
                    <div className='list_item text-break'>
                        <img src={a.image} width="50px" height="50px" />
                    </div>
                    <div className='list_item text-break'>
                        {a.name}
                    </div>
                    <div className='list_item text-break' >
                            {a.email}
                    </div>
                    <div className='list_item text-break' >
                       {a.mobile}
                    </div>
                    <div className='list_item text-break' >
                        {a.designation}
                    </div>
                    <div className='list_item text-break'>
                        {a.gender}
                    </div>
                    <div className='list_item text-break' >
                        {a.course}
                    </div>
                    <div className='list_item text-break' >
                        {(a.createdAt).substring(0, 10)}
                    </div>
                    <div className='list_item text-break' >
                      <div className="action_btn">
                        <p className="edit_action" onClick={()=>{setUpdateVisible(true); setUpdateItem(a)} } ><GrDocumentUpdate />&nbsp;Edit</p>
                        <p className="delete_action" onClick={()=>del(a._id)}><MdOutlineDelete />&nbsp;Delete</p>
                      </div>
                    </div>
                </div>
                })
            }
        </div>
    </div></>
}

export default EmployeeCard;