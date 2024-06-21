const router = require("express").Router();
const { getEmployee, createEmployee, updateEmployee, DeleteEmployee } = require("../Controllers/Employees.controller");
const multer = require("multer");
const path = require('path');
const verifyAuth = require("../auth");
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
  
  })
  
  const upload = multer({ storage: storage });


router.get("/", verifyAuth,getEmployee);
router.post("/employee/add",verifyAuth ,upload.single('image') ,createEmployee);
router.put("/employee/update/:id", verifyAuth ,upload.single('image'), updateEmployee);
router.delete("/employee/delete/:id",verifyAuth, DeleteEmployee);

module.exports = router;