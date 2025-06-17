import axios from "axios"

export const store_photo=async(domain)=>{
    let final =[]
    await axios.get(`${domain}/api/VPhotoesControllerAPI`).then((res)=>{
        final=res.data

    }).catch((err)=>{
       console.log("Error fetching photos:", err)
    })
    return final
}