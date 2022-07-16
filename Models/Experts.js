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
    // certificates: [{src: String}],
    certificates: {type: Array},

    verified: {type: Boolean},
    verifiedCode: {type: Number},

    comfirmedAdvisor: {type: Boolean, default: false},
    comfirmedAdvisorDate: {type: Date},
    endDate: {type: Date},  // default: Date.now() + 30 * 24 * 60 * 60 * 1000

    signedDate: {type: Date, default: Date.now()},
    verifiedDate: {type: Date},

    isVipOfWeek: {type: Boolean, default: false},
    isVip: {type: Boolean, default: false},
    weeklyVipDate: {type: Date},
    vipDate: {type: Date},

    visitorsCount: {type: Number, default: 0},
    commentsCount: {type: Number, default: 0},
    
    totalNumber: {type: Number, default: 0},

});
ExpertsSchema.index({createdAt: 1}, {expireAfterSeconds: 2592000});

export default mongoose.model("experts", ExpertsSchema);