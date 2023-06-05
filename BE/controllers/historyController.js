const History = require('../models/history')
const dateTime = require('node-datetime');

class HistoryController {
    async getHistory(page) {
        try {
            var skip = (parseInt(page)-1) * 5;
    
            const histories = await History.find({})
                        .sort({'_id' : 'desc'})
                        .limit(5)
                        .skip(skip)
            return histories

        } catch (error) {
            console.log(error)
            // res.status(500).json({success: false, message: 'Internal server error'})
        }
    }

    async getHistoryHome(req, res) {
        try {
    
            const histories = await History.find({})
                    .sort({'_id' : 'desc'})
            
            res.json({
                success: true,
                histories
            })
            
        } catch (error) {
            console.log(error)
            res.status(500).json({success: false, message: 'Internal server error'})
        }
    }

    async saveStatusSystem({systemS, sensorS}) {
        try {
            const time = dateTime.create()
            const timeSave = time.format('Y-m-d H:M:S')
            const newHistory = new History({systemS, sensorS, timeSave})
            await newHistory.save()

        } catch (error) {
            console.log(error)
            res.status(500).json({success: false, message: 'Internal server error'})
        }
    }

    async deleteHistory(req, res) {
        try {
            const history = await History.findOneAndDelete({_id: req.params.id})
            if (history) {
                res.json({
                    success: true,
                    message: 'Delete history successfully'
                })
            }
            else {
                console.log(req.params.id)
                res.json ({
                    success: true,
                    message: 'History invalid'
                })
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({success: false, message: 'Internal server error'})
        }
    }

    async deleteManyHistory(req, res) {
        try {
            const ids = req.body.ids
            const history = await History.deleteMany({_id:{$in:ids}})
            res.json({
                success: true,
                message: 'Delete histories successfully'
            })
            
        } catch (error) {
            console.log(error)
            res.status(500).json({success: false, message: 'Internal server error'})
        }
    }

    async deleteAllHistory(req, res) {
        try {
            const history = await History.deleteMany({})
            
            res.json({
                success: true,
                message: 'History is empty'
            })
            
        } catch (error) {
            console.log(error)
            res.status(500).json({success: false, message: 'Internal server error'})
        }
    }

    async searchHistory(req, res) {
        try {
            const histories = await History.find(
                {
                    "$or":[
                        {timeSave:{$regex:req.params.key}}
                    ]
                }
            )
            res.json({
                success: true,
                histories
            })
            
        } catch (error) {
            console.log(error)
            res.status(500).json({success: false, message: 'Internal server error'})
        }
    }
}

module.exports = new HistoryController