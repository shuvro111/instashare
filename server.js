require('dotenv').config();
const express = require('express'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
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

app.listen(process.env.PORT || 3001, () => {
    console.log('lisening on port 3001');
})