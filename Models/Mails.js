import { ObjectId } from "bson";
import mongoose from "mongoose";

const Schema = mongoose.Schema
const MailsSchema = Schema({
    type: {type: String},
    to: {type: String},
    subject: {type: String}, 
    content: {type: String},

    genre: {type: String},

    date: {type: Date, default: Date.now()}
});

export default mongoose.model("mails", MailsSchema);