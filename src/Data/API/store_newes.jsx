import axios from "axios"

export const store_newes=async(domain)=>{
    let final =[]
    await axios.get(`${domain}/api/News/GetAllNews`).then((res)=>{
        final=res.data
        console.log(final)

    }).catch((err)=>{
       console.log(err)
    })
    return final
}