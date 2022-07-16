import { ObjectId } from "bson";
import mongoose from "mongoose";

const Schema = mongoose.Schema
const NewAdvisorNoti = Schema({
    readed : {type: Boolean, default: false},
    expertId : {type: ObjectId},

    date: {type: Date, default: Date.now()},
    deleteDate: {type: Date, default: Date.now() + 2 * 24 * 60 * 60 * 1000}
});
NewAdvisorNoti.index({createdAt: 1}, {expireAfterSeconds: 172800});

export default mongoose.model("new-advisor-notification", NewAdvisorNoti);