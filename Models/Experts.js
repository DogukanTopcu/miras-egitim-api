import mongoose from "mongoose";
import { random } from "lodash";

const Schema = mongoose.Schema
const ExpertsSchema = Schema({
    fullName: {type: String},
    email: {type: String},
    password: {type: String},
    image: {type: String},

<<<<<<< HEAD
    city: String,
    major: String,
    pricePerHour: Number,
    desc: String,
    certificates: Array,
=======
    city: {type: String},
    major: {type: String},
    desc: {type: String},
>>>>>>> d7863143434d5ca819f3c49e9cb76aa0d6a18a1d

    verified: {type: Boolean},
    verifiedCode: {type: Number},

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