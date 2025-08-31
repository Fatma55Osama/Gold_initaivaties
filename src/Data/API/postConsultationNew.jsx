import axios from "axios"

export const postConsultationNew = (domain, token, values) => {
    const data = {
        "regesterId": Number(token),
        "questionText": values.question,
        "qAnswerText": null,
        "entryDate": new Date().toISOString()
    }
    return axios.post(`${domain}/api/QuestionsControllerAPI/add-question`,data).then((res)=>{
        console.log(res)
        return res
    }).catch((err)=>{
        console.log(err)
        throw err
    })
}