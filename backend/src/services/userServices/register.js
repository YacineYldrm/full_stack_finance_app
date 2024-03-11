import User from "../../models/User.js"
import { createSaltHash } from "../../utils/hasher.js";



const register = async (registrationData) => {

    const { email, password } = registrationData;

    const foundUser = await User.findOne({ email });
    if (foundUser) throw new Error("User with this email already exists! If you can't remember your password, you can click on Forgot Password link to reset.");

    const saltHash = createSaltHash();
    const passwordhash = hasher(password, saltHash);
    const v_code = Math.random().toString().slice(2, 8);

    const newUser = {
        registrationData,
        saltHash,
        passwordhash,
        v_code
    }

    const registeredUser = await User.create(newUser);

    return registeredUser.generateUserInfo();
}


export default register;