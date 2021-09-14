const express = require('express');
const router = express.Router();
const DIR = 'uploads/';
const { v4: uuidv4 } = require('uuid');
const multer = require('multer')


let Document = require('../models/document');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        // Encrypt

        cb(null, file.originalname);
    }
});

var upload = multer({
    storage: storage
});

router.post('/documents', upload.single('profileImg'), (req, res, next) => {
    //Upload Document
    const document = new Document({
        documentName: req.file.filename,
        path: req.file.path,
        size: req.file.size,
        uuid: uuidv4()
    });
    document.save().then(response => {
        res.status(201).json({
            message: "File Uploaded Successfullly!",
            downloadLink:`${process.env.APP_BASE_URL}/documents/${response.uuid}`, 
            uuid: response.uuid
        })
    }).catch(err => {
            res.status(500).json({
                error: err
            });
    })
})


router.get("/documents/:uuid", async (req, res) => {
    try{
        const document = await Document.findOne({ uuid: req.params.uuid })
        if(!document){
            return res.json('Sorry! Link has been expired')
        }
        return res.json({
            uuid: document.uuid,
            documentName: document.documentName,
            size: document.size,
            createdDate: document.createdAt,
            downloadLink: `${process.env.APP_BASE_URL}/documents/download/${document.uuid}`
        })
    }catch(err){
        return res.json(`${err}Whoops! Something went wrong!`)
    }
});


module.exports = router