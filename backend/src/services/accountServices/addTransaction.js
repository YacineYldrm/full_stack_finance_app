import mongoose from "mongoose";
import Account from "../../models/Account.js";

const addTransaction = async (transactionInfo, userId, reqFile) => {

    const foundAccount = await Account.findById(transactionInfo.accountId);

    if (foundAccount.members && !foundAccount.members.includes(mongoose.Types.ObjectId.createFromHexString(userId)))
        throw new Error(
            "You're not allowed to add a transaction to this account"
        );
    const newTransaction = {
        ...transactionInfo,
        date: transactionInfo.date || Date.now(),
        media: reqFile ? reqFile.filename : "",
        seenBy: [userId],
        owner: userId,
    };
    const createdTransaction = await foundAccount.transactions.create(
        newTransaction
    );
    foundAccount.transactions = [
        ...foundAccount.transactions,
        createdTransaction,
    ];
    await foundAccount.save();
    return foundAccount;
};

export default addTransaction;
