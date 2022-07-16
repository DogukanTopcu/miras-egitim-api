import { ObjectId } from "bson";
import mongoose from "mongoose";

const Schema = mongoose.Schema
const NewUserNoti = Schema({
    readed: {type: Boolean, default: false},
    userId: {type: ObjectId},

    // date: {type: Date, expires: "172800", default: Date.now()},
    date: {type: Date, default: Date.now()},
    deleteDate: {type: Date, default: Date.now() + 2 * 24 * 60 * 60 * 1000}
}, {timestamps: true});

NewUserNoti.index({createdAt: 1}, {expireAfterSeconds: 172800});

export default mongoose.model("new-user-notification", NewUserNoti);