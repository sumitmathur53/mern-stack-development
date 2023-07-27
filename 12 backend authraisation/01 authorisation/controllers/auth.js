const bcrypt = require("bcrypt");
const user = require("../model/user_model");

// signup route handler

exports.signup = async (req,res)=>{

    try{
        // get data
        const {name,email, password,role} = req.body;

        // check if already exist

        const existingUser = await user.findOne({email});

        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"user already exists",
            });
        }

        // secure the password

        let hashedPassword;

        try{
            hashedPassword = await bcrypt.hash(password,10);
        }
        catch(err){
            return res.status(500).json({
                success:false,
                message:"Error in hashing the password",
            });
        }

        // create entry for user in db

        const User = await user.create({
            name,email,password:hashedPassword,role
        })

        return res.status(200).json({
            success:true,
            message:"user created successfully"
        });
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"user cannot be created , please try again later"
        });
    }
}