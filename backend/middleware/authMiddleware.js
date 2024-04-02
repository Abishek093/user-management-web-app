const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const user = require('../models/userModel')

const protect = asyncHandler(async(req, res, next)=>{
    console.log("auth  ");
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await user.findById(decoded.id).select('-password')
            next()
        } catch (error) {
            console.log(error);
            res.status(401)
            throw new Error('Not authorized')
        }
    }else{
        res.status(401)
        throw new Error('Not authorized. No token')
    }
})

module.exports = protect