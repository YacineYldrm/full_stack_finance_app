import Account from "../../models/Account.js";


const create = async (req) => {
    const ownerId = req.authorizedUser;
    const accountData = req.body;
    if (!accountData.cardNumber) throw new Error("Cardnumber must be provided!!!");
    const newAccount = {
        ...accountData,
        ownerId,
        members: [ownerId]
    }
    const createdAccount = await Account.create(newAccount);
    return createdAccount
}


export default create;