import { store_about } from "../API/store_about"
import { store_awarnessmsg } from "../API/store_awarnessmsg"
import { store_employess } from "../API/store_employess"
import { store_govs } from "../API/store_govs"
import { store_Importantlink } from "../API/store_Importantlink"
import { store_Infograph } from "../API/store_Infograph"
import { store_initiativenumber } from "../API/store_initiativenumber"
import { store_newes } from "../API/store_newes"
import { store_servicemains } from "../API/store_servicemains"

export const getAllData ={
    get_all_employess:async(domain)=>{
        return await store_employess(domain)
    },
    get_allmainpage_infograph:async(domain)=>{
        return await store_Infograph(domain)
    },
    get_allimportant_link:async(domain)=>{
        return await store_Importantlink(domain)
    },
    get_allnews :async(domain)=>{
        return await store_newes(domain)
    },
    get_all_about:async(domain)=>{
        return await store_about(domain)
    },
    get_all_awarnessmsg:async(domain)=>{
        return await store_awarnessmsg(domain)
    },
    get_all_servicemain:async(domain)=>{
        return await store_servicemains(domain)
    },
    get_all_govs:async(domain)=>{
        return await store_govs(domain)
    },
    get_all_initiativenumber:async(domain)=>{
        return await store_initiativenumber(domain)

    }
}