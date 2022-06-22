import { ObjectId } from "bson";
import mongoose from "mongoose";

const Schema = mongoose.Schema
const CommentSchema = Schema({
    userId: ObjectId, // yorum yapılan kişinin id'si
    commenterId: ObjectId, // yorum yapan kişinin id'si
    comment: String,
    date: Date,
    rate: Number,
});

export default mongoose.model("comments", CommentSchema);