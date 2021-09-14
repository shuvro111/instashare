const router = require('express').Router();
const Document = require('../models/document');
const path = require('path')


router.get('/documents/download/:uuid', async (req, res) => {
    const file = await Document.findOne({ uuid: req.params.uuid });
    if(!file){
        return res.json('Whoops! File has been removed or link expired')
    }

    const filePath =  path.relative(__dirname, file.documentName); 
    // `${(__dirname)}/../${file.path}`;
    return res.download(filePath);
    return res.json(filePath)

});

module.exports = router