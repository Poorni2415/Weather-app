const usermodel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const signup = async(req,res)=>
{
    try
    {
        const {username,email,password} = req.body;
        const user = await usermodel.findOne({email});
        if(user)
        {
            return res.status(409).json({message:"User already exists",success:false})
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new usermodel({username,email,password: hashedPassword});
        await newUser.save();
        res.status(201).json({message:"Registration successfull",success:true})
    }
    catch(err)
    {
        res.status(500).json({message:"Internal server error",success:false})
    }
}

const login = async(req,res)=>
{
    try
    {
        const {email,password} = req.body;
        const user = await usermodel.findOne({email});
        if(!user)
        {
            return res.status(403).json({message:"User doesn't exist",success:false})
        }


        const isPassEqual = await bcrypt.compare(password,user.password);
        if(!isPassEqual)
        {
            return res.status(403).json({message:"Passwords do not match", success: false})
        }

       

        const jwtToken = jwt.sign({email:user.email,_id:user._id},process.env.JWT_SECRET,{expiresIn:'30h'})
        
        res.status(200).json({message:"Login successfull",success:true,jwtToken,email,name: user.username})
    }
    catch(err)
    {
       
        res.status(500).json({message:"Internal server error",success:false})
    }
}

module.exports = {signup,login}