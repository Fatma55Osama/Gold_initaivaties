import React from 'react'
import styles from './index.module.css'
import { Bar, Doughnut, Line, Pie, Radar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    ArcElement, // Pie & Doughnut
    RadialLinearScale, // Radar
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
export default function Chartscomponent2(props) {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        PointElement,
        LineElement,
        ArcElement,
        RadialLinearScale,
        Title,
        Tooltip,
        Legend
    );

    // const data = {
    //     labels: ['يناير', 'فبراير', 'مارس', 'أبريل'],
    //     datasets: [
    //         {
    //             label: 'المبيعات',
    //             data: [100, 200, 150, 300],
    //             borderColor: 'rgb(75, 192, 192)',
    //             backgroundColor: 'rgba(75, 192, 192, 0.2)',
    //         },
    //     ],
    // };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            // title: { display: true, text: 'الرسم البياني للمؤشرات' },
        },
    };

    const chartMap = {
        line: <Line data={props.data} options={options} />,
        bar: <Bar data={props.data} options={options} />,
        pie: <Pie data={props.data} options={options} />,
        doughnut: <Doughnut data={props.data} options={options} />,
        radar: <Radar data={props.data} options={options} />,
    };
    return (
        <div className='col-7 my-3'>
            {chartMap[props.type] || chartMap.line}
        </div>)


}
