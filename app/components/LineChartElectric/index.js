import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const PieChartElectric = ({ nameChart, hostRevenue }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        // Khởi tạo ECharts
        const chartInstance = echarts.init(chartRef.current);

        // Tính tổng doanh thu, tổng tiền điện và tổng tiền nước
        if (!hostRevenue) {
            return;
        }
        let totalRevenue = 0;
        let totalElectricPrice = 0;
        let totalWaterPrice = 0;

        hostRevenue.forEach((item) => {
            totalRevenue += parseFloat(item.revenue);
            totalElectricPrice += parseFloat(item.electricPrice);
            totalWaterPrice += parseFloat(item.waterPrice);
        });

        // Làm tròn tổng doanh thu, tổng tiền điện và tổng tiền nước
        totalRevenue = Math.round(totalRevenue);
        totalElectricPrice = Math.round(totalElectricPrice);
        totalWaterPrice = Math.round(totalWaterPrice);

        // Định dạng tiền
        const formatter = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        });

        // Định dạng tổng doanh thu, tổng tiền điện và tổng tiền nước
        const formattedTotalRevenue = formatter.format(totalRevenue);
        const formattedTotalElectricPrice = formatter.format(totalElectricPrice);
        const formattedTotalWaterPrice = formatter.format(totalWaterPrice);

        // Cấu hình biểu đồ
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
                data: ['Tiền điện', 'Tiền nước', 'Tiền phòng'],
            },
            series: [
                {
                    name: 'Tỉ lệ',
                    type: 'pie',
                    radius: '55%',
                    center: ['50%', '60%'],
                    data: [
                        { value: totalElectricPrice, name: `Tiền điện:` },
                        { value: totalWaterPrice, name: `Tiền nước:` },
                        { value: totalRevenue, name: `Tiền phòng:` },
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.2)',
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
                        // Sửa màu các thành phần ở đây
                        color: ['#91cc75', '#FFD700', '#7798BF'],
                    },
                    // Cấu hình màu riêng cho từng thành phần
                    data: [
                        {
                            value: totalElectricPrice,
                            name: `Tiền điện:`,
                            // Màu cho thành phần 'Tiền điện'
                            itemStyle: {
                                color: '#FFD700',
                            },
                        },
                        {
                            value: totalWaterPrice,
                            name: `Tiền nước:`,
                            // Màu cho thành phần 'Tiền nước'
                            itemStyle: {
                                color: '#7798BF',
                            },
                        },
                        {
                            value: totalRevenue,
                            name: `Tiền phòng:`,
                            // Màu cho thành phần 'Tiền phòng'
                            itemStyle: {
                                color: '#91cc75',
                            },
                        },
                    ],
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
