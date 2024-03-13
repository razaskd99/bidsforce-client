'use client'
import React from 'react';
import ReactApexChart from 'react-apexcharts';

const TimelineChart = () => {
    const state = {
        series: [
            {
                data: [
                    {
                        x: 'Initiated',
                        y: [0, 5] 
                    },
                    {
                        x: 'Prel. Review',
                        y: [5, 10]
                    },
                    {
                        x: 'Bid Setup',
                        y: [10, 15]
                    },
                    {
                        x: 'Detail. Review',
                        y: [15, 20]
                    },
                    {
                        x: 'Preparation',
                        y: [20, 25]
                    },
                    {
                        x: 'Final Review',
                        y: [25, 30]
                    },
                    {
                        x: 'Submission',
                        y: [30, 35]
                    },
                    {
                        x: 'Bid Clarif.',
                        y: [35, 40]
                    },
                    {
                        x: 'Bid Rev.',
                        y: [40, 45]
                    },
                    {
                        x: 'Order',
                        y: [45, 50]
                    },
                    {
                        x: 'Closed',
                        y: [50, 55]
                    }
                ]
            }
        ],
        options: {
            chart: {
                height: 350,
                type: 'rangeBar'
            },
            plotOptions: {
                bar: {
                    horizontal: true
                }
            },
            xaxis: {
                categories: [
                    'Initiated', 'Prel. Review', 'Bid Setup', 'Detail. Review',
                    'Preparation', 'Final Review', 'Submission', 'Bid Clarif.',
                    'Bid Rev.', 'Order', 'Closed'
                ]
            },
            yaxis: {
                title: {
                    text: 'Stages'
                }
            }
        }
    };

    return (
        <div>
            <div id="chart" style={{ position: 'relative', height: '350px' }}>
                <ReactApexChart options={state.options} series={state.series} type="rangeBar" height={350} />
            </div>
            <div id="html-dist"></div>
        </div>
    );
};

export default TimelineChart;
