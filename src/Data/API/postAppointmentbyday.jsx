import axios from "axios";

export const postAppointmentbyday = (domain, id, token, consultationType) => {
  return axios
    .post(`${domain}/api/Appointments/BookAppointment`, {
      id: id,
      userId: token,
      appointmentsType: consultationType,
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};
