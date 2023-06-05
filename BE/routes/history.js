const express = require('express')

const router = express.Router()

const verifyToken = require('../middleware/auth')
const HistoryController = require('../controllers/historyController')

router.delete('/delete/:id', verifyToken, HistoryController.deleteHistory)

router.delete('/delete-many', verifyToken, HistoryController.deleteManyHistory)

router.delete('/delete-all', verifyToken, HistoryController.deleteAllHistory)

router.get('/:key', verifyToken, HistoryController.searchHistory)

router.get('/', verifyToken, HistoryController.getHistoryHome)

module.exports = router