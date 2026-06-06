import axios from "axios"

export const postChatbotEvaluation=(domain,data)=>{
return axios.post(`${domain}/api/ChatbotEvaluations/CreateEvaluation`,data,{
 headers:{
  "Content-Type":
   "application/json"
 }}).
    then((res) => {
      return res;
      
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
}