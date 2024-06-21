import "./form.css";
import { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { courseValidator, validatEmail, validateDesignation, validateGender, validateMobile, validateName } from "./validation";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';



const EmployeeForm = ({type, updateItem, fetchData, closeUpdate})=>{
    const name = useRef("");
    const email = useRef("");
    const mobile = useRef("");
    const designation =useRef("");
    const [gender, setGender] = useState("");
    const [course, setCourse] = useState("");
    const [image, setImage] = useState(null);
    
    const [errors, setErrors] = useState({
        nameError: false,
        emailError: false,
        mobileError: false,
        designationError: false,
        genderError: false,
        courseError: false
    });

    useEffect(()=>{
        if(updateItem){
            name.current.value = updateItem.name;
            email.current.value = updateItem.email;
            mobile.current.value = updateItem.mobile;
            designation.current.value = updateItem.designation;
            setGender(updateItem.gender);
            setCourse(updateItem.course);
            setImage(updateItem.image)
        }
    }, [fetchData]);

    const handleCheckBox = (value)=>{
        setCourse(value);

    };

    const imageHandler = (e)=>{
        setImage(e.target.files[0])
    }

    const validateForm = ()=>{
      return  validateName(name.current.value) && validatEmail(email.current.value) && validateMobile(mobile.current.value) && validateDesignation(designation.current.value) && validateGender(gender), courseValidator(course);
    }


    const submitHandler= async(e)=>{
        e.preventDefault();
        const formData = new FormData();
        if(validateForm()){
            formData.append('name', name.current.value);
            formData.append('email', email.current.value);
            formData.append('mobile', mobile.current.value);
            formData.append('designation', designation.current.value);
            formData.append('gender', gender);
            formData.append('course', course);
            formData.append('image', image);
        // let newEmployee ={
        //     name:name.current.value,
        //     email:email.current.value,
        //     mobile:mobile.current.value,
        //     designation:designation.current.value,
        //     gender:gender,
        //     course:course,
        //     image: "https://img.freepik.com/free-photo/portrait-man-having-great-time_23-2149443790.jpg"
        // };
       if(type==="Updating"){
        axios.put(`http://localhost:8080/employee/update/${updateItem._id}`, formData, {headers: { Accept: "application/json",  Authorization: localStorage.getItem("token") }}).then(res=>{
            toast.success("Employee updated successfully!");
            fetchData();
            closeUpdate("update");
        }).catch(err=>{
            console.log(err.response.data)
            err.response.data.message ? toast.error(err.response.data.message) : toast.error("There are errorse in form!");
        })
       }else{
        console.log(formData, "FORM DATA");
        axios.post("http://localhost:8080/employee/add", formData, {headers: {  Accept: "application/json", Authorization: localStorage.getItem("token") }}).then(res=>{
            toast.success("Employee added successfully!");
            fetchData();
            closeUpdate("add");
        }).catch(err=>{
            console.log(err.response.data)
            err.response.data.message ? toast.error(err.response.data.message) : toast.error("There are errorse in form!");
        })
       }
    }else{
       toast.error("Error in form!")
    }
    }


    

    return <>
       
       <div className="employee_form" >
       <ToastContainer />     
               <h3>{type == "Updating" ? "Update" : "Adding"}  Employee</h3>
                 <form onSubmit={submitHandler}>
                 <div className="input_container" >
                       <label className="input_label" >Enter Employee Name</label>
                       <input onChange={()=>validateName(name.current.value, function(status,text){
                            if(!status){
                                toast.error(text);
                                setErrors({...errors, nameError: true });
                            }else{
                                setErrors({...errors, nameError: false});
                            }
                       })} ref={name} type="text" />
                   </div>
                   <div className="input_container" >
                       <label className="input_label" >Enter Employee Email</label>
                       <input onBlur={()=>{validatEmail(email.current.value, function(status,text){
                            if(!status){
                                toast.error(text);
                                setErrors({...errors, emailError: true });
                            }else{
                                setErrors({...errors, emailError: false});
                            }
                       })}} type="email" ref={email}/>
                   </div>
                   <div className="input_container" >
                       <label className="input_label" >Enter Employee Mobile Number</label>
                       <input type="tel" onBlur={()=>{
                        validateMobile(mobile.current.value, function(status,text){
                            if(!status){
                                toast.error(text);
                                setErrors({...errors, mobileError: true });
                            }else{
                                setErrors({...errors, mobileError: false});
                            }
                       })
                       }} ref={mobile} />
                   </div>
                   <div className="input_container" >
                       <label className="input_label" >Enter Employee Designation</label>
                       <select ref={designation} >
                           <option value="HR" >HR</option>
                           <option value="Manager"  >Manager</option>
                           <option value="Sales" >Sales</option>
                       </select>
                   </div>
                   <div className="input_container" >
                   <label className="input_label">Enter Employee Gender</label>
                       <div className="gender_options" >
                       <input type="radio" checked={gender === "Male"} name="gender" onChange={(e)=> setGender(e.target.value)} value="Male" /> <label>Male </label>
                       <input type="radio" checked={gender==="Female"} name="gender" onChange={(e)=> setGender(e.target.value)}  value="Female" /> <label>Female</label>
                       </div>
                   </div>
                   <div className="input_container" >
                       <label className="input_label" >Enter Employee Course</label>
                       <div className="course_options" >
                       <input type="checkbox" checked={course === "MCA"}  value="MCA" onChange={()=>handleCheckBox("MCA")} /> <label>MCA</label> 
                       <input type="checkbox" checked={course === "BCA"}  value="BCA" onChange={()=>handleCheckBox("BCA")}  /> <label>BCA</label>
                       <input type="checkbox" checked={course === "BSC"}  value="BSC" onChange={()=>handleCheckBox("BSC")}  /> <label>BSC</label>
                       </div>
                   </div>
                   <div className="input_container" >
                       <label className="input_label" >Upload Employee image</label>
                       <input type="file" name="image" onChange={imageHandler} />
                   </div>
                   
                <button type="submit">{ type=="Updating" ? "Update" : "Add"}</button>
                 </form>
              
                
              </div>
           
     
       </>
}

export default EmployeeForm;