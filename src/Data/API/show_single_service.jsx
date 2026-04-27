import axios from "axios"

export const show_single_service=async(domain,id)=>{
    let final ={}
    await axios.get(`${domain}/api/VServicesControllerAPI/GetById`,{
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