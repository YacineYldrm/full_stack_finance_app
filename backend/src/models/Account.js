import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    category: { type: String, required: true, default: "" },
    amount: { type: Number, required: true },
    type: { type: String, required: true, default: "" },
    date: { type: Number, required: true },
    seenBy: [{ type: mongoose.Types.ObjectId, required: true }],
    comment: { type: String, default: "" },
    media: { type: String, default: "" },
});

const accountSchema = new mongoose.Schema(
    {
        type: { type: String, required: true, default: "" },
        cardNumber: { type: Number, required: true },
        limit: { type: Number, required: true },
        owner: { type: mongoose.Types.ObjectId, required: true },
        members: [{ type: mongoose.Types.ObjectId, required: true }],
        transactions: [transactionSchema],
    },
    { collection: "accounts", timestamps: true }
);

const Account = mongoose.model("Account", accountSchema);

export default Account;
