import { backendUrl } from "../api";

// #################################################

const getDelayTime = (accessToken) => {
    const [_, payload] = accessToken.split(".");
    const { iat, exp } = JSON.parse(atob(payload));
    const delayTime = (exp - iat - 60) * 1000;
    return delayTime;
};
// #################################################

const getNewAccessToken = async () => {
    const res = await fetch(`${backendUrl}users/refresh`, {
        method: "GET",
        credentials: "include",
    });
    const { result } = await res.json();
    return result;
};

// #################################################

export const silentRefresh = async (
    accessToken,
    setAuthorization,
    setActiveUser
) => {
    if (!accessToken) {
        const { activeUser, newAccessToken } = await getNewAccessToken();
        if (newAccessToken) {
            setAuthorization(`Bearer ${newAccessToken}`);
            silentRefresh(newAccessToken, setAuthorization);
            setActiveUser(activeUser);
        }
    } else {
        const delayTime = getDelayTime(accessToken);
        setTimeout(async () => {
            const { newAccessToken } = await getNewAccessToken();
            setAuthorization(`Bearer ${newAccessToken}`);
            silentRefresh(newAccessToken, setAuthorization);
        }, delayTime);
    }
};

// #################################################
