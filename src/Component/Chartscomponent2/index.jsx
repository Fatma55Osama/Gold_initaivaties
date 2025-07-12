import React, { useEffect, useRef } from 'react'
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
        maintainAspectRatio: false,
        layout: {
            padding: {
                top: 20,
                bottom: 20
            }
        },
        plugins: {
            // title: {
            //     display: true,
            //     text: props.data.datasets[0]?.label?.split(' /n ') || '',
            //     align: 'center',
            //     padding: {
            //         top: 10,
            //         bottom: 30,
            //     },
            //     color: '#333',
            //     font: {
            //         size: 18,
            //         weight: 'bold'
            //     }
            // },
            legend: {
                labels: {
                    usePointStyle: true,
                    pointStyle: 'circle',

                    font: {
                        size: 12,
                    },
                    padding: 20
                },
                position: 'top' // أو 'top' أو 'right' حسب ما تحبي
            }
        }
    };
    const chartRef = useRef(null);
    useEffect(() => {
        if (props.onRenderAsImage && chartRef.current) {
            const base64 = chartRef.current.toBase64Image();
            props.onRenderAsImage(base64, props.name || '');
        }
    }, [props.data]);
    const chartMap = {
        line: <Line data={props.data} ref={chartRef} options={options} />,
        bar: <Bar data={props.data} ref={chartRef} options={options} />,
        pie: <Pie data={props.data} ref={chartRef} options={options} />,
        doughnut: <Doughnut data={props.data} ref={chartRef} options={options} />,
        radar: <Radar data={props.data} ref={chartRef} options={options} />,
    };
    return (
        <div className={`col-6 my-3 `} style={{ height: '500px', width: `${props.width}` }}>
            {chartMap[props.type] || chartMap.line}
        </div>)


}
