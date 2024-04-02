const mongoose = require('mongoose')
const internal = require('stream')

const userSchema =  mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a name']
    },
    email: {
        type: String,
        required: [true, 'Please enter a email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please enter a password']
    },
    phone: {
        type: Number,       
        required: [true, 'Please enter a phone number']
    }
},
{
    timestamps:true
})

module.exports = mongoose.model('User',userSchema)