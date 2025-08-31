import axios from "axios"

export const show_singleTeam=async(domain,id)=>{
    let final ={}
    await axios.get(`${domain}/api/VActiveEmpControllerAPI/GetById?id=${id}`).then((res)=>{
        final=res.data
        console.log("show_singleTeam",final)

    }).catch((err)=>{
       console.log(err)
    })
    return final
}