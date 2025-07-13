import React, { useEffect, useMemo, useState } from 'react'
import styles from './index.module.css'
import { usedomain, usevindicator } from '../../Store'
import { getAllData } from '../../Data/Repo/dataRepo'
import Chartscomponent2 from '../../Component/Chartscomponent2'
import { IoIosArrowRoundBack, IoMdArrowDropdown } from 'react-icons/io'
import TablesData from '../../Component/TablesData'
export default function Indicators() {

    const chartTypes = [
        { value: 'bar', label: 'Bar (أعمدة)' },
        { value: 'line', label: 'Line (خطي)' },
        { value: 'pie', label: 'Pie (دائري)' },
        // { value: 'radar', label: 'Radar (رادار)' },
        { value: 'doughnut', label: 'Doughnut (دونات)' },
    ];
    const [selectedIndicator, setSelectedIndicator] = useState('');
    const [fromYear, setFromYear] = useState('');
    const [toYear, setToYear] = useState('');
    const [typeService, setTypeService] = useState('');
    const [selectedMashoraId, setSelectedMashoraId] = useState(null);

    // const [byGov, setByGov] = useState(false);
    // const [byDate, setByDate] = useState(false);
    // const [top5, setTop5] = useState(false);
    // const [bottom5, setBottom5] = useState(false);
    const { vindicatorr, setvindicator, groupBy,
        setGroupBy, } = usevindicator()
    const { domain } = usedomain()
    const [filters, setFilters] = useState({

        byGov: false,
        byDate: false,
        top5: false,
        bottom5: false,
    });
    const [chartType, setChartType] = useState('bar');
    const handeltypeservicechange = (value) => {
        setTypeService(value)
        const match = vindicatorr.find(i => i.mashoraDesc === value)
        setSelectedMashoraId(match ? match.mashoraId : null)
        setSelectedIndicator('');
    }
    useEffect(() => {
        if (typeService && selectedIndicator) {
            setFilters({
                top5: true,
                bottom5: true,
                byGov: true,
                byDate: true,
            });
        }
    }, [typeService, selectedIndicator]);



    const handleCheckboxChange = (name) => (e) => {
        const value = e.target.checked;

        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        getAllData.get_store_vindicator(domain).then((res) => {
            setvindicator(res)
            console.log("get_store_vindicator", res)
        })

    }, [])

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

    // 2. توزيع حسب التاريخ (خط واحد)
    // const chartByDate = useMemo(() => {
    //     return {
    //         labels: filtered.map(i => `${i.monthDesc} ${i.indYear}`),
    //         datasets: [{
    //             label: filtered[0]?.indName || 'عدد الحالات',
    //             data: filtered.map(i => i.indValue),
    //             borderColor: '#AFE5FF',
    //             backgroundColor: '#AFE5FF83',
    //             tension: 0.4,
    //             pointRadius: 5,
    //             pointHoverRadius: 6,
    //         }],
    //     };
    // }, [filtered]);

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


    // 3. أعلى 5 محافظات
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


    return (
        <div>
            <div className='col-12 position-relative ' id={styles.About}>
                <div className='col-12 ' id={styles.AboutLogo}>

                </div>
                <div className='col-12 position-absolute d-flex align-items-end ' id={styles.bgColor}>
                    <div className='container text-end d-flex justify-content-end '>
                        <div className='col-9 d-flex flex-column gap-3 pb-3'>
                            <h2>مؤشرات المبادرة</h2>
                            <div className='col-12  ' id={styles.regtangle}>
                                <div className='container '>
                                    <p className={styles.justifyText}>يعرض هذا القسم مجموعة من المؤشرات توضح جهود المبادرة في كافة محافظات الجمهورية. حيث تهدف المبادرة إلى تحسين صحة الأم والطفل وأهمية الرضاعة الطبيعية، توعية الأسرة بضرورة المباعدة بين الولادات، وخفض معدلات الولادات القيصرية، هذا بالإضافة إلى تطوير مهارات الأم للاهتمام بالطفل في مراحل عمره المختلفة. </p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-12'>
                <div className='col-12 container d-flex flex-column p-4 rounded' style={{ direction: 'rtl' }} id={styles.indecator}>
                    <div className='mb-4 d-flex align-items-center gap-2  ' id={styles.customselect}>
                        <label className='fs-5 fw-bold'>نوع الخدمة:</label>
                        <select className={`px-5 py-1 me-5 rounded ${selectedIndicator === '' ? 'text-secondary' : 'text-dark'}`} value={typeService} onChange={(e) => handeltypeservicechange(e.target.value)}>
                            <option className='text-secondary'>اختار نوع الخدمة</option>
                            {[...new Set(vindicatorr.map(i => i.mashoraDesc))].map((type, index) => (
                                <option key={index} value={type}>{type}</option>
                            ))}
                        </select>
                        <span className={styles.customarrow2}><IoMdArrowDropdown /></span>
                    </div>
                    <div className='mb-4 d-flex align-items-center gap-2  ' id={styles.customselect}>
                        <label className='fs-5 fw-bold'>إسم المؤشر:</label>
                        <select className={`px-5 py-1 me-5 rounded col-6 ${selectedIndicator === '' ? 'text-secondary' : 'text-dark'}`} value={selectedIndicator} onChange={(e) => setSelectedIndicator(e.target.value)}>
                            <option>اختار اسم المؤشر</option>
                            {[...new Set(
                                vindicatorr
                                    .filter(i => selectedMashoraId ? i.mashoraId === selectedMashoraId : false)
                                    .map(i => i.indName)
                            )].map((name, index) => (
                                <option key={index} value={name}>{name}</option>
                            ))}
                        </select>
                        <span className={styles.customarrow2 + ""} ><IoMdArrowDropdown /></span>

                    </div>

                    <div className='d-flex align-items-center gap-2'>

                        <label className='fs-5 fw-bold'>خلال فترة من:</label>

                        {/* من سنة */}
                        <div className={`position-relative`}>
                            <select className={`px-4 py-1 w-auto me-5 rounded ${selectedIndicator === '' ? 'text-secondary' : 'text-dark'}`} value={fromYear} onChange={(e) => setFromYear(e.target.value)}>
                                <option>سنة</option>
                                {[...new Set(vindicatorr.map(i => i.indYear))].map((year, index) => (
                                    <option key={index} value={year}>{year}</option>
                                ))}
                            </select>
                            <span className={styles.customarrow}><IoMdArrowDropdown /></span>
                        </div>

                        <span className='fs-5 fw-bold px-3'>إلى</span>


                        <div className={`position-relative`}>
                            <select className={`px-4 py-1 w-auto rounded ${selectedIndicator === '' ? 'text-secondary' : 'text-dark'}`} value={toYear} onChange={(e) => setToYear(e.target.value)}>
                                <option>سنة</option>
                                {[...new Set(vindicatorr.map(i => i.indYear))].map((year, index) => (
                                    <option key={index} value={year}>{year}</option>
                                ))}
                            </select>
                            <span className={styles.customarrow}><IoMdArrowDropdown /></span>
                        </div>

                    </div>

                    <div className='d-flex flex-column gap-3 mt-4'>
                        {[
                            { name: 'top5', label: 'اعلى خمس محافظات' },
                            { name: 'bottom5', label: 'اقل خمس محافظات' },
                            { name: 'byGov', label: 'توزيع المؤشرات وفقاً لتاريخ البيان' },
                            { name: 'byDate', label: 'توزيع المؤشرات وفقاً تاريخ للمحافظات' }
                        ].map((item, idx) => (
                            <div key={idx}>
                                <label className={`d-flex gap-2 align-items-center ${styles.purpleCheck}`}>
                                    <input
                                        type="checkbox"
                                        checked={filters[item.name]}
                                        onChange={handleCheckboxChange(item.name)}
                                    />
                                    {item.label}
                                </label>
                            </div>
                        ))}
                    </div>
                    <div className="mb-3 mt-5 position-relative d-flex col-12" style={{ maxWidth: '300px' }}>
                        <label className="fw-bold d-block mb-2 col-6 ">نوع الرسم البياني:</label>

                        <div className={`position-relative ${styles.customselect}`}>
                            <select
                                className=" rounded py-1 px-5"
                                value={chartType}
                                onChange={(e) => setChartType(e.target.value)}
                            >
                                <option value="">اختر نوع الرسم البياني</option>
                                {chartTypes.map((type, index) => (
                                    <option key={index} value={type.value}>
                                        {type.label}
                                    </option>
                                ))}
                            </select>

                            <span className={styles.customarrow}>
                                <IoMdArrowDropdown />
                            </span>
                        </div>
                    </div>

                </div>

            </div>
            {/*            
      <div className='col-12 container p-4 rounded' style={{ direction: 'rtl' }}>
        <div className='mb-4 d-flex align-items-center gap-2'>
          <label className='fs-5 fw-bold'>تجميع حسب:</label>
          <select
            className='form-select w-auto'
            value={groupBy}
            onChange={(e) => setGroupBy(e.target.value)}
          >
            <option value="indicator">اسم المؤشر</option>
            <option value="gov">المحافظة</option>
            <option value="month">تاريخ البيان</option>
          </select>
        </div>
      </div> */}

            <div className='container'>
                {/* <MyChartComponent rawData={vindicatorr} /> */}
                {/* <Chartscomponent2 data={chartData} /> */}
            </div>
            <div className="container mb-5 d-flex flex-wrap justify-content-between gap-4 align-items-center">
                {(typeService === '' || selectedIndicator === '') ? (
                    /* الخطوة الأولى: لم يُحدَّد نوع الخدمة أو اسم المؤشر */
                    <div className="col-12 text-center d-flex justify-content-center align-items-center">
                        <p className="text-center fs-4 text-secondary">
                            يرجى اختيار نوع الخدمة واسم المؤشر لعرض الرسومات البيانية.
                        </p>
                    </div>
                ) : filtered.length === 0 ? (
                    /* لا توجد بيانات بعد الفلترة */
                    <div className="col-12 text-center d-flex justify-content-center align-items-center">
                        <p className="text-center fs-4 text-danger">
                            لا توجد بيانات متاحة بناءً على الاختيارات الحالية.
                        </p>
                    </div>
                ) : !Object.values(filters).some(v => v) ? (
                    /* ✅ كل الـ checkboxes غير مفعّلة → لا نعرض شيئًا */
                    <div className="col-12 text-center d-flex justify-content-center align-items-center">
                        <p className="text-center fs-4 text-secondary">
                            قم بتفعيل أحد الفلاتر لعرض الرسم البياني.
                        </p>
                    </div>
                ) : (
                    /* يوجد على الأقل فلتر واحد مفعَّل → نعرض الرسومات المحددة */
                    <>
                        {filters.top5 && <Chartscomponent2 data={chartTop5} type={chartType} />}
                        {filters.top5 && <TablesData name="اسم المحافظة" bgColor="#724780"
                            data={chartTop5.labels.map((label, i) => ({
                                govName: label,
                                indValue: chartTop5.datasets[0].data[i]
                            }))} />
                        }
                        {filters.bottom5 && <Chartscomponent2 data={chartBottom5} type={chartType} />}
                        {filters.bottom5 && <TablesData name="اسم المحافظة"  bgColor="#724780"
                            data={chartBottom5.labels.map((label, i) => ({
                                govName: label,
                                indValue: chartBottom5.datasets[0].data[i]
                            }))} />
                        }
                        {filters.byGov && <Chartscomponent2 data={chartByGov} type={chartType} />}
                        {filters.byGov && <TablesData name="التاريخ " bgColor="#724780"
                            data={chartByGov.labels.map((label, i) => ({
                                govName: label,
                                indValue: chartByGov.datasets[0].data[i]
                            }))} />
                        }
                        {filters.byDate && <Chartscomponent2 data={chartByDate} type={chartType} />}
                        {filters.byDate && <TablesData name="اسم المحافظة " bgColor="#724780"
                            data={chartByDate.labels.map((label, i) => ({
                                govName: label,
                                indValue: chartByDate.datasets[0].data[i]
                            }))} />
                        }
                    </>
                )}
            </div>



        </div>
    )
}
