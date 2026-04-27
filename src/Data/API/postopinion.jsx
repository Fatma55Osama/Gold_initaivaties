import axios from "axios"

export const postopinion =  (domain, values) => {
    const data = {
        "name": values.name,
        "email":values.email,
        "mobileNum": values.phone,
        "opinionText": values.opinion
    }
     return axios.post(`${domain}/api/OpinionControllerAPI/Add`, data).then((res) => {
        return res
    }).catch((err) => {
        console.log(err)
        throw err
    })

}