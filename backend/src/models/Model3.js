import mongoose from "mongoose";


const model3Schema = new mongoose.Schema({
    "key1": { type: String, required: true, default: "" },
    "key2": { type: Number, required: true, default: 0 },
    "key3": { type: Boolean, required: true, default: false },
}, { collection: "model3", timestamps: true })


const Model3 = mongoose.model("Model3", model3Schema);

export default Model3;