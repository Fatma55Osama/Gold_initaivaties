import axios from "axios";

export const post_EvaluateMeeting = (
  domain,
  appointmentId,
  token,
  raeting,
  feedback,
) => {
  return axios
    .post(`${domain}/api/Appointments/EvaluateMeeting`, {
      appointmentsId: appointmentId,
      userId: token,
      rating: raeting,
      feedback: feedback,
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};
