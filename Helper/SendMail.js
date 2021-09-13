const nodemailer = require('nodemailer');

const sendMail = async ({sender, receiver, subject, text, html}) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
    });

    let info = await transporter.sendMail({
        from: `instashare <${sender}>`,
        to: receiver,
        subject,
        text,
        html,
    });

}

module.exports = sendMail;