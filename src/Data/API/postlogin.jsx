import axios from "axios"

export const postlogin = (domain, values) => {
    const data = {
        "regName": values.username,
        "password":values.password
    }
    return axios.post(`${domain}/api/RegestrationsControllerAPI/login`,data).then((res)=>{
        console.log(res)
        return res
    }).catch((err)=>{
        console.log(err)
        throw err
    })
}