import React, { useEffect, useState } from 'react'
import SectionContainHeader from '../SectionContainHeader'
import { usedomain, usevindicator } from '../../Store';
import { getAllData } from '../../Data/Repo/dataRepo';
import { IoPrint } from 'react-icons/io5';
import ChartBar from '../ChartBar';
import section1 from '../../assets/section1.png'
import styles from './index.module.css'
export default function PrintReport() {
    const { vindicatorr, setvindicator } = usevindicator();
    const { domain } = usedomain();
    const [selectedIndicator, setSelectedIndicator] = useState('');
    const [chartImg, setChartImg] = useState('');

    const [city, setCity] = useState('')
    useEffect(() => {
        getAllData.get_store_vindicator(domain).then(res => {
            setvindicator(res);
        });
    }, []);

    const filteredData = vindicatorr.filter(el => {
        const byIndicator = selectedIndicator ? el.indName.trim() === selectedIndicator.trim() : true;
        const byCity = city ? el.govName.trim() === city.trim() : true;


        return byIndicator && byCity;   // لازم الشرطان يساويا true
    });

    const handlePrint = () => {
        if (filteredData.length === 0) {
            alert('لا يوجد بيانات للطباعة');
            return;
        }

        if (!chartImg) {
            alert('يرجى الانتظار لحين تحميل الجراف');
            return;
        }

        const printContents = document.getElementById('reportPrint').innerHTML;
        const newWindow = window.open('', '', 'width=800,height=600');

        newWindow.document.write(`
        <html dir="rtl">
            <head>
                <title>تقرير المؤشر</title>
                
                <!-- 💡 لينك Bootstrap -->
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" />
                
                <!-- 💡 لينك ملف CSS بتاعك -->
                <link rel="stylesheet" href="${window.location.origin}/styles/index.module.css" />

                <style>
          @media print {
            thead { display: table-header-group; }
            tfoot { display: table-footer-group; }
            table {
              page-break-inside: auto;
              border-collapse: collapse;
              width: 100%;
            }
            tr {
              page-break-inside: avoid;
              page-break-after: auto;
            }
          }

          table, th, td {
            border: 1px solid #000;
            padding: 8px;
            text-align: center;
          }

          h3 {
            text-align: center;
            margin: 20px 0;
          }
           .avoid-break {
  display: block;
  page-break-inside: avoid !important;
  break-inside: avoid !important;
}
        </style>
            </head>
            <body>
                ${printContents}
            </body>
        </html>
    `);

        newWindow.document.close();
        newWindow.onload = () => {
            setTimeout(() => {
                newWindow.focus();
                newWindow.print();
                newWindow.close();
            }, 500);
        };
    };

    return (
        <div>
            <div className='d-flex flex-column   '>
                <div className="d-flex align-items-center container col-12  py-4 gap-2" dir='rtl'>
                    <label className="form-label col-1 m-0">إسم المؤشر</label>
                    <select
                        value={selectedIndicator}
                        onChange={e => setSelectedIndicator(e.target.value)}
                        className="form-select"
                        style={{ minWidth: '200px' }}
                    >
                        <option value="">اختار اسم المؤشر</option>
                        {[...new Set(vindicatorr.map(i => i.indName))].map((name, idx) => (
                            <option key={idx} value={name}>
                                {name}
                            </option>
                        ))}
                    </select>
                    <IoPrint
                        style={{ fontSize: 30, cursor: 'pointer', color: '#0d6efd' }}
                        onClick={handlePrint}
                        title="طباعة التقرير"
                    />
                </div>
                <div id="reportPrint">
                    <div className="avoid-break">
                        <div className='col-12'>

                            <img className='col-12' height={310} src={section1} alt="" />
                        </div>
                        {/* <SectionContainHeader /> */}
                        <div className="container mb-5 mt-4" dir="rtl" id={styles.bordercontan}>

                            <div className=''>
                                {selectedIndicator && (
                                    <span className="text-center">المؤشر المختار: {selectedIndicator}</span>
                                )}

                                {filteredData.length > 0 ? (
                                    <>
                                        <div className='d-flex'>
                                            {(selectedIndicator || city) &&
                                                <>
                                                    <table className="table table-bordered text-center">
                                                        <thead>
                                                            <tr>
                                                                <th>#</th>
                                                                <th>اسم المحافظة</th>
                                                                <th>نوع الخدمة</th>
                                                                <th>التاريخ</th>
                                                                <th>عددهم</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {filteredData.map((el, index) => (
                                                                <tr key={index}>
                                                                    <td>{index + 1}</td>
                                                                    <td>{el.govName}</td>
                                                                    <td>{el.mashoraDesc}</td>
                                                                    <td>{el.indDate}</td>
                                                                    <td>{el.indValue || '0'}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>

                                                    {/* ✅ الجراف خارج الجدول لتجنب الفصل */}
                                                    <div className="d-print-none" style={{ width: '100%', height: '220px' }}>
                                                        <ChartBar data={filteredData} onRenderAsImage={setChartImg} />
                                                    </div>

                                                    <div className="d-none d-print-block mt-3">
                                                        {chartImg && <img src={chartImg} alt="Graph" style={{ width: '100%', height: '220px' }} />}
                                                    </div>
                                                </>

                                            }



                                        </div>

                                    </>
                                ) : (
                                    <p className="text-muted text-center">لا يوجد بيانات</p>
                                )}

                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}
