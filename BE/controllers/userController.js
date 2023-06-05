const User = require('../models/user')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

class UserController {
    async resgiter(req, res) {
        const {name, phone, email, password, age, gender, address} = req.body
        if (!name || !phone || !email || !password ) {
            return res.status(400).json({
                success: false,
                message: 'Missing name or phone or email or password'
            })
        }

        try {
            var user = await User.findOne({name})
            if(user) {
                return res.status(400).json({
                    success: false,
                    message: 'Username already taken'
                })
            }
            user = await User.findOne({phone})
            if(user) {
                return res.status(400).json({
                    success: false,
                    message: 'Numberphone already taken'
                })
            }
            user = await User.findOne({email})
            if(user) {
                return res.status(400).json({
                    success: false,
                    message: 'Email already taken'
                })
            }
            const hashpassword = await argon2.hash(password)
            const newUser = new User({name, phone, email, password: hashpassword, age, gender, address})
            await newUser.save()

            //Return token
            const accessToken = jwt.sign({userId: newUser._id}, '' + process.env.ACCESS_TOKEN_SECRET, {expiresIn: '20m'})

            res.json({
                success: true,
                message: 'User created successfully',
                accessToken
            })

        } catch (error) {
            console.log(error)
            res.status(500).json({success: false, message: 'Internal server error'})
        }
    }


    async login(req, res) {
        const {phone, password} = req.body
        if(!phone || !password) {
            return res.status(400).json({
                success: false,
                message: 'Missing phone or password'
            })
        }

        try {
            const user = await User.findOne({phone})
            if(!user) {
                return res.status(400).json({
                    success: false,
                    message: 'Incorrect Phone or Password'
                })
            }
            const passwordValid = await argon2.verify(user.password, password)
            if(!passwordValid) {
                return res.status(400).json({
                    success: false,
                    message: 'Incorrect Phone or Password'
                })
            }

            const accessToken = jwt.sign({userId:user._id}, '' + process.env.ACCESS_TOKEN_SECRET, {expiresIn:'2h'})
            res.json({
                success: true,
                message: 'User login successfully',
                accessToken
            })
            
        } catch (error) {
            console.log(error)
            res.status(500).json({success: false, message: 'Internal server error'})
        }
    }

    async profile(req, res) {
        try {
            const user = await User.findOne( {_id: req.userId} )
            res.json({
                success: true,
                user
            })
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            })
        }
    }

    async updateProfile(req, res) {
        const {name, phone, email, age, gender, address} = req.body
        if (!name || !phone || !email ) {
            return res.status(400).json({
                success: false,
                message: 'Missing name or phone or email or password'
            })
        }

        try {
            const currentUser = await User.findOne( {_id: req.userId} )
            var user = await User.findOne({name})
            if(user && JSON.stringify(currentUser) !== JSON.stringify(user)) {
                return res.status(400).json({
                    success: false,
                    message: 'Username already taken'
                })
            }
            user = await User.findOne({phone})
            if(user && JSON.stringify(currentUser) !== JSON.stringify(user)) {
                return res.status(400).json({
                    success: false,
                    message: 'Numberphone already taken'
                })
            }
            user = await User.findOne({email})
            if(user && JSON.stringify(currentUser) !== JSON.stringify(user)) {
                return res.status(400).json({
                    success: false,
                    message: 'Email already taken'
                })
            }
            const filter = {_id: req.userId}
            const update = {name, phone, email, age, gender, address}
            const userNow = await User.findOneAndUpdate(filter, update, {new: true})

            res.json({
                success: true,
                message: 'User updated successfully',
                userNow
            })

        } catch (error) {
            console.log(error)
            res.status(500).json({success: false, message: 'Internal server error'})
        }
    }
}

module.exports = new UserController