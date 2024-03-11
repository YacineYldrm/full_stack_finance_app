import mongoose from "mongoose"
import Account from "../../models/Account.js"

const addTransaction = async(transactionInfo,userId)=>{
   
   const foundAccount = await Account.findById(transactionInfo.accountId)
   if(!foundAccount.members.includes(mongoose.Types.ObjectId(userId))) throw new Error ("You're not allowed to add a transaction to this account")
   const createdTransaction = await foundAccount.transactions.create(transactionInfo)
    foundAccount.transactions = [...foundAccount.transactions, createdTransaction]
    await foundAccount.save()
    return foundAccount
}

export default addTransaction