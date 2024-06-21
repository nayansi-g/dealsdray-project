const router = require('express').Router();
const {createAdmin, loginUser} = require('../Controllers/Admin.controller');

router.post("/add", createAdmin);
router.post("/login", loginUser);


module.exports = router;