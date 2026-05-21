import axios from "axios"

export const postregisteration =  (domain, values) => {


const data = {
    "regName": values.name,
    "mobileNum": values.phone,
    "eMail": values.email,
    "qualificationId": values.qualification,
    "currentJob": values.statework,
    "userName": values.username,
    "password": values.password,
    "entryDate": new Date().toISOString(),
    "sSn":values.sSn
}
return axios.post(`${domain}/api/RegestrationsControllerAPI`, data).then((res) => {
    return res
}).catch((err) => { console.log('postregisteration', err) 
    throw err
})
}