import { backendUrl } from "../api"

const getDelayTime = (accessToken)=>{
    const [_,payload] = accessToken.split(".")
    const {iat,exp} = JSON.parse(atob(payload))
    const delayTime = (exp-iat-60)*1000
    return delayTime
}

const getNewAccessToken = async ()=>{
    const res = await fetch(`${backendUrl}users/refresh`,{
        method: "GET",
        credentials: "include"
    })
    const {accessToken} = await res.json()
    return accessToken
}

export const silentRefresh = (accessToken, setAuthorization)=>{
    const delayTime = !accessToken ? 5000 : getDelayTime(accessToken)
    setTimeout(async()=>{
        const newAccessToken = await getNewAccessToken()
        setAuthorization(newAccessToken)
        silentRefresh(newAccessToken,setAuthorization)
    },delayTime)
}