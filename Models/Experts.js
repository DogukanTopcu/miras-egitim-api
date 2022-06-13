import mongoose from "mongoose";

const Schema = mongoose.Schema
const ExpertsSchema = Schema({
    fullName: String,
    email: String,
    password: String,
    image: String,

    location: String,
    profession: String,

    isVipOfWeek: Boolean,
    isVip: Boolean,

    verified: Boolean,
});

export default mongoose.model("experts", ExpertsSchema);