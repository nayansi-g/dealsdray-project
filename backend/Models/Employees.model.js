const mongoose = require("mongoose");
const { findOneAndUpdate } = require("./Admin.model");

const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    empId: {
        type: Number,
        unique: true,
        required: true
    },
    name :{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    mobile :{
        type:Number,
        required:true
    },
    designation:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    course:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
}, {timestamps: true});

EmployeeSchema.statics.getAutoIncreamentId = async function(){
    const maxEmp = await this.findOne().sort({ empId: -1 }); // Find the document with the highest empId
    let nextId = 1; // Default to 1 if no documents exist
    if (maxEmp) {
        nextId = maxEmp.empId + 1; // Increment the highest found empId
    }
    return nextId;
}

module.exports = mongoose.model("employees" , EmployeeSchema)