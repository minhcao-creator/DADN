handleSendData = (client, topic, message) => {
    client.publish(topic, message, { qos: 0, retain: false }, (error) => {
        if (error) {
            console.error(error)
        }
        console.log('Send Message: ', parseInt(message), topic);
    })
}

module.exports = handleSendData