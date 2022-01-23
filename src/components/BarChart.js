//Component to render bar and line chart
import React from 'react';
import {
    Chart as ChartJS,
    registerables
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
//registering chart tools
ChartJS.register(...registerables);
//options to render chart
const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
            position: 'top',
        },
        title: {
            display: false,
            text: '',
        },
    },
};

//render comp of bar or line chart which requires chartData as the data from props
export function BarChart(props) {
    return <Chart data={props.chartData} options={options} />;
}
