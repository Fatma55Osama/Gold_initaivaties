import axios from "axios"

export const store_govs=async(domain)=>{
    let final =[]
    await axios.get(`${domain}/api/Gov/GetAllGovs`).then((res)=>{
      final =res.data
    }).catch((err)=>{console.log(err)})
    return final
}