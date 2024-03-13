'use client'
import React from 'react'
import ReactApexChart from 'react-apexcharts';

const FullPieChart = () => {
    const state = {

        series: [44, 55, 13, 43],
        options: {
            chart: {
                width: 380,
                type: 'pie',
            },
            labels: ['To Do', 'In Progress', 'Review', 'Completed'],
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }],
            legend:{
                position:'bottom'
            }
        },


    };


    return (
        <div>
            <div id="chart">
                <ReactApexChart options={state.options} series={state.series} type="pie" width={380} />
            </div>
            <div id="html-dist"></div>
        </div>
    )
}

export default FullPieChart