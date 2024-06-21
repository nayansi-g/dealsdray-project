const express = require('express');
const app = express();
require('./Connection/Connection')
const cors = require("cors");
const EmployeeRouter = require("./Routers/Router");
const multer = require("multer");
const path = require("path");
const AdminRouter = require("./Routers/Admin.router");
require("dotenv").config();

app.use(cors("dev"));
app.use(express.json());

const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => {
      return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }

})

const upload = multer({ storage: storage })


app.use('/images', express.static('upload/images'));
// app.post("/upload",upload.single('image'), (req, res) => {
//   res.json({
//       success: 1,
//       image_url: `http://localhost:8080/images/${req.file.filename}`
//   })
// })
app.use("/", EmployeeRouter);
app.use("/admin", AdminRouter);



app.listen(8080 ,(err)=>{
  try {
    if(err){
        console.log("app is not started")
    }else{
        console.log("app is started")
    }
    
  } catch (error) {
    console.log(error)
  }
})