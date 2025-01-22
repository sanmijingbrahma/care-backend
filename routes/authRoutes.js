const express = require("express")
const router = express.Router();
const {register,logIn} = require("../controllers/authController");


// Registration Route
router.post("/register",register);

// Login Route
router.post('/login',logIn);


module.exports = router;




