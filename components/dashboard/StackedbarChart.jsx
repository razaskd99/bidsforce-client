'use client'
import React from 'react'
import ReactApexChart from 'react-apexcharts';

const StackedbarChart = () => {

    const state = {

        series: [{
            name: 'Budget',
            data: [10, 5, 10, 15, 20]
        }, {
            name: 'Firm',
            data: [5, 5, 10, 15, 20]
        }],
        options: {
            chart: {
                type: 'bar',
                height: 350,
                stacked: true,
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                    dataLabels: {
                        // enabled:false,
                        total: {
                            enabled: false,
                            offsetX: 0,
                            style: {
                                fontSize: '13px',
                                fontWeight: 900
                            }
                        }
                    }
                },
            },
            stroke: {
                width: 1,
                colors: ['#fff']
            },
            title: {
                text: 'Bid By Team'
            },
            xaxis: {
                categories: ['Team A', 'Team B', 'Team C', 'Team D'],
                labels: {
                    formatter: function (val) {
                        return val;
                    }
                }
            },
            yaxis: {
                title: {
                    text: undefined
                },
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val;
                    }
                }
            },
            fill: {
                opacity: 1,
                colors: ['#9DE2D9', '#FFB068'] // sky blue for Budget, orange for Firm
            },
            legend: {
                position: 'bottom',
                horizontalAlign: 'left',
                offsetX: 40
            }
        }
    };

    return (
        <div>
            <div id="chart">
                <ReactApexChart options={state.options} series={state.series} type="bar" height={350} />
            </div>
            <div id="html-dist"></div>
        </div>
    )
}

export default StackedbarChart
