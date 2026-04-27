import React from 'react';
import Plot from 'react-plotly.js';
import styles from './index.module.css'

export default function Chartscomponent2(props) {
    const labels = props.data.labels;
    const values = props.data.datasets[0]?.data || [];
    const labelText = props.data.datasets[0]?.label || '';
    const customColors = [
        '#724780', '#CBA15F', '#AFE5FF', '#AA99CC', '#FFD6A5',
        '#FF9AA2', '#B5EAD7', '#FFDAC1', '#E2F0CB', '#C7CEEA'
    ];

    function wrapText(text, maxChars = 90) {
        const words = text.split(' ');
        let lines = [];
        let currentLine = '';

        words.forEach(word => {
            if ((currentLine + word).length < maxChars) {
                currentLine += word + ' ';
            } else {
                lines.push(currentLine.trim());
                currentLine = word + ' ';
            }
        });

        if (currentLine) lines.push(currentLine.trim());

        return lines.join('<br>');
    }

    const commonLayout = {
        title: {
            text: wrapText(`${props.title} - ${props.selectedIndicator}`),
            font: {
                size: 15,
                color: '#333',
                family:"GE SS-Medium"
            },
            x: 0.5,
            xanchor: 'center'
        },
        autosize: true,
        margin: { t: 50, r: 20, l: 40, b: 40 }
    };

    const commonConfig = { displayModeBar: false, responsive: true };
    const commonStyle = { width: "100%", height: "100%" };

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
                    ...commonLayout,
                    xaxis: { title: 'الفئات' },
                    yaxis: { title: 'القيم' }
                }}
                config={commonConfig}
                useResizeHandler={true}
                style={commonStyle}
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
                layout={commonLayout}
                config={commonConfig}
                useResizeHandler={true}
                style={commonStyle}
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
                layout={commonLayout}
                config={commonConfig}
                useResizeHandler={true}
                style={commonStyle}
            />
        ),

        line: (
            <Plot
                data={[{
                    type: 'scatter',
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
                    ...commonLayout,
                    xaxis: { title: 'X' },
                    yaxis: { title: 'Y' },
                    zaxis: { title: 'Z' },
                }}
                config={commonConfig}
                useResizeHandler={true}
                style={commonStyle}
            />
        ),
    };

    return (
        <div className={`col-lg-6 my-3 ${styles.chartimg}`} style={{ width: props.width || "100%" }}>
            {chartMap[props.type] || chartMap.bar}
        </div>
    );
}
