import axios from "axios"

export const store_Importantlink=async(domain)=>{
   let final =[]
   await axios.get(`${domain}/api/ImportantLinksControllerAPI`).then((res)=>{
      final=res.data
      console.log(final)
   }).catch((err)=>{
       console.log(err)
   })
   return final
}