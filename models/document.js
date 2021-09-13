const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const documentSchema = new Schema({
    documentName: { type: String, required: true },
    path: { type: String, required: true },
    size: { type: Number, required: true },
    uuid: { type: String, required: true },
    sender: { type: String },
    receiver: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Document', documentSchema)