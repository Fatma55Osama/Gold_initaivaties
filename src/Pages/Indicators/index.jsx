import React, { useEffect, useMemo, useState } from 'react'
import styles from './index.module.css'
import { usedomain, usevindicator } from '../../Store'
import { getAllData } from '../../Data/Repo/dataRepo'
import MyChartComponent from '../../Component/chartcomponent'
import Chartscomponent2 from '../../Component/Chartscomponent2'
export default function Indicators() {

    const chartTypes = [
        { value: 'line', label: 'Line (خطي)' },
        { value: 'bar', label: 'Bar (أعمدة)' },
        { value: 'pie', label: 'Pie (دائري)' },
        { value: 'doughnut', label: 'Doughnut (دونات)' },
        { value: 'radar', label: 'Radar (رادار)' },
    ];
    const [selectedIndicator, setSelectedIndicator] = useState('');
    const [fromYear, setFromYear] = useState('');
    const [toYear, setToYear] = useState('');
    const [typeService, setTypeService] = useState('');

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
    const [chartType, setChartType] = useState('line');
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


    const chartByGov = useMemo(() => {
        const labels = [...new Set(filtered.map(i => `${i.monthDesc} ${i.indYear}`))];
        const groups = {};
        filtered.forEach(i => {
            const key = `${i.monthDesc} ${i.indYear}`;
            if (!groups[i.govName]) groups[i.govName] = {};
            groups[i.govName][key] = i.indValue;
        });
        const datasets = Object.entries(groups).map(([gov, values]) => ({
            label: gov,
            data: labels.map(l => values[l] || 0),
            borderColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
            backgroundColor: 'rgba(75,192,192,0.2)',
        }));
        return { labels, datasets };
    }, [filtered]);


    // 2. توزيع حسب التاريخ (خط واحد)
    const chartByDate = useMemo(() => {
        return {
            labels: filtered.map(i => `${i.monthDesc} ${i.indYear}`),
            datasets: [{
                label: filtered[0]?.indName || 'عدد الحالات',
                data: filtered.map(i => i.indValue),
                borderColor: 'rgb(75,192,192)',
                backgroundColor: 'rgba(75,192,192,0.2)',
            }],
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
                label: 'أعلى 5 محافظات',
                data: top5.map(i => i[1]),
                borderColor: 'green',
                backgroundColor: 'rgba(0,128,0,0.3)',
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
                label: 'أقل 5 محافظات',
                data: bottom5.map(i => i[1]),
                borderColor: 'red',
                backgroundColor: 'rgba(255,0,0,0.3)',
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
                                    <p>يعرض هذا القسم مجموعة من المؤشرات توضح جهود المبادرة في كافة محافظات الجمهورية. حيث تهدف المبادرة إلى تحسين صحة الأم والطفل وأهمية الرضاعة الطبيعية، توعية الأسرة بضرورة المباعدة بين الولادات، وخفض معدلات الولادات القيصرية، هذا بالإضافة إلى تطوير مهارات الأم للاهتمام بالطفل في مراحل عمره المختلفة. </p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-12'>
                <div className='col-12 container p-4 rounded' style={{ direction: 'rtl' }}>
                    <div className='mb-4 d-flex align-items-center gap-2'>
                        <label className='fs-5 fw-bold'>اسم المؤشر:</label>
                        <select className='form-select w-auto' value={selectedIndicator} onChange={(e) => setSelectedIndicator(e.target.value)}>
                            <option>اختار اسم المؤشر</option>
                            {[...new Set(vindicatorr.map(i => i.indName))].map((name, index) => (
                                <option key={index} value={name}>{name}</option>
                            ))}
                        </select>
                    </div>
                    <div className='mb-4 d-flex align-items-center gap-2'>
                        <label className='fs-5 fw-bold'>نوع الخدمة:</label>
                        <select className='form-select w-auto' value={typeService} onChange={(e) => setTypeService(e.target.value)}>
                            <option>اختار نوع الخدمة</option>
                            {[...new Set(vindicatorr.map(i => i.mashoraDesc))].map((type, index) => (
                                <option key={index} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>
                    <div className='d-flex align-items-center gap-2'>
                        <label className='fs-5 fw-bold'>خلال فترة من:</label>
                        <select className='form-select w-auto' value={fromYear} onChange={(e) => setFromYear(e.target.value)}>
                            <option>سنة</option>
                            {[...new Set(vindicatorr.map(i => i.indYear))].map((year, index) => (
                                <option key={index} value={year}>{year}</option>
                            ))}
                        </select>
                        <span className='fs-5 fw-bold'>إلى</span>
                        <select className='form-select w-auto' value={toYear} onChange={(e) => setToYear(e.target.value)}>
                            <option>سنة</option>
                            {[...new Set(vindicatorr.map(i => i.indYear))].map((year, index) => (
                                <option key={index} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>
                    <div className='d-flex flex-column gap-3 mt-4'>
                        <div >
                            <label className='d-flex gap-2 align-items-center'>
                                <input checked={filters.byGov} onChange={handleCheckboxChange('byGov')} className='form-check w-auto' type="checkbox" name="" id="" />
                                توزيع المؤشرات وفقاً للمحافظات </label>
                        </div>
                        <div>
                            <label className='d-flex gap-2 align-items-center'>                             <input checked={filters.byDate} onChange={handleCheckboxChange('byDate')} className='form-check w-auto' type="checkbox" name="" id="" />
                                توزيع المؤشرات وفقاً تاريخ البيان</label>
                        </div>
                        <div>
                            <label className='d-flex gap-2 align-items-center'> <input checked={filters.top5} onChange={handleCheckboxChange('top5')} className='form- w-auto' type="checkbox" name="" id="" /> اعلي خمس محافظات</label>
                        </div>
                        <div>
                            <label className='d-flex gap-2 align-items-center'> <input checked={filters.bottom5} onChange={handleCheckboxChange('bottom5')} className='form-check w-auto' type="checkbox" name="" id="" /> القسم خمس محافظات                            </label>
                        </div>

                        <div className="mb-3">
                            <div className="mb-3">
                                <label className="fw-bold d-block py-3">نوع الرسم البياني:</label>

                                {/* إنشاء radio لكل نوع */}
                                {chartTypes.map(t => (
                                    <label key={t?.value} className="me-3">
                                        <input
                                            type="radio"
                                            name="chartType"
                                            value={t.value}
                                            checked={chartType === t.value}
                                            onChange={() => setChartType(t.value)}
                                            className="me-1 ms-2"
                                        />
                                        {t.label}
                                    </label>
                                ))}
                            </div>


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
            <div className="container mb-5">
                {filtered.length === 0 ? (
                    <p className="text-center fs-4 text-danger">لا توجد بيانات متاحة بناءً على الاختيارات الحالية.</p>
                ) : (
                    <>
                        {Object.values(filters).every((v) => !v) && (
                            <>
                                <Chartscomponent2 data={chartTop5} type={chartType} />
                                <Chartscomponent2 data={chartBottom5} type={chartType} />
                                <Chartscomponent2 data={chartByGov} type={chartType} />
                                <Chartscomponent2 data={chartByDate} type={chartType} />
                            </>
                        )}

                        {filters.byGov && <Chartscomponent2 data={chartByGov} type={chartType} />}
                        {filters.byDate && <Chartscomponent2 data={chartByDate} type={chartType} />}
                        {filters.top5 && <Chartscomponent2 data={chartTop5} type={chartType} />}
                        {filters.bottom5 && <Chartscomponent2 data={chartBottom5} type={chartType} />}
                    </>
                )}
            </div>


        </div>
    )
}
