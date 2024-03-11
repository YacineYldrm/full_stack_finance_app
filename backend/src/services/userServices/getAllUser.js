import User from "../../models/User.js";

const getAllUser = async () => {
    const allUser = await User.find();
    return allUser;
};

export default getAllUser;
