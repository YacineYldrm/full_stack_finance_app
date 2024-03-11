import Account from "../../models/Account.js"

const getAccounts = async(userId)=>{
    const foundAccounts = await Account.find({members: userId})
    if(foundAccounts.length <= 0) throw new Error("You don't have any accounts, please create one")
    return foundAccounts
}

export default getAccounts