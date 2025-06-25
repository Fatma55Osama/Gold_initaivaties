import axios from "axios"

export const postopinion = async (domain, values) => {
    const data = {
        "name": values.name,
        "email":values.email,
        "mobileNum": values.phone,
        "opinionText": values.opinion
    }
    await axios.post(`${domain}/api/OpinionControllerAPI/Add`, data).then((res) => {
        console.log(res)
    }).catch((err) => {
        console.log(err)
    })

}