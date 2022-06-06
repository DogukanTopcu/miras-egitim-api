import mongoose from "mongoose";

const Schema = mongoose.Schema
const AdminSchema = Schema({
    username: String,
    password: String,

});

export default mongoose.model("admin", AdminSchema);