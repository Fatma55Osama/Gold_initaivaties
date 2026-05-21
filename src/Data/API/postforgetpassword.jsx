import axios from "axios"

export const postforgetpassword = (domain, values) => {
    let data = {
        Email: values.email
    }
    return axios.post(`${domain}/api/Auth/SendOTP`,null, {
        params:data
    }).then((res) => {
        return res.data;
    }).catch((err) => {
      console.log(err)
      throw err
    })

}