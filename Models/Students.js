import mongoose from "mongoose";

const Schema = mongoose.Schema
const StudentsSchema = Schema({
    fullName: String,
    email: String,
    password: String,

    location: String,

});

export default mongoose.model("students", StudentsSchema);