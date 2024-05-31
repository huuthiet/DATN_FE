import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const LineChartVoltageDashboard = ({ textY, nameChart, dataEnergy, labelsEnergy }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        // Initialize ECharts
        const chartInstance = echarts.init(chartRef.current);

        // Extract data from dataEnergy and labelsEnergy
        const times = labelsEnergy;
        const values = dataEnergy;

        // Find the minimum non-null value in dataEnergy
        const minValue = Math.min(...values.filter(value => value !== null));
        const margin = 10; // Define a margin for the y-axis minimum
        const yAxisMin = minValue - margin;

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
                            result += `${param.seriesName}: ${param.value} V<br/>`;
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
                min: yAxisMin,  // Set the minimum value for y-axis with margin
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
                        color: 'blue', // Set the line color to blue
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
                                    color: '#4E81DE', // Start color
                                },
                                {
                                    offset: 1,
                                    color: '#DCE8FF', // End color
                                },
                            ],
                        },
                    },
                    // Enable hover effect
                    hoverAnimation: true,
                    hoverOffset: 5, // Adjust hover offset if needed
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

export default LineChartVoltageDashboard;
