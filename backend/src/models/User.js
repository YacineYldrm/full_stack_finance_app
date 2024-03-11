import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        profileImage: { type: String, required: true, default: "" },
        phoneNumber: { type: String, required: true },
        birthDay: { type: Number, required: true },
        passwordHash: { type: String, required: true },
        saltHash: { type: String, required: true },
        accounts: [{ type: mongoose.Types.ObjectId }],
        v_code: { type: Number, required: true },
        verified: { type: Boolean, required: true, default: false },
    },
    { collection: "users", timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
