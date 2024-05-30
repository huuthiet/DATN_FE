import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const PieChartElectric = ({ nameChart, hostRevenue }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        // Khởi tạo ECharts
        const chartInstance = echarts.init(chartRef.current);

        // Tính tổng doanh thu và tổng tiền điện
        const totalRevenue = hostRevenue.reduce((acc, item) => acc + item.revenue, 0).toFixed(0);
        const totalElectricPrice = hostRevenue.reduce((acc, item) => acc + item.electricPrice, 0).toFixed(0);

        // định dạng tiền
        const formatter = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        });
        const totalRevenueFormat = formatter.format(totalRevenue);
        const totalElectricPriceFormat = formatter.format(totalElectricPrice);

        // Cấu hình biểu đồ
        const option = {
            title: {
                text: nameChart,
                left: 'center',
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)',
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['Tiền điện', 'Doanh thu'],
            },
            series: [
                {
                    name: 'Tỉ lệ',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: [
                        { value: totalElectricPrice, name: 'Tiền điện' },
                        { value: totalRevenue - totalElectricPrice, name: 'Doanh thu' },
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)',
                        },
                    },
                    itemStyle: {
                        normal: {
                            label: {
                                show: true,
                                formatter: '{b}: {c} ({d}%)',
                            },
                            labelLine: { show: true },
                        },
                    },
                },
            ],
        };

        // Sử dụng cấu hình và dữ liệu đã xác định để hiển thị biểu đồ
        chartInstance.setOption(option);

        // Hàm dọn dẹp khi component bị hủy
        return () => {
            chartInstance.dispose();
        };
    }, [hostRevenue, nameChart]);

    return (
        <div
            ref={chartRef}
            style={{
                width: '100%',
                height: '400px',
            }}
        />
    );
}

export default PieChartElectric;
