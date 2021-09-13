require('dotenv').config();
const express = require('express'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    path = require('path')
    app = express(),
    mongourl = process.env.MONGO_CONNECTION_URL;

const addDocument = require('./routes/documents');
const sendEmail = require('./routes/sendEmail');
const downloadFile = require('./routes/download');


mongoose.connect(mongourl).then(() => {console.log("connected")}).catch((err) => {console.log(err)});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());

app.use('/public', express.static('public'));

app.use('/api', addDocument)
app.use('/api', sendEmail)
app.use('/api', downloadFile)

if(process.env.NODE_ENV === 'production'){
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(process.env.PORT || 3001, () => {
    console.log('lisening on port 3001');
})