const express = require('express');
const Document = require('../models/document')
const formatBytes = require('../Helper/FormatBytes')
const sendMail = require('../Helper/SendMail')
const router = express.Router();

router.post("/documents/send", async (req, res) => {
    const { uuid, sender, receiver } = req.body;
    if(uuid && sender && receiver){
        const file = await Document.findOne({ uuid: uuid });
        if(file.sender){
            return res.status(422).send({ error: 'Email Already Sent.' })
        }
        file.sender = sender;
        file.receiver = receiver;

        const response = await file.save();

        //File Details
        const fileName = file.fileName;
        const fileSize = formatBytes(file.size)
        const uploadDate = new Date(file.createdAt).toDateString();
        const expiryDate = new Date(+new Date(file.createdAt) + 24 * 60 * 60 * 1000).toDateString();
        const downloadLink = `${process.env.APP_BASE_URL}/documents/${uuid}`
        console.log(downloadLink);


        //Send Mail
        sendMail({
            sender,
            receiver,
            subject: 'Instashare File Sharing',
            text: `${sender} shared a file with you.`,
            html: require('../Helper/Template')(sender, receiver, fileName, fileSize, uploadDate, expiryDate, downloadLink)
        })

        return res.send({success: true})

    }
    else{
        res.status(422).send({error: 'All fields are required.'})
    }
})

module.exports = router