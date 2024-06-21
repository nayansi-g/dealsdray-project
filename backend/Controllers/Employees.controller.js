const Employee = require('../Models/Employees.model');
const Admin = require("../Models/Admin.model");




//Get Employee
const getEmployee = async (req, res)=>{
    try{
        let response = await Employee.find();
        res.status(200).json({data: response});
    }catch(err){
        console.log(err)
    }
}

//Create Employee
const createEmployee = async (req, res)=>{
    const nextId = await Employee.getAutoIncreamentId();
    // let filePath = `http://localhost:8080/${req.file.ori}`;
    const emailExist = Employee.findOne({email: req.body.email});
    const mobileExist = Employee.findOne({mobile: req.body.mobile});
        let newEmployee = new Employee({
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
            designation: req.body.designation,
            gender: req.body.gender,
            course: req.body.course,
            image:  `http://localhost:8080/images/${req.file.filename}`,
            empId: nextId
        });
       if(emailExist == {}){
        console.log("EMail Already")
        res.status(405).json({message: "Email Already Exists!"})
       }else{
        if(mobileExist == {}){
            res.status(405).json({message: "Mobile Number already exists!"})
           }else{
            newEmployee.save().then(()=>{
                res.status(200).json({newEmployee})
            }).catch(err=>{
                res.status(500).json({message: "Faile to add employee!"})
            })
           }
       }
       
}

//Update Employee
const updateEmployee = async(req,res)=>{
    try {
        if(req.file) req.body.image =  `http://localhost:8080/images/${req.file.filename}`;
        const UpdateEm = await Employee.findByIdAndUpdate(req.params.id, req.body);
        res.json(UpdateEm);
        
    } catch (error) {
        console.log(error)
    }
}

//Delete Employee

const DeleteEmployee = async(req,res)=>{
    try {
        const DeletedEm = await Employee.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"successfully deleted"})
        
    } catch (error) {
        console.log(error)
        
    }
}


module.exports = {getEmployee, createEmployee, updateEmployee, DeleteEmployee}