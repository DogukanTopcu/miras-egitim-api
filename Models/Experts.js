import mongoose from "mongoose";

const Schema = mongoose.Schema
const ExpertsSchema = Schema({
    fullName: {type: String},
    email: {type: String},
    password: {type: String},
    image: {type: String},

    city: {type: String},
    major: {type: String},
    desc: {type: String},

    verified: {type: Boolean},
    // verifiedCode: Int16Array,
    signedDate: {type: Date, default: Date.now()},
    verifiedDate: {type: Date},

    isVipOfWeek: {type: Boolean},
    isVip: {type: Boolean},
    weeklyVipDate: {type: Date},
    vipDate: {type: Date},
    // weeklyVipNumber: Int16Array,
    // vipNumber: Int16Array,


});

export default mongoose.model("experts", ExpertsSchema);