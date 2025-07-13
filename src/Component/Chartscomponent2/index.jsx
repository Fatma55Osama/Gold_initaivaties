import React, { useEffect } from 'react';
import Plot from 'react-plotly.js';

export default function Chartscomponent2(props) {
    const labels = props.data.labels;
    const values = props.data.datasets[0]?.data || [];
    const labelText = props.data.datasets[0]?.label || '';
    const customColors = [
        '#724780', '#CBA15F', '#AFE5FF', '#AA99CC', '#FFD6A5',
        '#FF9AA2', '#B5EAD7', '#FFDAC1', '#E2F0CB', '#C7CEEA'
    ];

    const chartMap = {
        bar: (
            <Plot
                data={[{
                    type: 'bar',
                    x: labels,
                    y: values,
                    marker: {
                        color: labels.map((_, i) => customColors[i % customColors.length])
                    }
                }]}
                layout={{
                    title: labelText,
                    width: 500,
                    height: 500,
                    scene: {
                        xaxis: { title: 'الفئات' },
                        yaxis: { title: 'القيم' },
                    }
                }}
                config={{ displayModeBar: false }}
            />
        ),

        pie: (
            <Plot
                data={[{
                    type: 'pie',
                    labels: labels,
                    values: values,
                    marker: {
                        colors: labels.map((_, i) => customColors[i % customColors.length])
                    },
                    hole: 0.3,
                }]}
                layout={{
                    title: labelText,
                    width: 500,
                    height: 500,
                }}
                config={{ displayModeBar: false }}
            />
        ),


        doughnut: (
            <Plot
                data={[{
                    type: 'pie',
                    labels: labels,
                    values: values,
                    hole: 0.5,
                    marker: {
                        colors: labels.map((_, i) => customColors[i % customColors.length])
                    }
                }]}
                layout={{
                    title: labelText,
                    width: 500,
                    height: 500,
                }}
                config={{ displayModeBar: false }}
            />
        ),


        line: (
            <Plot
                data={[{
                    type: 'scatter3d',
                    mode: 'lines+markers',
                    x: labels,
                    y: values,
                    z: values.map((_, i) => i + 1),
                    marker: {
                        size: 5,
                        color: labels.map((_, i) => customColors[i % customColors.length]),
                    },
                    line: {
                        color: '#724780',
                        width: 3,
                    }
                }]}
                layout={{
                    title: labelText,
                    width: 500,
                    height: 500,
                    scene: {
                        xaxis: { title: 'X' },
                        yaxis: { title: 'Y' },
                        zaxis: { title: 'Z' },
                    },
                }}
                config={{ displayModeBar: false }}
            />
        ),

    };

    return (
        <div className={`col-6 my-3`} style={{ height: '500px', width: `${props.width}` }}>
            {chartMap[props.type] || chartMap.bar}
        </div>
    );
}
