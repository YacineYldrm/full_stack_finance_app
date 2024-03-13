import { backendUrl } from "../api";



const getAllAccounts = async (provider) => {

    const response = await fetch(`${backendUrl}accounts`, {
        method: "GET",
        headers: { authorization: provider.authorization },
    });

    const { success, result, error, message } = await response.json();
    if (!success) {
        console.log(error, message);
    } else {
        provider.setAccounts(result);
        provider.setAccount(result[0]);
    }
};

export default getAllAccounts;
