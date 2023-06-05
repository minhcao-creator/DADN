const mqtt = require('mqtt');
const host = 'io.adafruit.com';
const connectUrl = `mqtt://${host}`;

const topicSensor = 'minhcao2000/feeds/sensor';
const topicLed = 'minhcao2000/feeds/bbc-led';
const topicBuzzer = 'minhcao2000/feeds/bbc-alarm';

function connectAda() {
    const client = mqtt.connect(connectUrl, {
        clean: true,
        port: 1883,
        connectTimeout: 4000,
        username: 'minhcao2000',
        password: '',
        reconnectPeriod: 1000,
    })
    client.on('connect', () => {
        console.log("Successfully connected to adafruit");
        client.subscribe([topicSensor, topicLed, topicBuzzer], () => {
            console.log(`Subscribe to all topic`)
        });
    }); 

    return client
}

module.exports = { connectAda }