import mongoose from "mongoose";

const Schema = mongoose.Schema
const CommentSchema = Schema({
    userId: Number, // yorum yapılan kişinin id'si
    commenterId: Number, // yorum yapan kişinin id'si
    comment: String,
    date: Date,
    rate: Number,
});

export default mongoose.model("comments", CommentSchema);