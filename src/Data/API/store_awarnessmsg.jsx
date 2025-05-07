import axios from "axios"

export const store_awarnessmsg =async(domain)=>{
    let final =[]
    await axios.get(`${domain}/api/AwarnessMsg/GetAllAwarnessMsg`).then((res)=>{
        final =res.data
    }).catch((err)=>console.log(err))
    return final 
}