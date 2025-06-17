import axios from "axios"

export const store_initiativenumber = async (domain) => {
    let final = []
    await axios.get(`${domain}/api/InitiativeNumbersControllerAPI`).then((res) => {
        final = res.data
    }).catch((err) => { console.log(err) })
    return final
}