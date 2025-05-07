import { create } from "zustand";


export const usepathes = create(() => ({
  path: [
    { name: "تواصل معنا", path: "/contactus"},
    { name: "الركن الإعلامي", path: "/mediacorner"},
    { name: "نتائج المبادرة", path: "/resultinitiative"},
    { name: "مؤشرات المبادرة", path: "/indicators"},
    { name: "خدمات المبادرة", path: "/serviceinitiative"},
    { name: "عن المبادرة", path: "/about"},
    { name: "الرئيسية", path: "/"},
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
  domain: "https://localhost:7091",
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
