import React, { useEffect, useMemo, useState } from 'react'
import SectionContainHeader from '../SectionContainHeader'
import { usedomain, usevindicator } from '../../Store';
import { getAllData } from '../../Data/Repo/dataRepo';
import { IoPrint } from 'react-icons/io5';
import ChartBar from '../ChartBar';
import section1 from '../../assets/section1.png'
import styles from './index.module.css'
import Chartscomponent2 from '../Chartscomponent2';
import TablesData from '../TablesData';
import './index.scss'
import { getDomain } from '../../configLoader';
export default function PrintReport() {
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
    const printbutton = () => {
        window.print()
    }
    const [top5Img, setTop5Img] = useState('');
    const [bottom5Img, setBottom5Img] = useState('');
    const [GovImg, setGovImg] = useState('');
    const [dateImg, setDateImg] = useState('');
    const handlePrint = async () => {
        if (filteredData.length === 0) {
            alert('لا يوجد بيانات للطباعة');
            return;
        }

        // if (!chartImg) {
        //     alert('يرجى الانتظار لحين تحميل الجراف');
        //     return;
        // }

        // 🔽 تحميل bootstrap CSS كنص
        const bootstrapCSS = await fetch("https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css").then(res => res.text());

        const printContents = document.getElementById('reportPrint').innerHTML;
        const newWindow = window.open('', '', 'width=800,height=600');

        newWindow.document.write(`
        <html dir="rtl">
            <head>
                <title>تقرير المؤشر</title>
                <style>
                    ${bootstrapCSS}
                </style>
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
                    page-break-inside: avoid;
                  }
                       .no-break {
      page-break-before: avoid !important;
      page-break-after: avoid !important;
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
   img {
  page-break-inside: avoid;
  break-inside: avoid;
  max-width: 100%;
  height: auto;
}

    .report-section {
      page-break-inside: avoid !important;
      break-inside: avoid !important;
    }
      .no-break {
    break-inside: avoid !important;
    page-break-inside: avoid !important;
  }
      .purple-border {
    border: 5px solid #724780;
    border-radius: 10px;
    padding: 20px;
  }

  .stat-card {
    background-color: #724780;
    color: white;
  }

  .section-title {
    text-align: center;
    font-weight: bold;
    font-size: 18px;
  }
    .chatshidden{
      display:none;
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
            }, 700);
        };
    };
    const handleChartImage = (img, name) => {
        if (name === 'top5') setTop5Img(img);
        else if (name === 'bottom5') setBottom5Img(img);
        else if (name === 'Gov') setGovImg(img)
        else if (name === 'date') setDateImg(img)
    };

    const [chartType, setChartType] = useState('bar');

    const [fromYear, setFromYear] = useState('');
    const [toYear, setToYear] = useState('');
    const [typeService, setTypeService] = useState('');

    const [filters, setFilters] = useState({

        byGov: true,
        byDate: true,
        top5: true,
        bottom5: true,
    });
    const filtered = useMemo(() => {
        return vindicatorr.filter(item => {
            const byIndicator = selectedIndicator ? item.indName === selectedIndicator : true;
            const byService = typeService ? item.mashoraDesc === typeService : true;
            const byFrom = fromYear ? item.indYear >= parseInt(fromYear) : true;
            const byTo = toYear ? item.indYear <= parseInt(toYear) : true;
            return byIndicator && byService && byFrom && byTo && item.indValue !== null;
        });
    }, [vindicatorr, selectedIndicator, typeService, fromYear, toYear]);
    const darkenHex = (hex, factor = 0.8) => {
        const bigint = parseInt(hex.slice(1), 16);
        const r = Math.floor(((bigint >> 16) & 255) * factor);
        const g = Math.floor(((bigint >> 8) & 255) * factor);
        const b = Math.floor((bigint & 255) * factor);
        return `rgb(${r}, ${g}, ${b})`;
    };
    const chartTop5 = useMemo(() => {
        const grouped = {};
        filtered.forEach(i => {
            grouped[i.govName] = (grouped[i.govName] || 0) + i.indValue;
        });
        const top5 = Object.entries(grouped)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);
        return {
            labels: top5.map(i => i[0]),
            datasets: [{
                label: `${selectedIndicator} - أعلى 5 محافظات`,
                data: top5.map(i => i[1]),
                borderColor: '#1e7e34',
                backgroundColor: '#28a74533', // شفاف
                borderWidth: 2,
            }],
        };
    }, [filtered]);

    // 4. أقل 5 محافظات
    const chartBottom5 = useMemo(() => {
        const grouped = {};
        filtered.forEach(i => {
            grouped[i.govName] = (grouped[i.govName] || 0) + i.indValue;
        });
        const bottom5 = Object.entries(grouped)
            .sort((a, b) => a[1] - b[1])
            .slice(0, 5);
        return {
            labels: bottom5.map(i => i[0]),
            datasets: [{
                label: `${selectedIndicator} - أقل 5 محافظات`,
                data: bottom5.map(i => i[1]),
                borderColor: '#D72638',
                backgroundColor: '#FF4D4D33',
                borderWidth: 2,
            }],
        };
    }, [filtered]);
    // وفقا للتاريخ اللي فيه المجموع الكلي لعدد الشهور
    const chartByGov = useMemo(() => {
        const grouped = {};

        filtered.forEach(item => {
            const key = `${item.monthDesc} ${item.indYear}`;
            grouped[key] = (grouped[key] || 0) + item.indValue;
        });

        const labels = Object.keys(grouped);
        const data = Object.values(grouped);
        const colorPalette = [
            '#724780', '#CBA15F', '#AFE5FF', '#AA99CC', '#FFD6A5',
            '#FF9AA2', '#B5EAD7', '#FFDAC1', '#E2F0CB', '#C7CEEA'
        ];
        const backgroundColors = colorPalette.map(hex => hex + '70');

        return {
            labels,
            datasets: [{
                label: `${selectedIndicator} - توزيع المؤشرات وفقاً لتاريخ البيان `,
                data,
                backgroundColor: labels.map((_, index) => backgroundColors[index % backgroundColors.length]),
                borderColor: labels.map((_, index) => darkenHex(colorPalette[index % colorPalette.length])),
                tension: 0.4,
                pointRadius: 5,
                pointHoverRadius: 6,
            }],
        };
    }, [filtered]);
    const chartByDate = useMemo(() => {
        const grouped = {};

        // تجميع إجمالي القيم حسب كل محافظة
        filtered.forEach(i => {
            if (!grouped[i.govName]) {
                grouped[i.govName] = 0;
            }
            grouped[i.govName] += i.indValue;
        });

        const labels = Object.keys(grouped); // أسماء المحافظات لمحور X
        const data = Object.values(grouped); // إجمالي القيم

        return {
            labels,
            datasets: [{
                label: `${selectedIndicator} -  توزيع المؤشرات وفقاً تاريخ للمحافظات `,
                data,
                backgroundColor: '#AFE5FF80',
                borderColor: '#AFE5FF',
                borderWidth: 2,
            }],
            // titleLines: [
            //     `${selectedIndicator}`,
            //     'المؤشرات وفقاً لتاريخ المحافظات'
            // ]
        };
    }, [filtered]);
    const handlePrint2 = () => {
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
        <div>
            <div className='d-flex flex-column   '>
                <div className="d-flex align-items-center container col-12  py-4 gap-2  d-print-none" dir='rtl'>
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
                        onClick={printbutton}
                        title="طباعة التقرير"
                    />
                </div>

                <div id="reportPrint" className="no-break">
                    <div className="report-section avoid-break">
                        <div className='col-12 mb-5'>

                            <img className='col-12' width={1440} height={310} src={section1} alt="" />
                        </div>
                        {/* <SectionContainHeader /> */}
                        {selectedIndicator && (
                            <div className='col-12  d-flex justify-content-end align-items-end  mt-4 '>

                                <button className='px-4 stat-card col-2 me-2  py-1 rounded-3'>إجماليات</button>
                            </div>
                        )}

                        {selectedIndicator && (
                            <div className='px-2'>
                                <div className=" page-break col-12 mb-5 " dir="rtl" style={{
                                    border: '5px solid #724780',
                                    padding: '20px',
                                    marginBottom: '30px',
                                    borderRadius: '10px'
                                }} id={styles.bordercontan}>

                                    <div className=''>
                                        {selectedIndicator && (
                                            <span className="text-center">  {selectedIndicator}</span>
                                        )}

                                        {filteredData.length > 0 ? (
                                            <>
                                                <div className='d-flex flex-column'>
                                                    {(selectedIndicator || city) &&
                                                        <>
                                                            <div className='col-12 mt-3 d-flex justify-content-between'>
                                                                <button className='stat-card  px-4 rounded-3 py-1 d-flex flex-column' >عدد المؤشرات <span>{[...new Set(vindicatorr.map(item => item.indName))].length}</span></button>
                                                                <button className='stat-card  px-4 rounded-3 py-1 d-flex flex-column'>عدد المحافظات <span>{[...new Set(vindicatorr.map(item => item.govName))].length}</span></button>
                                                                <button className='stat-card  px-4 rounded-3 py-1 d-flex flex-column'>عدد المشورات <span>{[...new Set(vindicatorr.map(item => item.mashoraDesc))].length}</span></button>
                                                            </div>
                                                            <div className='d-flex flex-wrap justify-content-between mt-4 chatshidden'>
                                                                {filters.top5 && <Chartscomponent2 data={chartTop5} type={chartType} onRenderAsImage={(img) => handleChartImage(img, 'top5')} width="500px" name="top5" />}

                                                                {filters.bottom5 && <Chartscomponent2 data={chartBottom5} type={chartType} onRenderAsImage={(img) => handleChartImage(img, 'bottom5')} width="500px" name="bottom5" />}

                                                            </div>
                                                            {/* <div className="mt-3 d-none flex-wrap d-print-block " style={{
                                                                display: 'flex',
                                                                justifyContent: 'space-between',

                                                            
                                                            }}>
                                                                {top5Img && <img src={top5Img} alt="Top 5" style={{ width: '40%', height: 'auto' }} />}
                                                                {bottom5Img && <img src={bottom5Img} alt="Bottom 5" style={{ width: '40%', height: 'auto' }} />}
                                                            </div> */}

                                                            <div className='d-flex flex-column '>
                                                                <div className='col-12  d-flex justify-content-start align-items-end  mt-4 '>

                                                                    <button className='px-4 stat-card   col-4  py-1 rounded-3'>عن المبادرة</button>
                                                                </div>
                                                                <div style={{
                                                                    border: '5px solid #724780',
                                                                    padding: '20px',
                                                                    marginBottom: '30px',
                                                                    borderRadius: '10px',
                                                                    fontSize: '16px',
                                                                    textAlign: "justify",
                                                                    color: "rgba(0, 0, 0, 0.5)",
                                                                    fontWeight: "500"
                                                                }}>
                                                                    مبادرة "الألف يوم الذهبية لتنمية الأسرة المصرية" هي إحدى المبادرات الهامة لبناء الإنسان المصري حيث تهدف إلى الاهتمام بتحسين الخصائص السكانية لأفراد الأسرة المصرية وتنمية الطفولة المبكرة وخاصة في فترة الألف يوم الذهبية الأولي من العمر نظرا لأهميتها القصوى. وهي واحدة من مبادرات المبادرة الرئاسية "100 مليون صحة". وقد أطلق المبادرة معالي الأستاذ الدكتور/ خالد عبد الغفار –وزير الصحة والسكان- في احتفالية بالعاصمة الإدارية الجديدة يوم 22 أغسطس 2023.
                                                                </div>
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
                                <div className=" page-break col-12 mb-5 page-break-start " dir="rtl" style={{
                                    border: '5px solid #724780',
                                    padding: '20px',
                                    marginBottom: '30px',
                                    borderRadius: '10px'
                                }} id={styles.bordercontan}>
                                    {/* <div className='d-flex flex-column'>
                                        <h5>توزيع المؤشرات وفقاً لتاريخ البيان</h5>
                                        <div className='d-flex justify-content-between align-items-center'>
                                            {filters.byGov && <TablesData name="التاريخ " bgColor="#724780"  width="50%"
                                                data={chartByGov.labels.map((label, i) => ({
                                                    govName: label,
                                                    indValue: chartByGov.datasets[0].data[i]
                                                }))} />
                                            }
                                            {filters.byGov && <Chartscomponent2 data={chartByGov} type={chartType} onRenderAsImage={(img) => handleChartImage(img, 'Gov')} width="500px" name="Gov" />}

                                        </div>
                                    </div> */}

                                    <div className='mt-3' >
                                        <h5 className='mt-4'>توزيع المؤشرات وفقاً لتاريخ البيان </h5>
                                        <div className='d-flex flex-wrap justify-content-between align-items-center'>
                                            {filters.byGov && <TablesData name="التاريخ " bgColor="#724780" width="50%"
                                                data={chartByGov.labels.map((label, i) => ({
                                                    govName: label,
                                                    indValue: chartByGov.datasets[0].data[i]
                                                }))} />
                                            }
                                            {filters.byGov && <Chartscomponent2 data={chartByGov} type={chartType} onRenderAsImage={(img) => handleChartImage(img, 'Gov')} width="500px" name="Gov" />}

                                        </div>
                                    </div>

                                    <div className='mt-3' style={{ borderTop: '5px solid #724780' }}>
                                        <h5 className='mt-4'>توزيع المؤشرات وفقاً للمحافظات </h5>
                                        <div className='d-flex flex-wrap justify-content-between align-items-center'>
                                            {filters.byDate && <TablesData name="اسم المحافظة " bgColor="#7CC7EB" width="50%"
                                                data={chartByDate.labels.map((label, i) => ({
                                                    govName: label,
                                                    indValue: chartByDate.datasets[0].data[i]
                                                }))} />
                                            }
                                            {filters.byDate && <Chartscomponent2 data={chartByDate} type={chartType} onRenderAsImage={(img) => handleChartImage(img, 'date')} width="500px" name="date" />}

                                        </div>
                                    </div>
                                    {/* <div className="mt-3 d-none flex-wrap d-print-block " style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',

                                       
                                    }}>
                                        {GovImg && <img src={GovImg} alt="Top 5" style={{ width: '40%', height: 'auto' }} />}
                                        {dateImg && <img src={dateImg} alt="Bottom 5" style={{ width: '40%', height: 'auto' }} />}
                                    </div>
                                     */}
                                </div>
                            </div>

                        )}

                    </div>

                </div>

            </div>

        </div>
    )
}
