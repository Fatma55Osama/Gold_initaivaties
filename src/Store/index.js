import { create } from "zustand";
import { getDomain, getPathImg, getSiteUrl } from "../configLoader";

export const usepathes = create(() => ({
  path: [
    {
      name: "تواصل معنا",
      mainPath: "/contactus",
      links: [
        { label: " الأستشارات السابقة  ", path: "/consultationold" },
        { label: " استشارة جديدة ", path: "/consultationnew" },
        { label: "نسيت كلمة", path: "/forgetpassword" },
        { label: "مستخدم جديد", path: "/register" },

        // { label: "تسجيل الدخول", path: "/login" },
        { label: " صفحتي الشخصية  ", path: "/consultationnew" },

        { label: " انضم لفريقنا", path: "/jointeams" },
        { label: "الأسئلة الشائعة", path: "/question" },
        { label: "رأيك يهمنا", path: "/opinion" },
        { label: "تواصل معنا", path: "/contactus" },
      ],
    },
      {
      name: "تسجيل الدخول",
      links: [{ label: "تسجيل الدخول", path: "/login" }],
    },

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

export const usedomain = create(() => ({
  domain: getDomain(),
}));
export const useallActiveEmployees = create((set) => ({
  Employees: [],
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
export const useModalChatbot = create((set) => ({
  modalChatbot: false,
  openModalChatbot:()=>set(() => ({ modalChatbot: true })),
  closeModalChatbot:()=>set(() => ({ modalChatbot: false })),
  toggleModalChatbot:()=>set((state)=>({modalChatbot:!state.modalChatbot}))
}));
export const usemodalmashora = create((set) => ({
 modalmashora: false,
  openModalmashora:()=>set(() => ({ modalmashora: true })),
  closeModalmashora:()=>set(() => ({ modalmashora: false })),
}));
export const usedetailsservice = create((set) => ({
  detailservice: {},
  setdetailsservice: (val) => set(() => ({ detailservice: val })),
}));
export const usepathimg = create(() => ({
  pathimg: getPathImg(),
}));
export const usesiteurl = create(() => ({
  siteUrl: getSiteUrl(),
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
export const useModalvedio = create((set) => ({
  modalvedio: false,
  openModalvedio: () => set(() => ({ modalvedio: true })),
  closeModalvedio: () => set(() => ({ modalvedio: false })),
}));
export const usePlay = create((set) => ({
  isplaying: false,
  setIsplaying: () => set(() => ({ isplaying: true })),
}));

export const usedetailslight = create((set) => ({
  lightTeam: {},
  setlightTeam: (val) => set(() => ({ lightTeam: val })),
}));

export const usedetailconsultationold = create((set) => ({
  consultationold: [],
  setdetailsconsultation: (val) => set(() => ({ consultationold: val })),
}));
export const useprofileData = create((set) => ({
  profileData: {},
  setProfileData: (val) => set(() => ({ profileData: val })),
}));
export const useLoading = create((set) => ({
  isLoading: false,
  setIsLoading: (value) => set(() => ({ isLoading: value })),
}));
// src/data/doctorsData.js
export const usedoctorsData = create((set) => ({
  doctors: [
    { id: 1, name: "د. أحمد", roomName: "room-ahmed", active: false },
    { id: 2, name: "د. فاطمة", roomName: "room-fatma", active: false },
    { id: 3, name: "د. عمر", roomName: "room-omar", active: false },
  ],

  // الطبيب يضغط "ابدأ استقبال الاستشارات"
  setDoctorActive: (id, isActive) =>
    set((state) => ({
      doctors: state.doctors.map((doc) =>
        doc.id === id ? { ...doc, active: isActive } : doc
      ),
    })),
}));
