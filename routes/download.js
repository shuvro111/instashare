const router = require('express').Router();
const Document = require('../models/document');


router.get('/documents/download/:uuid', async (req, res) => {
    const file = await Document.findOne({ uuid: req.params.uuid });
    if(!file){
        return res.json('Whoops! File has been removed or link expired')
    }

    const response = await file.save();
    const filePath = `${(__dirname)}/../${file.path}`;
    // return res.download(filePath);
    return res.json(filePath)

});

module.exports = router