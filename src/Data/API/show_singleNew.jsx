import axios from "axios"

export const show_singleNew=async(domain,id)=>{
    let final ={}
    await axios.get(`${domain}/api/NewsControllerAPI/GetById`,{
        params:{
          id:id,
        }
    }).then((res)=>{
        final=res.data
        console.log("show_singleNew",final)

    }).catch((err)=>{
       console.log(err)
    })
    return final
}