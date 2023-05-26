import mongoose from "mongoose";

const skinSchema = new mongoose.Schema({
    skinId: { type: String, required: true }, /** Skin id */
    skinName: { type: String, required: false }, /** Skin name */
    skinUuid: { type: String, required: true }, /** Skin uuid */
    skinSignature: { type: String, required: true }, /** Skin signature */
    skinValue: { type: String, required: true }, /** Skin value */
    skinGeneratedLong: { type: String, required: true } /** Skin generated long */
});

const SkinSchema = module.exports = mongoose.model('Skin', skinSchema); 