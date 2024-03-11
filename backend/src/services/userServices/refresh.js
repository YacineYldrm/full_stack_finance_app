import createToken from "../../jwt/createToken.js"





const refresh = async (userId) => {
    const newAccessToken = createToken(userId);
    return newAccessToken;
}


export default refresh;