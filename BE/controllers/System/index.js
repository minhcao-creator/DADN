const Adafruit = require('../../config/adafruit/index')
var client = Adafruit.connectAda()

const refreshClient = require('./refreshClient')
const SendData = require('./handleSendData')

const topicLed = 'minhcao2000/feeds/bbc-led';
const topicBuzzer = 'minhcao2000/feeds/bbc-alarm';
const topicSensor = 'minhcao2000/feeds/sensor';

const historyController = require('../historyController')


var signal = false
var data = {
    'sensor': 0,
    'led' : 0,
    'buzzer': 0
}

refreshClient(client, data, signal)

class System {
    getStatus (req, res) {
        res.json({
            success: true,
            data,
            signal
        })
    }

    controlLed (req, res) {
        try {   
            SendData (client, topicLed, req.body.message)
            res.json({
                success: true
            })
        } catch (error) {
            consolee.log(error)
            res.json({error})
        }
    }

    controlSensor (req, res) {
        try {   
            SendData (client, topicSensor, req.body.message)
            res.json({
                success: true
            })
        } catch (error) {
            consolee.log(error)
            res.json({error})
        }
    }

    controlBuzzer (req, res) {
        try {   
            SendData (client, topicBuzzer, req.body.message)
            res.json({
                success: true
            })
        } catch (error) {
            console.log(error)
            res.json({error})
        }
    }
    
    changeStatus (req, res) {
        try {
            signal = !signal
            //kết thúc kết nối client
            client.end()
            client = Adafruit.connectAda()
            //Reconnection
            refreshClient(client, data, signal)

            historyController.saveStatusSystem({systemS : signal, sensorS: data.sensor == 1})

            res.json({
                success: true,
                signal
            })
        } catch (error) {
            console.log(error)
            res.json({error})
        }
    }

}

module.exports = new System