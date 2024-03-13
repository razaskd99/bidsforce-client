'use client';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

const PieChart = ({ series, title }) => {
    const [state, setState] = useState({
        options: {
            chart: { type: 'donut' },
            responsive: [{ breakpoint: 480, options: { chart: { width: 200 }, legend: { position: 'bottom' } } }],
            colors: ['#9DE2D9', '#FFB068','#0096B4','#98A9BC'],
            labels: ['Only tracked', 'Delay'],
            legend: {position: 'bottom'}
        },
    });

    return (
        <div>
            <div id="chart">
                <span>{title}</span>
                <ApexCharts options={state.options} series={series} type="donut" />
            </div>
            <div id="html-dist"></div>
        </div>
    );
}

export default PieChart;
