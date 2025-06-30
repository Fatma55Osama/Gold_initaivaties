import axios from "axios"
import { data } from "react-router-dom"

export const storecontact = async (domain) => {
   let final = []
   await axios.get(`${domain}/api/ContactUsControllerAPI`).then((res) => {
      console.log(res)
      final = res.data
   }).catch((err) => {
      console.log(err)
   })
   return final
}