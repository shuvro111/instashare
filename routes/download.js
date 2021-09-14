const router = require('express').Router();
const Document = require('../models/document');


router.get('/documents/download/:uuid', async (req, res) => {
    const file = await Document.findOne({ uuid: req.params.uuid });
    if(!file){
        return res.json('Whoops! File has been removed or link expired')
    }
    return res;

    // const filePath = `${(__dirname)}/../${file.path}`;
    // console.log(filePath);
    // const fileName = file.documentName;
    // console.log(fileName)
    // return res.download(filePath, fileName);

});

module.exports = router