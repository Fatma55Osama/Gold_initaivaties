// ChartBar.jsx
import React, { useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ChartBar({ data, onRenderAsImage }) {
    const chartRef = useRef(null);

    const labels = data.map(d => d.govName);
    const values = data.map(d => Number(d.indValue || 0));

    const chartData = {
        labels,
        datasets: [
            {
                label: 'عددهم',
                data: values,
                backgroundColor: '#0d6efd',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { display: false },
            title: { display: false },
        },
    };

    useEffect(() => {
        if (onRenderAsImage && chartRef.current) {
            const canvas = chartRef.current.canvas;
            const imgData = canvas.toDataURL('image/png');
            onRenderAsImage(imgData); // ترجيع الصورة للـ parent
        }
    }, [data]);

    return <Bar ref={chartRef} data={chartData} options={options} />;
}
