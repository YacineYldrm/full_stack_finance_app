import Account from "../../models/Account.js";

const edit = async (authorizedUserId, accountInfo) => {
    const foundAccount = await Account.findById(accountInfo._id);

    if (!foundAccount) throw new Error("Account doesn't exist anymore!");

    if (foundAccount.owner !== authorizedUserId)
        throw new Error(
            "You are not allowed to edit this account. You must be the owner!"
        );

    return await Account.findByIdAndUpdate(foundAccount._id, accountInfo, {
        new: true,
    });
};
