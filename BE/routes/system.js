const express = require('express')

const router = express.Router()

const verifyToken = require('../middleware/auth')

const systemController = require('../controllers/System/index')
// const systemController = require('../controllers/systemController')

router.post('/led',verifyToken, systemController.controlLed)
router.post('/buzzer',verifyToken, systemController.controlBuzzer)
router.post('/sensor',verifyToken, systemController.controlSensor)
router.get('/change',verifyToken, systemController.changeStatus)
router.get('/',verifyToken, systemController.getStatus)

module.exports = router