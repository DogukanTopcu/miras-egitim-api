import mongoose from "mongoose";

const Schema = mongoose.Schema
const ExpertsSchema = Schema({
    fullName: String,
    email: String,
    password: String,
    image: String,

    city: String,
    major: String,
    desc: String,

    verified: Boolean,
    // verifiedCode: Int16Array,
    signedDate: Date,
    verifiedDate: Date,

    isVipOfWeek: Boolean,
    isVip: Boolean,
    weeklyVipDate: Date,
    vipDate: Date,
    // weeklyVipNumber: Int16Array,
    // vipNumber: Int16Array,


});

export default mongoose.model("experts", ExpertsSchema);