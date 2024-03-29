import Account from "../../models/Account.js";
import mongoose from "mongoose";

const deleteTransaction = async (userId, transactionId) => {

    const foundAccount = await Account.findOne({
        transactions: {
            $elemMatch: {
                _id: mongoose.Types.ObjectId.createFromHexString(transactionId),
            },
        },
    });



    if (!foundAccount)
        throw new Error("Account or transaction does not exist!");

    const foundTransaction = foundAccount.transactions.find(
        (transaction) => transaction._id.toString() === transactionId
    );


    if (
        foundAccount.owner.toString() !== userId.toString() && foundTransaction.owner.toString() !== userId.toString()
    )
        throw new Error("You are not authorized to delete this tansaction!!!");

    foundAccount.transactions = foundAccount.transactions.filter(
        (transaction) => transaction._id.toString() !== transactionId
    );

    const updatedAccount = await foundAccount.save();
    return updatedAccount;
};

export default deleteTransaction;
