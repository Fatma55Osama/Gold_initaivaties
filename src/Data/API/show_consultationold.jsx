import axios from "axios"

export const show_consultationold=async(domain,token)=>{
let final =[]
await axios.get(`${domain}/api/QuestionsControllerAPI/by-user/${token}`).then((res)=>{
    final =res.data
}).catch((err)=>{console.log(err)})
return final
}