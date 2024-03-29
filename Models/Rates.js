import { ObjectId } from "bson";
import mongoose from "mongoose";

const Schema = mongoose.Schema
const RatesSchema = Schema({
    userId: {type: ObjectId}, // oylanan kişinin id'si
    voterId: {type: ObjectId}, // oylayan kişinin id'si
    rate: {type: Number},
    date: {type: Date, default: Date.now()},
    updated: {type: Boolean, default: false}
});

export default mongoose.model("rates", RatesSchema);