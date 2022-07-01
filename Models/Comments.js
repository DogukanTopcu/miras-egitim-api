import { ObjectId } from "bson";
import mongoose from "mongoose";

const Schema = mongoose.Schema
const CommentSchema = Schema({
    userId: {type: ObjectId}, // yorum yapılan kişinin id'si
    commenterId: {type: ObjectId}, // yorum yapan kişinin id'si
    comment: {type: String},
    date: {type: Date, default: Date.now()},
    rate: {type: Number, default: 0},
});

export default mongoose.model("comments", CommentSchema);