import axios from "axios"

export  const show_appointmentforuser=async(domain,token)=>{
let final =[]
await axios.get(`${domain}/api/Appointments/GetClosestAppointmentForUser`,{
    params:{userId:token}
}).then((res)=>{final=res.data ;}).catch((err)=>console.log(err))
return final
} 