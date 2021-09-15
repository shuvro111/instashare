const nodemailer = require('nodemailer');
const  { googleapi } = require('googleapis');

const clientId = process.env.GOOGLE_API_CLIENT_ID;
const clientSecret = process.env.GOOGLE_API_CLIENT_SECRET;
const redirectUri = process.env.GOOGLE_API_REDIRECT_URI;
const refreshToken = process.env.GOOGLE_API_REFRESH_TOKEN;
      
const oAuth2Client = new googleapi.auth.OAuth2(clientId, clientSecret, redirectUri);
oAuth2Client.setCredentials({refresh_token: refreshToken})

const sendMail = async ({sender, receiver, subject, text, html}) => {
    const accessToken = await oAuth2Client.getAccessToken()

    let transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
            clientId,
            clientSecret,
            refreshToken,
            accessToken
        },
    });

    let info = await transport.sendMail({
        from: `instashare <${sender}>`,
        to: receiver,
        subject,
        text,
        html,
    });

}

module.exports = sendMail;