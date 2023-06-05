const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const user = new Schema({
    name: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        require: true
    },
    age: {
        type: Number
    },
    gender: {
        type: String,
        enum: ['male', 'female']
    },
    address: {
        type: String
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('user', user)