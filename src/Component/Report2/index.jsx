
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { usedomain, usevindicator } from '../../Store';
import { getAllData } from '../../Data/Repo/dataRepo';
import { IoPrint } from 'react-icons/io5';
import ChartBar from '../ChartBar';
import { getDomain } from '../../configLoader';

export default function Report2() {
    const { vindicatorr, setvindicator } = usevindicator();
    const  domain  = getDomain();
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

        const printContents = document.getElementById('reportPrint').innerHTML;
        const newWindow = window.open('', '', 'width=800,height=600');

        newWindow.document.write(`
    <html dir="rtl">
      <head>
        <title>تقرير المؤشر</title>
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
        </style>
      </head>
      <body>
        ${printContents}
      </body>
    </html>
  `);

        newWindow.document.close();
        newWindow.focus();
        newWindow.print();
        newWindow.close();
    };

    return (
        <div className="container mt-4 py-5 mb-3" dir="rtl">
            <div className="d-flex  justify-content-between align-items-center mb-3">
                <div className='d-flex flex-column'>
                    <div className="d-flex align-items-center gap-2">
                        <label className="form-label m-0">إسم المؤشر</label>
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
                    </div>
                    <div className="d-flex align-items-center gap-2">
                        <label className="form-label m-0">المحافظة</label>
                        <select
                            value={city}
                            onChange={e => setCity(e.target.value)}
                            className="form-select"
                            style={{ minWidth: '200px' }}
                        >
                            <option value="">اختار اسم المحافظة</option>
                            {[...new Set(vindicatorr.map(i => i.govName))].map((name, idx) => (
                                <option key={idx} value={name}>
                                    {name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>


                {/* زر الطباعة */}
                <IoPrint
                    style={{ fontSize: 30, cursor: 'pointer', color: '#0d6efd' }}
                    onClick={handlePrint}
                    title="طباعة التقرير"
                />
            </div>

            {/* 3) الجزء القابل للطباعة ومعرّف بـ id="reportPrint" */}
            <div id="reportPrint">
                {selectedIndicator && (
                    <h3 className="text-center my-3">المؤشر المختار: {selectedIndicator}</h3>
                )}

                {filteredData.length > 0 ? (
                    <>
                        <div className='d-flex'>
                            {(selectedIndicator || city) && <table className="table table-bordered text-center">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>اسم المحافظة</th>
                                        <th>نوع الخدمة</th>
                                        <th>التاريخ</th>
                                        <th>عددهم</th>
                                        {selectedIndicator && <th>{selectedIndicator}</th>}


                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.map((el, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{el.govName}</td>
                                            <td>{el.mashoraDesc}</td>
                                            {/* <td>  {el.monthDesc}/{el.indYear}</td> */}
                                            <td>{el.indDate}</td>
                                            <td>{el.indValue || '0'}</td>

                                            {selectedIndicator && index === 0 ? (
                                                <td rowSpan={filteredData.length}>
                                                    {/* يظهر الجراف في الشاشة */}
                                                    <div className="d-print-none" style={{ width: '100%', height: '220px' }}>
                                                        <ChartBar data={filteredData} onRenderAsImage={setChartImg} />
                                                    </div>

                                                    {/* يظهر الصورة في الطباعة فقط */}
                                                    <div className="d-none d-print-block">
                                                        {chartImg && <img src={chartImg} alt="Graph" style={{ width: '100%', height: '220px' }} />}
                                                    </div>
                                                </td>
                                            ) : null}


                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            }



                        </div>

                    </>
                ) : (
                    <p className="text-muted text-center">لا يوجد بيانات</p>
                )}

            </div>
        </div>
    );
}
