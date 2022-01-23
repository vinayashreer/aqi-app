//Component to render area chart like pie
import React from 'react';
import {
    Chart as ChartJS,
    RadialLinearScale,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
//config required to render as pie
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);
//options to render chart
const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'right',
        },
        title: {
            display: false,
            text: '',
        },
    },
};
//render comp of bar or line chart which requires chartData as the data from props
export function PieArea(props) {
    return <div style={styles.pieContainer}>
        <Pie
            data={props.chartData} options={options}
        />
    </div>
}


const styles = {
    pieContainer: {
        width: "50%",
        height: "100%",
        alignItems: 'center',
        justifyContent: 'center',
    }
};