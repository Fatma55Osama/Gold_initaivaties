import axios from "axios"

export const show_commonQuestion=async(domain)=>{
    let final =[]
    await axios.get(`${domain}/api/CommonQuestionControllerAPI`).then((res)=>{
        final=res.data

    }).catch((err)=>{
       console.log("Error fetching show_commonQuestion:", err)
    })
    return final
}