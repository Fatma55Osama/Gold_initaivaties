// import React, { useState } from "react";
// import { usedoctorsData } from "../../Store";

// export default function Meeting() {
//   const { doctors } = usedoctorsData();
//   const [selectedDoctor, setSelectedDoctor] = useState(null);

//   const startConsultation = () => {
//     const activeDoctor = doctors.find((doc) => doc.active === true);

//     if (!activeDoctor) {
//       alert("🚫 لا يوجد دكاترة متاحين الآن، حاول لاحقًا.");
//       return;
//     }

//     setSelectedDoctor(activeDoctor);

//     // فتح الاجتماع في تاب جديدة مباشرة
//     window.open(`https://meet.jit.si/${activeDoctor.roomName}`, "_blank");
//   };

//   const endConsultation = () => {
//     setSelectedDoctor(null);
//   };

//   return (
//     <div className="container py-5 text-center">
//       <h2>💬 استشارة أونلاين</h2>
//       {!selectedDoctor ? (
//         <button onClick={startConsultation} className="btn btn-success btn-lg mt-3">
//           🚀 ابدأ الاستشارة
//         </button>
//       ) : (
//         <div>
//           <h5 className="mb-3">
//             الاجتماع فتح في تاب جديدة مع: <span className="text-primary">{selectedDoctor.name}</span>
//           </h5>
//           <button className="btn btn-danger" onClick={endConsultation}>
//             ❌ إنهاء الاستشارة
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }
