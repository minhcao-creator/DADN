const mongoose = require('mongoose')

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const history = new Schema({
    systemS: {
        type: Boolean,
        require: true
    },
    sensorS: {
        type: Boolean,
        require: true
    }, 
    timeSave: {
        type: String
    }

})

module.exports = mongoose.model('history', history)