// Use at least Nodemailer v4.1.0
const nodemailer = require('nodemailer');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.use(authMiddleware);


router.get('/', (req, res) => {
    res.send('<h1>Email</h1>');
});
// Generate SMTP service account from ethereal.email
nodemailer.createTestAccount((err, account) => {
    if (err) {
        console.error('Failed to create a testing account. ' + err.message);
        return process.exit(1);
    }

    console.log('Credentials obtained, sending message...');

    // Create a SMTP transporter object
    let transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
            user: 'bo6i2gprigrxgpfd@ethereal.email',
            pass: 'jEpdy3VFwCfQnQjrkm'
        }
    });

    // Message object
    let message = {
        from: 'Sender Name <bo6i2gprigrxgpfd@ethereal.email>',
        to: 'Recipient <robertodure1990@gmail.com>',
        subject: 'Nodemailer is unicode friendly ✔',
        text: 'Hello to myself!',
        html: '<p><b>Hello</b> to myself!</p>'
    };

    transporter.sendMail(message, (err, info) => {
        if (err) {
            console.log('Error occurred. ' + err.message);
            return process.exit(1);
        }

        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
});

module.exports = app => app.use('/mail', router);