import Account from "../../models/Account.js";
import User from "../../models/User.js";
import { hasher } from "../../utils/hasher.js";

const _delete = async (auhtorizedUserId, accountId, password) => {
    const foundAccount = await Account.findById(accountId);

    if (!foundAccount) throw new Error("Account doesn't exist anymore!");

    if (foundAccount.owner.toString() !== auhtorizedUserId)
        throw new Error(
            "You can't delete this account. To delete an account you must be the owner!"
        );

    const foundUser = await User.findById(auhtorizedUserId);

    if (!foundUser) throw new Error("User doesn't exist anymore!");

    const hashedPw = hasher(password, foundUser.saltHash);
    if (foundUser.passwordHash !== hashedPw)
        throw new Error("Password is wrong!");

    Promise.all(
        foundAccount.members.map(
            async (member) =>
                await User.findByIdAndUpdate(member, {
                    $pull: { accounts: accountId },
                })
        )
    );

    const deletedAccount = await Account.findByIdAndDelete(accountId);

    return deletedAccount;
};

export default _delete;
