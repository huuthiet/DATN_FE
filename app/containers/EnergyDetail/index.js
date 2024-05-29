import React, { useState } from 'react';
import dayjs from 'dayjs';

// import {Chart as ChartJS} from 'chart.js/auto';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import _ from 'lodash';

import { Line, Doughnut } from 'react-chartjs-2';

import {
  Grid,
  Box,
  Tabs,
  Tab,
  Paper,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  TabContext,
} from '@material-ui/core';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import './style.scss';
import PaperWrapper from '../../components/PaperWrapper';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

// ref: https://github.com/desoga10/react-chat/blob/master/src/Charts/LineChart.js
// KHI CÓ API DỮ LIỆU THÌ THAM KHẢO LINK NÀY

const EnergyDetail = props => {
  const currentDate = new Date();
  function getDaysInMonthArray() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Tháng bắt đầu từ 0, cộng thêm 1 để đổi về tháng thực tế
    const lastDayOfMonth = new Date(year, month, 0).getDate();
    const daysArray = Array.from(
      { length: lastDayOfMonth },
      (_, index) => index + 1,
    );
    return daysArray;
  }

  const labels = getDaysInMonthArray();

  const dataLine = {
    labels,
    datasets: [
      {
        label: 'Điện (KW)',
        data: [10, 15, 7, 12, 9],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        yAxisID: 'y',
      },
      {
        label: 'Nước (m³)',
        data: [20, 10, 14, 18, 22],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        yAxisID: 'y1',
      },
    ],
  };

  const configLine = {
    type: 'line',
    data: dataLine,
    options: {
      responsive: true,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      stacked: false,
      plugins: {
        title: {
          display: true,
          text: 'Điện - Nước tiêu thụ',
        },
      },
      scales: {
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          title: 'Điện năng (KW)',
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          title: 'Nước (m³)',
          grid: {
            drawOnChartArea: false,
          },
        },
      },
    },
  };

  const configDoughnut = {
    type: 'doughnut',
    data: {
      labels: ['Nước (VNĐ)', 'Điện (VNĐ)'],
      datasets: [
        {
          data: [30, 70],
          backgroundColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: `Tiền Điện - Nước Tháng ${currentDate.getMonth() + 1}`,
        },
      },
    },
  };

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = '1';

  const firstDate = `${year}-${month}-${day}`;

  const [startDate, setStartDate] = useState(
    dayjs('2023-01-07').format('YYYY-MM-DD'),
  );
  const [endDate, setEndDate] = useState(
    dayjs(
      `${currentDate.getFullYear()}-${String(
        currentDate.getMonth() + 1,
      ).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`,
    ).format('YYYY-MM-DD'),
  );

  const handleStartDateChange = event => {
    const newDate = event.target.value;

    setStartDate(newDate);
    // THỰC HIỆN SORT DỮ LIỆU LUÔN VÀ HIỂN THỊ
  };
  const handleEndDateChange = event => {
    const newDate = event.target.value;

    setEndDate(newDate);
    // THỰC HIỆN SORT DỮ LIỆU LUÔN VÀ HIỂN THỊ
  };

  const [value, setValue] = useState(2); // theo 1 tháng
  const handleChange = (event, newValue) => {
    console.log('newValue', newValue);
    setValue(newValue);
  };

  return (
    <div className="container">
      <Helmet>
        <title>Energy</title>
        <meta name="description" content="Description of Energy Detail" />
      </Helmet>
      <div className="title-abc">
        <span className="name-room-detail">Room</span>
      </div>

      <PaperWrapper>
        <Grid item lg={12} container spacing={2}>
          <Grid
            item
            lg={8}
            md={8}
            sm={12}
            xs={12}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div>
              <label htmlFor="startdate">Từ ngày: </label>
              <input
                type="date"
                id="startdate"
                value={startDate}
                onChange={handleStartDateChange}
              />
              <label htmlFor="startdate">Đến ngày: </label>
              <input
                type="date"
                id="startdate"
                value={endDate}
                onChange={handleEndDateChange}
              />
            </div>
          </Grid>

          <Grid item lg={8} md={8} sm={12} xs={12}>
            <div>
              <Box sx={{ bgcolor: 'background.paper', margin: 0 }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  variant="scrollable"
                  scrollButtons="auto"
                  indicatorColor="primary"
                  textColor="primary"
                  label="scrollable auto tabs example"
                >
                  <Tab label="1 Ngày" />
                  <Tab label="1 Tuần" />
                  <Tab label="1 Tháng" />
                  <Tab label="1 Năm" />
                  <Tab label="Tất cả" />
                </Tabs>
              </Box>
            </div>
          </Grid>

          <Grid item lg={8} md={8} sm={12} xs={12}>
            {/* <div style={{height: '800px'}}> */}
            <Line {...configLine} />
            {/* </div> */}
          </Grid>

          <Grid
            item
            lg={4}
            md={4}
            sm={8}
            xs={12}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{}}>
              <Doughnut {...configDoughnut} />
              <div style={{ textAlign: 'center' }}>Tổng cộng: ? VNĐ</div>
            </div>
          </Grid>
        </Grid>
      </PaperWrapper>
    </div>
  );
};

// export default compose(withConnect)(CreateRoom);
export default EnergyDetail;
