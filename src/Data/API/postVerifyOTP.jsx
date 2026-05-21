import axios from "axios"

export const postVerifyOTP = (domain, values) => {
    let data = {
        "email": values.email,
        "otp": Array.isArray(values.otp)
            ? values.otp.join('')
            : values.otp,
        // "newPassword": values.newPassword
    }
    return axios.post(`${domain}/api/Auth/VerifyOTP`, data).then((res) => {
        return res.data;
    }).catch((err) => {
        console.log(err)
        throw err
    })

}