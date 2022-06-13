import mongoose from "mongoose";

const Schema = mongoose.Schema
const StudentsSchema = Schema({
    fullName: String,
    email: String,
    password: String,
    image: String,

    location: String,

    verified: Boolean,

});

export default mongoose.model("students", StudentsSchema);