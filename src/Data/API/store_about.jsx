import axios from "axios"

export const store_about =async(domain)=>{
    let final =[]
    await axios.get(`${domain}/api/AboutControllerAPI`).then((res)=>{
      final = res.data
    }).catch((err)=>console.log(err))
    return final
}