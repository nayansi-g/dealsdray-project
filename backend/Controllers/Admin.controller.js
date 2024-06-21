const Admin = require("../Models/Admin.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


const createAdmin = (req, res)=>{
    let newAdmin = new Admin({
        username : req.body.username,
        password: req.body.password
    });

    newAdmin.save().then(data=>{
        res.status(200).json({message: "Admin Created Successfully!"})
    }).catch(err=>{
        console.log(err)
        res.status(500).json({message: "Something went wrong!"})
    })
}

const generateJWT =  (metadata)=>{
   try{
    let jwtsecret = process.env.sectret_token;
    const token = jwt.sign(metadata, jwtsecret);
    return token;
   }catch(err){
    return err
   }
}

const loginUser =  (req, res)=>{
    let {username, password} = req.body;
    Admin.findOne({username}).then(async existingUser=>{
        if(!existingUser){
            res.status(403).json({message : "Username not found!"})
        }else if(existingUser){
        let validUser = await bcrypt.compare(  password, existingUser.password);
        if(!validUser){           
            res.status(403).json({message: "Incorrect Password!"});
        }else{
            const token = generateJWT({username: existingUser.username});
            if(token){
                res.status(200).json({token : token});
            }else{
                res.status(500).json({message: "Server Error"})
            }
        }    
        }else{
            res.status(500).json({message: "Something went wrong!"});
        }
    })
}

module.exports = {createAdmin, loginUser}