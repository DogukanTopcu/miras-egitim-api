import { ObjectId } from "bson";
import mongoose from "mongoose";

const Schema = mongoose.Schema
const CertificatesSchema = Schema({
    userId: {type: ObjectId}, // Sertifikası tutulan kişinin id'si 
    certificates: {type: Array},

});

CertificatesSchema.index({createdAt: 1}, {expireAfterSeconds: 2592000});

export default mongoose.model("certificates", CertificatesSchema);