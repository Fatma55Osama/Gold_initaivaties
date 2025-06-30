import axios from "axios"

export const store_vindicator =async(domain)=>{
    let final =[]
    await axios.get(`${domain}/api/VIndicators`).then((res)=>{
        final =res.data
    }).catch((err)=>console.log(err))
    return final
}