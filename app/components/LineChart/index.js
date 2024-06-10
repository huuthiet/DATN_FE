import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const LineChart = ({ textY, nameChart, dataEnergy, labelsEnergy }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Initialize ECharts
    const chartInstance = echarts.init(chartRef.current);

    // Extract data from dataEnergy and labelsEnergy
    const times = labelsEnergy;
    const values = dataEnergy;
    console.log('values', values);
    console.log('times', times);

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
        name: 'Time',
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: function (value) {
            return value.toFixed(2);
          },
        },
        name: textY,
      },
      series: [
        {
          name: nameChart,
          type: 'line',
          data: values,
          fill: 'rgba(75, 192, 192, 0.25)',
          lineStyle: {
            color: 'rgb(75, 192, 192)',
            width: 1,
          },
          smooth: false,
          symbol: 'circle',
          symbolSize: 3,
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

  return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />;
};

export default LineChart;
