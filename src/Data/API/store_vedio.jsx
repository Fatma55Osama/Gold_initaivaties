import axios from "axios"

export const store_vedio =async(domain)=>{
    let final =[]
    await axios.get(`${domain}/api/VideoLibraryControllerAPI`).then((res)=>{
        final =res.data
    }).catch((err)=>console.log(err))
    return final
}