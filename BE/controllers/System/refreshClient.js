const topicLed = 'minhcao2000/feeds/bbc-led';
const topicBuzzer = 'minhcao2000/feeds/bbc-alarm';

const historyController = require('../historyController')

const mailerController = require('../mailerController')

refreshClient = (client, data, signal) => {
    if (signal) {
        client.on('message', (topic, message) => {
            const temp = parseInt(message)
            const deviceName = topic.split('/')[2]
            if (deviceName == 'sensor') {
                if (temp == 1) {
                    client.publish(topicLed, '0', { qos: 0, retain: false }, (error) => {
                        if (error) {
                            console.error(error)
                        }
                        console.log('Send Message: ', parseInt(message), topicLed);
                    })
        
                    client.publish(topicBuzzer, '0', { qos: 0, retain: false }, (error) => {
                        if (error) {
                            console.error(error)
                        }
                        console.log('Send Message: ', parseInt(message), topicBuzzer);
                    })
                }
                else {
                    client.publish(topicLed, '1', { qos: 0, retain: false }, (error) => {
                        if (error) {
                            console.error(error)
                        }
                        console.log('Send Message: ', parseInt(message), topicLed);
                    })
        
                    client.publish(topicBuzzer, '1', { qos: 0, retain: false }, (error) => {
                        if (error) {
                            console.error(error)
                        }
                        console.log('Send Message: ', parseInt(message), topicBuzzer);
                    })
                    // mailerController.mailer()
                }
                data.sensor = temp
                historyController.saveStatusSystem({systemS : signal, sensorS: data.sensor == 1})
            }
            if (deviceName == 'bbc-led') { data.led = temp }
            if (deviceName == 'bbc-alarm') { data.buzzer = temp }
        })
    } else {
        client.on('message', (topic, message) => {
            const temp = parseInt(message)
            const deviceName = topic.split('/')[2]
            if (deviceName == 'sensor') { data.sensor = temp }
            if (deviceName == 'bbc-led') { data.led = temp }
            if (deviceName == 'bbc-alarm') { data.buzzer = temp }
        })
    }
}

module.exports = refreshClient