'use strict';

var nodemailer = require('nodemailer');

// Create a SMTP transporter object
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'test.nodemailer@gmail.com',
        pass: 'Nodemailer123'
    },
    logger: true, // log to console
    debug: true // include SMTP traffic in the logs
}, {
    // default message fields

    // sender info
    from: 'Sender Name <sender@example.com>',
    headers: {
        'X-Laziness-level': 1000 // just an example header, no need to use this
    }
});

console.log('SMTP Configured');


module.exports = transporter;