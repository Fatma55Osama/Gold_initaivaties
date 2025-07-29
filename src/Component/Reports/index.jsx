import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { usedomain, usevindicator } from '../../Store';
import { getAllData } from '../../Data/Repo/dataRepo';
import { IoPrint } from 'react-icons/io5';
import printJS from 'print-js';           // ← 1) استيراد print-js
import { getDomain } from '../../configLoader';

export default function Report() {
  const { vindicatorr, setvindicator } = usevindicator();
  const  domain  = getDomain();
  const [selectedIndicator, setSelectedIndicator] = useState('');

  useEffect(() => {
    getAllData.get_store_vindicator(domain).then(res => {
      setvindicator(res);
    });
  }, []);

  const filteredData = selectedIndicator
    ? vindicatorr.filter(el => el.indName === selectedIndicator)
    : vindicatorr;

  /* 2) دالة الطباعة باستخدام print-js */
  const handlePrint = () => {
    if (filteredData.length === 0) {
      alert('لا يوجد بيانات للطباعة');
      return;
    }
    printJS({
      printable: 'reportPrint',
      type: 'html',
      targetStyles: ['*'],
      documentTitle: 'تقرير المؤشر',

    });


  };

  return (
    <div className="container mt-4" dir="rtl">
      {/* رأس الصفحة */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center gap-2">
          <label className="form-label m-0">اسم المؤشر</label>
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
          <table className="table  table-bordered text-center">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>اسم المحافظة</th>
                <th>اسم المؤشر</th>
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
                  <td>{el.indName}</td>
                  <td>{el.mashoraDesc}</td>
                  <td>
                    {el.indYear} / {el.monthDesc}
                  </td>
                  <td>{el.indValue || '0'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-muted text-center">لا يوجد بيانات</p>
        )}
      </div>
    </div>
  );
}
