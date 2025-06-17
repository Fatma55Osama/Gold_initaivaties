import axios from "axios"

export const store_Infograph =async(domain)=>{
    let final =[]
  await axios.get(`${domain}/api/InfographControllerAPI`).then((res)=>{
    final =res.data  
    console.log(final)
  }).catch((err)=>{
      console.log(err)
  })
  return final
}