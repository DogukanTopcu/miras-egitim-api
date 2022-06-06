import mongoose from "mongoose";

const Schema = mongoose.Schema
const ExpertsSchema = Schema({
    fullName: String,
    email: String,
    password: String,

    location: String,
    profession: String,

    isVipOfWeek: Boolean,
    isVip: Boolean
});

export default mongoose.model("experts", ExpertsSchema);