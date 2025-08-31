import axios from "axios"

export const postResetpassword = (domain, values) => {
    let data = {
        "email": values.email,
        "otp": values.otp.join(''),
        "newPassword": values.newPassword
    }
    return axios.post(`${domain}/api/RegestrationsControllerAPI/reset-password`, data).then((res) => {
        console.log(res.data);
        return res.data;
    }).catch((err) => {
        console.log(err)
        throw err
    })

}