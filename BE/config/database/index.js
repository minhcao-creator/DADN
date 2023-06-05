const mongoose = require('mongoose')

async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1/SmartHome', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('Connect database successfuly')
    } catch (error) {
        console.log('Connect database failure')
    }
}

module.exports = { connect }