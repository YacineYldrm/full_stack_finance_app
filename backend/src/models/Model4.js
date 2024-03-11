import mongoose from "mongoose";


const model4Schema = new mongoose.Schema({
    "key1": { type: String, required: true, default: "" },
    "key2": { type: Number, required: true, default: 0 },
    "key3": { type: Boolean, required: true, default: false },
}, { collection: "model4", timestamps: true })


const Model4 = mongoose.model("Model4", model4Schema);

export default Model4;