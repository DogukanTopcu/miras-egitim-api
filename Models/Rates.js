import { ObjectId } from "bson";
import mongoose from "mongoose";

const Schema = mongoose.Schema
const RatesSchema = Schema({
    userId: {type: ObjectId}, // yorum yapılan kişinin id'si
    voterId: {type: ObjectId}, // yorum yapan kişinin id'si
    rate: {type: Number},
    date: {type: Date, default: Date.now()},
});

export default mongoose.model("rates", RatesSchema);