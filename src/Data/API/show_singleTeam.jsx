import axios from "axios"

export const show_singleTeam=async(domain,id)=>{
    let final ={}
    await axios.get(`${domain}/api/VActiveEmpControllerAPI/GetById?id=${id}`).then((res)=>{
        final=res.data

    }).catch((err)=>{
       console.log(err)
    })
    return final
}