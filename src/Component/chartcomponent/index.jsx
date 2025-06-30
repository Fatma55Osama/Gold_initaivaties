import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
import { usevindicator } from '../../Store';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const MyChartComponent = ({ rawData }) => {
  const { groupBy } = usevindicator();

  const chartData = useMemo(() => {
    if (!Array.isArray(rawData) || rawData.length === 0) return null;

    const months = [...new Set(rawData.map((d) => d.monthDesc))];
    const grouped = {};

    rawData.forEach((item) => {
      const key =
        groupBy === 'gov' ? item.govName
        : groupBy === 'month' ? item.monthDesc
        : item.indName;

      if (!grouped[key]) grouped[key] = {};
      grouped[key][item.monthDesc] = (grouped[key][item.monthDesc] || 0) + (item.value || 0); // عدلي حسب اسم حقل القيمة
    });

    const datasets = Object.entries(grouped).map(([label, values], index) => ({
      label,
      data: months.map((month) => values[month] || 0),
      borderColor: `hsl(${index * 60}, 70%, 50%)`,
      backgroundColor: `hsla(${index * 60}, 70%, 50%, 0.3)`,
      tension: 0.4,
    }));

    return {
      labels: months,
      datasets,
    };
  }, [rawData, groupBy]);

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' },
      title: {
        display: true,
        text: 'الرسم البياني',
      },
    },
  };

  return (
    <div className="col-12">
      {chartData ? (
        <Line data={chartData} options={options} />
      ) : (
        <p className="text-center">لا توجد بيانات متاحة للعرض</p>
      )}
    </div>
  );
};

export default MyChartComponent;
