const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");


const getRegister = asyncHandler(async(req, res)=>{{
    res.status(200).json({message: 'Register user'})
}})


const postRegister = asyncHandler(async(req, res)=>{{
    const {name, email, password, phone} = req.body

    console.log(name, email, password, phone);
    
    if(!name || !email || !password || !phone){
        res.status(400)
        throw new Error('Please fill all fields')
    }
    console.log(name, email, password, phone);

    const existingUser = await User.findOne({email})
    if(existingUser){
        res.status(400)
        throw new Error('User already exist please login')
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        name,
        email,
        phone,
        password : hashedPassword
    })

    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id)
        })
    }else{
        res.status(400)
        throw new Error('Failed to add user')        
    }
}})


const getLogin = asyncHandler(async(req, res)=>{{
    res.status(200).json({message: 'Register user'})
}})

const postLogin = asyncHandler(async(req, res)=>{{
    const {email, password} = req.body

    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id)
        })
    }else{
        res.status(400)
        throw new Error('User not found')           
    }
}})


const getHome = asyncHandler(async(req, res)=>{{
    const {_id, name, email} = await User.findById(req.user.id)
    res.status(200).json({id: _id, name, email})
}})


const generateToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
    getRegister,
    postRegister,
    getLogin,
    postLogin,
    getHome
};
