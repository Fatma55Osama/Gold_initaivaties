import axios from "axios"

export const postJion_team =  (domain, values) => {
    const data = {
        "memberName":values.name,
        "mobileNum": values.phone,
        "eMail": values.email,
        "qualificationId": values.qualification,
        "currentJob": values.jop,
        "entryDate": new Date().toISOString()
    }
    return axios.post(`${domain}/api/TeamMembersControllerAPI`, data).then((res)=>{
        console.log("postJion_team",res)
        return res;
    }).catch((err)=>{console.log("postJion_team",err) 
        throw err;
    })

}