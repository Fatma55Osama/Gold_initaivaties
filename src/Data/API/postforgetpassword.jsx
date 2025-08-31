import axios from "axios"

export const postforgetpassword = (domain, values) => {
    let data = {
        "email": values.email
    }
    return axios.post(`${domain}/api/RegestrationsControllerAPI/forgot-password`, data).then((res) => {
        return res.data;
    }).catch((err) => {
      console.log(err)
      throw err
    })

}