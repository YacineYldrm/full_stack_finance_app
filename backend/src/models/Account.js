import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
    {
        category: { type: String, default: "" },
        amount: { type: Number, required: true },

        type: { type: String, required: true, enum: ["income", "expense"] },
        date: { type: Number, required: true }, // in services user value oder Date.now() als fallback
        seenBy: [{ type: mongoose.Types.ObjectId }], // beim Erstellen kommt die authorizedUserId hier rein
        comment: { type: String, default: "" },
        media: { type: String, default: "" },
        owner: { type: mongoose.Types.ObjectId, required: true },
    },
    { timestamps: true }
);

const accountSchema = new mongoose.Schema(
    {
        type: { type: String, default: "TEST" }, // ANPASSEN
        cardNumber: { type: String, required: true },
        limit: { type: Number },
        owner: { type: mongoose.Types.ObjectId, required: true },
        members: [{ type: mongoose.Types.ObjectId, required: true }],
        transactions: [transactionSchema],
    },
    { collection: "accounts", timestamps: true }
);

const Account = mongoose.model("Account", accountSchema);

export default Account;
