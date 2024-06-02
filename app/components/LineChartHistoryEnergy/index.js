import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const LineChartHistoryEnergy = ({ textY, nameChart, hostRevenue }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        // Khởi tạo ECharts
        const chartInstance = echarts.init(chartRef.current);

        // Trích xuất dữ liệu từ hostRevenueData
        const times = hostRevenue.historyLabel;
        const revenues = hostRevenue.historyValue;

        let totalAll = 0;

        totalAll = hostRevenue.historyValue.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        }, 0);

        // Cấu hình biểu đồ
        const option = {
            title: {
                text: nameChart + ": " + totalAll + " (kWh)" ,
                left: 'center',
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                },
                formatter: function (params) {
                    let result = `Thời gian: ${params[0].name}<br/>`;
                    params.forEach(param => {
                        result += `${param.seriesName}: ${parseFloat(param.value).toLocaleString()} KWh<br/>`;
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
                title: {
                    text: 'Thời gian',
                    display: true,
                },
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: function (value) {
                        return value.toLocaleString();
                    },
                },
                title: {
                    text: textY,
                    display: true,
                },
            },
            series: [
                {
                    name: nameChart,
                    type: 'bar',
                    data: revenues,
                    itemStyle: {
                        color: 'rgb(75, 192, 192)',
                    },
                    barWidth: 20,
                },
            ],
        };

        // Sử dụng cấu hình và dữ liệu đã xác định để hiển thị biểu đồ
        chartInstance.setOption(option);

        // Hàm dọn dẹp khi component bị hủy
        return () => {
            chartInstance.dispose();
        };
    }, [hostRevenue, nameChart, textY]);

    return (
        <div
            ref={chartRef}
            style={{ width: '100%', height: '400px' }}
        />
    );
};

export default LineChartHistoryEnergy;
