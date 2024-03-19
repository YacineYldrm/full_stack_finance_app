import { backendUrl } from "../api";
import changeCardOnSwipe from "./changeCardOnSwipe";

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
        provider.setAccount(changeCardOnSwipe());
    }
};

export default getAllAccounts;
