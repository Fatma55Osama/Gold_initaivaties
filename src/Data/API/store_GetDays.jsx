import axios from "axios"

export const store_GetDays=async(domain)=>{
    let final =[]
    await axios.get(`${domain}/api/Appointments/GetDays`).then((res)=>{
        final=res.data.data
        console.log(final)
    }).catch((err)=>console.log(err))
return final
}