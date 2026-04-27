import axios from "axios";

// export const postChat = (userprompt,domain) => {
//   return axios
//     .post(`${domain}/api/UploadPdf/ReplyToUser`, null, {
//       params: {
//         ask: userprompt,
//       },
//     })
//     .then((res) => {
//       return res;
//     })
//     .catch((err) => {
//       console.log(err);
//       throw err;
//     });
// };
export const postChat = (userprompt, domain, contextMessages) => {
  return axios.post(`${domain}/api/UploadPdf/ReplyToUser`, contextMessages, {
    params: { ask: userprompt },

  }) .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};





//`https://api.qudra.online/api/Ai/AskAi`