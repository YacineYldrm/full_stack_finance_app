import Account from "../../models/Account.js";



const editTransaction = async (req) => {

    const userId = req.authorizedUser;
    const updatedTransaction = req.body;

    const foundAccount = await Account.findById(updatedTransaction.accountId);

    if (foundAccount.owner.toString() !== userId || updatedTransaction.owner.toString() !== userId) throw new Error("You are not authorized to edit this tansaction!!!")

    foundAccount.transactions = foundAccount.transactions.map(transaction => {
        if (transaction._id === updatedTransaction._id) {
            return updatedTransaction
        } else {
            return transaction
        }
    })

    const updatedAccoutt = await foundAccount.save()
    return updatedAccoutt
}



export default editTransaction;