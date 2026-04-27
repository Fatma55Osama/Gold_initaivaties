import axios from "axios"

export const show_singleinfograph=async(domain,id)=>{
    let final ={}
    await axios.get(`${domain}/api/InfographControllerAPI/GetById`,{
        params:{
          id:id,
        }
    }).then((res)=>{
        final=res.data

    }).catch((err)=>{
       console.log(err)
    })
    return final
}