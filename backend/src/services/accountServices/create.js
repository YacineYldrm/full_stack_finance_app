import Account from "../../models/Account.js";
import User from "../../models/User.js";

const create = async (req) => {
    console.log(req.body);
    const owner = req.authorizedUser;
    const accountData = req.body;
    if (!accountData.cardNumber)
        throw new Error("Cardnumber must be provided!!!");
    const newAccount = {
        ...accountData,
        owner,
        members: [owner],
    };
    const createdAccount = await Account.create(newAccount);
    await User.findByIdAndUpdate(owner, {
        $push: { accounts: createdAccount._id },
    });
    return createdAccount;
};

export default create;
