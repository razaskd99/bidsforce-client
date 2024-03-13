'use client'
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const HeatMapChart = () => {
    const [state] = useState({
        series: [
             {
                name: 'Metric1',
                data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130]
            },
            {
                name: 'Metric2',
                data: [ 20, 30, 40, 50,  70, 80, 90,]
            },
            {
                name: 'Metric3',
                data: [ 10, 60, , 50,  70, 80, 90,]
            },
            {
                name: 'Metric4',
                data: [ 60, ,50,  70, 80, 90,]
            },
            {
                name: 'Metric5',
                data: []
            },
            {
                name: 'Metric6',
                data: []
            }
        ],
        options: {
            chart: {
                height: 350,
                type: 'heatmap',
            },
            stroke: {
                width: 0
            },
            plotOptions: {
                heatmap: {
                    radius: 5,
                    enableShades: false,
                    colorScale: {
                        ranges: [{
                            from: 0,
                            to: 50,
                            color: '#008FFB'
                        },
                        {
                            from: 51,
                            to: 100,
                            color: '#00E396'
                        },
                        ],
                    },
                    shape: 'circle', // Set the shape to circle
                }
            },
            dataLabels: {
                enabled: true,
                style: {
                    colors: ['#fff']
                }
            },
            xaxis: {
                type: 'category',
            },
            title: {
                text: 'Upcoming Deadlines'
            },
        },
    });
    const { series, options } = state;

    return (
        <div>
            <div id="chart">
                <ReactApexChart  options={options} series={series} type="heatmap" height={350} />
            </div>
            <div id="html-dist"></div>
        </div>
    );
}

export default HeatMapChart;
