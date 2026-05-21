import axios from "axios";

export const show_appointmentbyday = async (domain, day) => {
  let final = {};
  await axios.get(`${domain}/api/Appointments/GetAppointmentsByDay`,{
    params:{
        day:day
    }
  }).then((res)=>{final=res.data.data, console.log(final)}).catch((err)=>console.log(err))
  return final
};
