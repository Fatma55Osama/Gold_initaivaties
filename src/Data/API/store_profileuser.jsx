import axios from "axios"

export const store_profileuser =async(domain,token)=>{
    let final ={}
    await axios.get(`${domain}/api/RegestrationsControllerAPI/${token}`).then((res)=>{
        final = res.data
    }).catch((error)=>{
        console.error("Error fetching profile user data:", error);
    });
    return final
}