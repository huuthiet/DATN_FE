import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const LineChartCurrentDashboard = ({ textY, nameChart, dataEnergy, labelsEnergy }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        // Initialize ECharts
        const chartInstance = echarts.init(chartRef.current);

        // Extract data from dataEnergy and labelsEnergy
        const times = labelsEnergy;
        const values = dataEnergy;

        // Chart configuration
        const option = {
            title: {
                text: nameChart,
                left: 'center',
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'line',
                },
                formatter: function (params) {
                    let result = `Thời gian: ${params[0].name}<br/>`;
                    params.forEach(param => {
                        if (param.value !== null) {
                            result += `${param.seriesName}: ${param.value} A<br/>`;
                        } else {
                            result += `${param.seriesName}: N/A<br/>`;
                        }
                    });
                    return result;
                },
            },
            legend: {
                data: [nameChart],
                left: 'right',
            },
            xAxis: {
                type: 'category',
                data: times,
                axisLabel: {
                    formatter: function (value) {
                        return value;
                    },
                },
                name: 'Thời gian',
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: function (value) {
                        return value;
                    },
                },
                name: textY,
            },
            series: [
                {
                    name: nameChart,
                    type: 'line',
                    data: values,
                    itemStyle: {
                        color: 'orange', // Set the line color to orange
                    },
                    lineStyle: {
                        width: 1, // Set the line width
                    },
                    smooth: true, // Make the line smooth
                    connectNulls: true, // Connect the points even if there are null values
                    symbol: 'none', // Remove the data points (dots)
                    areaStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                                {
                                    offset: 0,
                                    color: 'rgba(255, 165, 0, 0.7)', // Start color
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(255, 165, 0, 0)', // End color
                                },
                            ],
                        },
                    },
                },
            ],
        };

        // Apply the configuration and data to display the chart
        chartInstance.setOption(option);

        // Cleanup function when the component is unmounted
        return () => {
            chartInstance.dispose();
        };
    }, [dataEnergy, nameChart, textY, labelsEnergy]);

    return (
        <div
            ref={chartRef}
            style={{ width: '100%', height: '400px' }}
        />
    );
};

export default LineChartCurrentDashboard;
