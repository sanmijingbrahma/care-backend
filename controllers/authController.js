const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const User = require("../models/user")






// User Regstration
exports.register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        // Hash The password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create new user and save
        const user = new User({ username, email, password: hashedPassword, role });
        await user.save();

        res.status(201).json({message:"User Registered Sucessfully"});

    } catch (err) {
        res.status(400).json({error: err.message});
    }
}

// User Login
exports.logIn = async (req,res)=>{
    try {
        const {email, password} = req.body;

        // Check if the user exits
        const user = await User.findOne({email});
        if(!user) return res.status(404).json({error:"User Not Found"});

        // If Exitst Validate password
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(401).json({error:"Invalid Password"});

        // Generate a JWT token
        const token = jwt.sign({id: user._id, role:user.role},process.env.JWT_SECRET,{
            expiresIn: "1h",
        })
        
        res.json({token});
    } catch (err) {
       res.status(500).json({error:err.message});
    }

}