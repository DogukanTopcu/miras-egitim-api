import mongoose from "mongoose";
import { random } from "lodash";

const Schema = mongoose.Schema
const ExpertsSchema = Schema({
    fullName: {type: String},
    email: {type: String},
    password: {type: String},
    image: {type: String},

    city: {type: String},
    major: {type: String},
    pricePerHour: {type: Number},
    desc: {type: String},
    certificates: {type: Array},

    verified: {type: Boolean},
    verifiedCode: {type: Number},

    signedDate: {type: Date, default: Date.now()},
    verifiedDate: {type: Date},

    isVipOfWeek: {type: Boolean},
    isVip: {type: Boolean},
    weeklyVipDate: {type: Date},
    vipDate: {type: Date},
    weeklyVipNumber: {type: Number, default: 0},
    vipNumber: {type: Number, default: 0},


});

export default mongoose.model("experts", ExpertsSchema);