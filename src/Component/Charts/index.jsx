import React from 'react'
import styles from './index.module.css'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';



export default function Charts() {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

    const data = {
        labels: ['يناير', 'فبراير', 'مارس', 'أبريل'],
        datasets: [
            {
                label: 'المبيعات',
                data: [100, 200, 150, 300],
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'الرسم البياني للمبيعات' },
        },
    };
    return (<div className='col-4'><Line data={data} options={options} />;</div>)


}
