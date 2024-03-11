import User from "../../models/User.js";
import { createSaltHash, hasher } from "../../utils/hasher.js";
import sendMail from "../../utils/sendverificationMail.js";

const register = async (registrationData) => {
    const { email, password } = registrationData;

    const foundUser = await User.findOne({ email });
    if (foundUser)
        throw new Error(
            "User with this email already exists! If you can't remember your password, you can click on Forgot Password link to reset."
        );

    const saltHash = createSaltHash();
    const passwordHash = hasher(password, saltHash);
    const v_code = Math.random().toString().slice(2, 8);

    const newUser = {
        ...registrationData,
        saltHash,
        passwordHash,
        v_code,
    };

    const registeredUser = await User.create(newUser);
    await sendMail(v_code, registeredUser.generateUserInfo());
    return registeredUser.generateUserInfo();
};

export default register;
