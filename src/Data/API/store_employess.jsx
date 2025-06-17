import axios from "axios"

export const store_employess=async(domain)=>{
    let final =[]
    await axios.get(`${domain}/api/VActiveEmpControllerAPI`).then((res)=>{
        final=res.data
        console.log(final)

    }).catch((err)=>{console.log(err)})
    // console.log(final)
    return final
}