import { ObjectId } from "bson";
import mongoose from "mongoose";

const Schema = mongoose.Schema
const AdvisorApplyNoti = Schema({
    readed : {type: Boolean, default: false},
    expertId : {type: ObjectId},

    date: {type: Date, default: Date.now()},
    deleteDate: {type: Date, default: Date.now() + 10 * 24 * 60 * 60 * 1000}
});

export default mongoose.model("advisor-apply-notification", AdvisorApplyNoti);