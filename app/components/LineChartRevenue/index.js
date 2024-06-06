import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const LineChart = ({ textY, nameChart, hostRevenue }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        // Khởi tạo ECharts
        const chartInstance = echarts.init(chartRef.current);

        // Trích xuất dữ liệu từ hostRevenueData
        let revenues = [];
        let electricNumbers = [];
        let waters = [];
        let times = [];
        if (hostRevenue !== undefined) {
            hostRevenue.forEach((item) => {
                revenues.push(item.revenue);
                electricNumbers.push(item.electricPrice);
                waters.push(item.waterPrice);
                times.push(item.time);
            });
        }

        // Cấu hình biểu đồ
        const option = {
            title: {
                text: nameChart,
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
                        result += `${param.seriesName}: ${parseInt(param.value).toLocaleString()} VND<br/>`;
                    });
                    return result;
                },
            },
            legend: {
                data: [nameChart, 'Tiền điện', 'Tiền nước'],
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
                        color: '#91cc75',
                    },
                    barWidth: 20,
                },
                {
                    name: 'Tiền điện',
                    type: 'bar',
                    data: electricNumbers,
                    itemStyle: {
                        color: '#FFD700',
                    },
                    barWidth: 20,
                },
                {
                    name: 'Tiền nước',
                    type: 'bar',
                    data: waters,
                    itemStyle: {
                        color: '#7798BF',
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

export default LineChart;
