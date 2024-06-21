const Admin = require("./Models/Admin.model");
const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
    console.log(req.headers)
    const token = req.headers['authorization'];
  
    if (!token) {
      return res.status(403).json({ message: 'No token provided' });
    }
  
    jwt.verify(token, process.env.sectret_token, (err, decoded) => {
      if (err) {
        console.log(err)
        return res.status(401).json({ message: 'Failed to authenticate token' });
      }
  
      // If token is valid, save decoded information to request object for use in other routes
      console.log("VALID USer")
      req.user = decoded;
      next();
    });
  };