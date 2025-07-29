import { create } from "zustand";
import { getDomain, getPathImg } from "../configLoader";

export const usepathes = create(() => ({
  // path: [
  //   { name: "تواصل معنا", path: "/contactus" },
  //   {
  //     name: "الركن الإعلامي",
  //     path: "/mediacorner",
  //     includes: ["/messages", "/infograph", "/video", "/Photo", "/mediacorner"],
  //   },
  //   { name: "نماذج مضيئة", path: "/lightteam" },
  //   { name: "مؤشرات المبادرة", path: "/indicators" },
  //   { name: "خدمات المبادرة", path: "/Services" },
  //   { name: "عن المبادرة", path: "/about" },
  //   { name: "الرئيسية", path: "/" },
  // ],
  path: [
    {
      name: "تواصل معنا",
      mainPath: "/contactus",
      links: [
        { label: "الأسئلة الشائعة", path: "/question" },
        { label: "رأيك يهمنا", path: "/opinion" },
        { label: "تواصل معنا", path: "/contactus" },
      ],
    },
    //  {
    //   name: "رأيك يهمنا",
    //   links: [{ label:  "رأيك يهمنا", path: "/opinion" }],
    // },
    {
      name: "الركن الإعلامي",
      mainPath: "/mediacorner",
      links: [
        { label: "الرسائل التوعوية", path: "/messages" },
        { label: "قائمة الإنفوجراف", path: "/infograph" },
        { label: "مكتبة الفيديو", path: "/video" },
        { label: "ألبومات الصور", path: "/Photo" },
        { label: "أخبار المبادرة", path: "/mediacorner" },
      ],
    },
    {
      name: "نماذج مضيئة",
      links: [{ label: "نماذج مضيئة", path: "/lightteam" }],
    },
    {
      name: "مؤشرات المبادرة",
      links: [{ label: "مؤشرات المبادرة", path: "/indicators" }],
    },
    {
      name: "خدمات المبادرة",
      links: [{ label: "خدمات المبادرة", path: "/Services" }],
    },
    {
      name: "عن المبادرة",
      links: [{ label: "عن المبادرة", path: "/about" }],
    },
    {
      name: "الرئيسية ",
      links: [{ label: " الرئيسية", path: "/" }],
    },
  ],
}));

// export const useData = create(() => ({
//   dataphotos: [
//     { img: meet1, text: "إجتماع المجلس الاقليمى للسكان برئاسة محافظ المنوفية" },
//     { img: meet2, text: "إجتماع المجلس الاقليمى للسكان برئاسة محافظ المنوفية" },
//     { img: meet3, text: "إجتماع المجلس الاقليمى للسكان برئاسة محافظ المنوفية" },
//     { img: meet4, text: "إجتماع المجلس الاقليمى للسكان برئاسة محافظ المنوفية" },
//   ],
//   setphoto: (photo) => set(() => ({ dataphotos: photo })),
// }));
export const usedomain = create(() => ({
  domain: getDomain(),
}));
export const useallActiveEmployees = create((set) => ({
  Employees: [
    // { img: team1, name: "أ. نسرين حسن", role: "رئيسة التمريض" },
    // { img: team2, name: "د. سامح أبو النجا", role: "أخصائي طب الأطفال" },
    // { img: team3, name: "د. منى مصطفى", role: "أخصائي النساء والتوليد" },
    // { img: team4, name: "د. محمد السيد", role: "أخصائي أمراض النساء" },
  ],
  setallEmployees: (employ) => set(() => ({ Employees: employ })),
}));
export const useInfograph = create((set) => ({
  infograph: [],
  setInfograph: (info) => set(() => ({ infograph: info })),
}));

export const useImportantlink = create((set) => ({
  importantlink: [],
  setImportantlink: (important) => set(() => ({ importantlink: important })),
}));

export const useNews = create((set) => ({
  allnews: [],
  setInews: (newwes) => set(() => ({ allnews: newwes })),
}));
export const usedetailsnew = create((set) => ({
  detailnew: {},
  setdetailsnew: (val) => set(() => ({ detailnew: val })),
}));
export const useAbout = create((set) => ({
  allabout: [],
  setallabout: (about) => set(() => ({ allabout: about })),
}));
export const useAwarnessMsg = create((set) => ({
  allawarness: [],
  setallawarness: (awarn) => set(() => ({ allawarness: awarn })),
}));
export const useServicemain = create((set) => ({
  allservice: [],
  setservice: (serv) => set(() => ({ allservice: serv })),
}));
export const useGovs = create((set) => ({
  allgovs: [],
  setgovs: (gov) => set(() => ({ allgovs: gov })),
}));
export const useinitiativenumber = create((set) => ({
  allinitivenumber: [],
  setinitivenumber: (number) => set(() => ({ allinitivenumber: number })),
}));
export const useVedio = create((set) => ({
  allvedio: [],
  setallvedio: (value) => set(() => ({ allvedio: value })),
}));
export const usePhotoo = create((set) => ({
  allphoto: [],
  setallphoto: (value) => set(() => ({ allphoto: value })),
}));
export const usedetailsinfo = create((set) => ({
  detailinfo: {},
  setdetailsinfo: (val) => set(() => ({ detailinfo: val })),
}));
export const useModal = create((set) => ({
  modalindex: false,
  openModal: () => set(() => ({ modalindex: true })),
  closeModal: () => set(() => ({ modalindex: false })),
}));
export const useModalpdf = create((set) => ({
  modalpdf: false,
  openModalpdf: () => set(() => ({ modalpdf: true })),
  closeModalpdf: () => set(() => ({ modalpdf: false })),
}));
export const usedetailsservice = create((set) => ({
  detailservice: {},
  setdetailsservice: (val) => set(() => ({ detailservice: val })),
}));
export const usepathimg = create(() => ({
  pathimg:getPathImg(),
}));
export const usecontactfooter = create((set) => ({
  contactfooter: [],
  setcontactfooter: (value) => set(() => ({ contactfooter: value })),
}));
export const usevindicator = create((set) => ({
  vindicatorr: [],
  setvindicator: (value) => set(() => ({ vindicatorr: value })),
  groupBy: "indicator", // أو 'gov' أو 'month'
  setGroupBy: (value) => set({ groupBy: value }),
}));
export const usecommonquestion = create((set) => ({
 commonquestion: {},
  setcommonquestion: (val) => set(() => ({ commonquestion: val })),
}));