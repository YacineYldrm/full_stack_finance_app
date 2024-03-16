import Account from "../../models/Account.js";
import User from "../../models/User.js";

const edit = async (authorizedUserId, accountInfo) => {
    const foundAccount = await Account.findById(accountInfo._id);

    if (!foundAccount) throw new Error("Account doesn't exist anymore!");

    if (foundAccount.owner.toString() !== authorizedUserId)
        throw new Error(
            "You are not allowed to edit this account. You must be the owner!"
        );

    if (accountInfo.newMember) {
        console.log("####", accountInfo.newMember);
        const foundMember = await User.findOne({
            email: accountInfo.newMember,
        });
        if (!foundMember) throw new Error("User does not exist!");
        if (
            !!foundAccount.members.find(
                (member) => member.toString() === foundMember._id.toString()
            )
        )
            throw new Error("Member already exists!");

        foundAccount.members = [...foundAccount.members, foundMember._id];
        return await foundAccount.save();
    }

    return await Account.findByIdAndUpdate(foundAccount._id, accountInfo, {
        new: true,
    });
};

export default edit;
