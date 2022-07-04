import { ObjectId } from "bson";
import mongoose from "mongoose";

const Schema = mongoose.Schema
const CommentRatesSchema = Schema({
    commentId: {type: ObjectId}, // oylanan yorumun id'si
    userId: {type: ObjectId}, // oylanan kişinin id'si
    voterId: {type: ObjectId}, // oylayan kişinin id'si
    rate: {type: String},
    date: {type: Date, default: Date.now()},
    updated: {type: Boolean, default: false}
});

export default mongoose.model("commentRates", CommentRatesSchema);