const multer = require('multer');

const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) =>{
    return cb(null, `${file.filename}_${Date.now()}${path.extname(file.originalname)}`)
  }
}) ;

module.exports = multer({storage: storage})