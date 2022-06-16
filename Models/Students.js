import mongoose from "mongoose";

const Schema = mongoose.Schema
const StudentsSchema = Schema({
    fullName: {type: String},
    email: {type: String},
    password: {type: String},
    image: String,

    city: {type: String},
    
    verified: {type: Boolean},
    verifiedCode: String,

    signedDate: {type: String, default: Date.now},
    verifiedDate: Date
    

});

export default mongoose.model("students", StudentsSchema);