const nodemailer = require('nodemailer')
const UserModel = require('../models/user')

class Mailer {
    async mailer() {
        const emailAccounts = (await UserModel.find({})).map(item => item.email)
        console.log(emailAccounts)
        const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'athalicao2000@gmail.com',
            pass: 'sgjkkeoadorhppgi'
        }
        })

        const mailOptions = {
            from: 'athalicao2000@gmail.com',
            to: emailAccounts.join(','),
            subject: 'CÓ TRỘM',
            text: 'Ê có trộm, về nhanh đi không là thành vô sản bây giờ!!!'
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log(error);
              res.send('Error: ' + error);
            } else {
              console.log('Email sent: ' + info.response);
              res.send('Email sent: ' + info.response);
            }
        })
    }
}

module.exports = new Mailer