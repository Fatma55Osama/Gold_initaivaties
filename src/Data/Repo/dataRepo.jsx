import { show_single_service } from "../API/show_single_service"
import { show_singleinfograph } from "../API/show_singleinfograph"
import { show_singleNew } from "../API/show_singleNew"
import { store_about } from "../API/store_about"
import { store_awarnessmsg } from "../API/store_awarnessmsg"
import { store_employess } from "../API/store_employess"
import { store_govs } from "../API/store_govs"
import { store_Importantlink } from "../API/store_Importantlink"
import { store_Infograph } from "../API/store_Infograph"
import { store_initiativenumber } from "../API/store_initiativenumber"
import { store_newes } from "../API/store_newes"
import { store_photo } from "../API/store_photo"
import { store_servicemains } from "../API/store_servicemains"
import { store_vedio } from "../API/store_vedio"
import { store_vindicator } from "../API/store_vindicator"
import { storecontact } from "../API/storecontact"

export const getAllData = {
    get_all_employess: async (domain) => {
        return await store_employess(domain)
    },
    get_allmainpage_infograph: async (domain) => {
        return await store_Infograph(domain)
    },
    get_allimportant_link: async (domain) => {
        return await store_Importantlink(domain)
    },
    get_allnews: async (domain) => {
        return await store_newes(domain)
    },
    get_show_singleNew: async (domain, id) => {
        return await show_singleNew(domain, id)
    },
    get_all_about: async (domain) => {
        return await store_about(domain)
    },
    get_all_awarnessmsg: async (domain) => {
        return await store_awarnessmsg(domain)
    },
    get_all_servicemain: async (domain) => {
        return await store_servicemains(domain)
    },
    get_all_govs: async (domain) => {
        return await store_govs(domain)
    },
    get_all_initiativenumber: async (domain) => {
        return await store_initiativenumber(domain)
    },
    get_all_vedio: async (domain) => {
        return await store_vedio(domain)
    },
    get_all_photo: async (domain) => {
        return await store_photo(domain)
    },
    get_show_singleinfograph: async (domain, id) => {
        return await show_singleinfograph(domain, id)
    },
    get_show_single_service: async (domain, id) => {
        return await show_single_service(domain, id)
    },
    get_storecontact: async (domain) => {
        return await storecontact(domain)
    },
      get_store_vindicator: async (domain) => {
        return await store_vindicator(domain)
    }
}