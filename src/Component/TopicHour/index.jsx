import React from 'react'
import styles from './index.module.css'
import logohealth from '../../assets/img/log3.png'
export default function TopicHour() {
    return (
        <div className={styles.TopicHour + " col-12 d-flex "}>
            <div className='container col-9 d-flex justify-content-between text-end align-items-center'>
                <div className='d-flex justify-content-center align-items-center'>
                    <img src={logohealth} alt="" />
                </div>
                <div className='col-6 d-flex flex-column gap-3'>
                    <h2>موضوع الساعة</h2>
                    <p>وزارة الصحة والسكان تُنقذ مأساة جديدة من سلسلة الانتهاكات اليومية التي تحدث لأطفالنا، بطلتها هذة المرة طفلة تبلغ من العمر 14عام دخلت مستشفى في حالة صحية متدهوره نتيجة ولادة أدت بها لحدوث حمى نفاس.
                    لابد من تكاتف كل الجهود لحماية أطفالنا وسن التشريعات والقوانين التي تحد من هذا النوع من الجرائم في حق أولادنا.</p>
                </div>

            </div>
        </div>
    )
}
