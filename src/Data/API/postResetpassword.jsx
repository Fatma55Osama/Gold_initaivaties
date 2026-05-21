import axios from "axios";

export const postResetpassword = (domain, values) => {
  let data = {
  "email": values.email,
  "newPassword": values.newPassword
};
  return axios
    .post(`${domain}/api/Auth/ResetPassword`, data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};
