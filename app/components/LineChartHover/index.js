import React, { useState } from 'react';
import axios from 'axios';
import { urlLink } from '../../helper/route';
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

import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const LineChartHover = ({ textY, nameChart, dataEnergy, labelsEnergy, idMetter }) => {
  //popup
  const [popupData, setPopupData] = useState(null);
  const [titlePopup, setTitlePopup] = useState('');

  const labels = labelsEnergy;

  let dataLine = [];
  if (dataEnergy !== undefined) {
    dataLine = dataEnergy;
  }

  const data = {
    labels,
    // labels: timeArray,
    datasets: [
      {
        label: nameChart,
        // data: [65, 59, 80 - null, null, null, 55, 40],
        data: dataLine,
        fill: true,
        backgroundColor: 'rgba(75, 192, 192, 0.25)',
        smooth: true,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.01,
        borderWidth: 1, // Set border width
        pointRadius: 3,
        cubicInterpolationMode: 'monotone',
      },
    ],
  };
  const config = {
    type: 'line',
    data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          type: 'category',
          beginAtZero: true,
          title: {
            display: true,
            text: 'Time', // Tiêu đề cho trục x
          }
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: textY, // Tiêu đề cho trục y
          },
        },
      },
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
      },
      onClick: async (event, chartElement) => {
        if (chartElement[0]) {
          // console.log('hover chart');
          const pointIndex = chartElement[0].index;
          console.log("pointIndex", pointIndex);
          if (pointIndex !== undefined) {
            const clickedLabel = labels[pointIndex];
            const clickedValue = dataLine[pointIndex];

            //Trong tháng
            if (clickedLabel[clickedLabel.length - 1] !== 'h') {
              // Tháng được chọn
              if (clickedLabel.length > 4) {
                setTitlePopup(clickedLabel);

                const apiGetDay =
                  urlLink.api.serverUrl + urlLink.api.getDataEnergyInDayPerHour + idMetter + '/' + clickedLabel;
                console.log("apiGetDay", apiGetDay);

                try {
                  const response = await axios.get(apiGetDay);

                  setPopupData(response.data.data.kWhData);
                } catch (e) {
                  console.log({ e });
                }
              } else {
                //Tháng hiện tại
                const today = new Date();
                let month = today.getMonth() + 1;
                if (month < 10) {
                  month = '0' + month;
                }
                let day = clickedLabel;
                if (day < 10) {
                  day = '0' + day;
                }
                const year = today.getFullYear();

                const timeQuery = year + '-' + month + '-' + day;
                setTitlePopup(timeQuery);
                const apiGetDay =
                  urlLink.api.serverUrl + urlLink.api.getDataEnergyInDayPerHour + idMetter + '/' + timeQuery;

                try {
                  const response = await axios.get(apiGetDay);

                  setPopupData(response.data.data.kWhData);
                } catch (e) {
                  console.log({ e });
                }
              }
            } else {
              //Trong ngày
            }
          }
        }
      }
    },
  };

  const closePopup = () => {
    setPopupData(null);
  };

  // chart pupop
  const timeArray = [
    '1h',
    '2h',
    '3h',
    '4h',
    '5h',
    '6h',
    '7h',
    '8h',
    '9h',
    '10h',
    '11h',
    '12h',
    '13h',
    '14h',
    '15h',
    '16h',
    '17h',
    '18h',
    '19h',
    '20h',
    '21h',
    '22h',
    '23h',
    '24h',
  ];
  const dataPopup = {
    // labels,
    labels: timeArray,
    datasets: [
      {
        label: `Total kWh at ${titlePopup}`,
        data: popupData,
        label: nameChart,
        fill: true,
        backgroundColor: 'rgba(75, 192, 192, 0.25)',
        smooth: true,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.01,
        borderWidth: 1, // Set border width
        pointRadius: 3,
        cubicInterpolationMode: 'monotone',
      },
    ],
  };
  const configPopup = {
    type: 'line',
    data: dataPopup,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          type: 'category',
          beginAtZero: true,
          title: {
            display: true,
            text: 'Time', // Tiêu đề cho trục x
          }
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: '(kWh)', // Tiêu đề cho trục y
          },
        },
      },
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
      },
    },
  };

  console.log("popupData", popupData);

  const chartStyle = {
    width: '100%',
    height: '100%',
    position: 'absolute',
    background: 'gray',
  };

  return (
    <>
      <Line  {...config} />
      {popupData && (
        <div className="popup-overlay" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.5)', /* Màu xám với độ mờ opacity 0.5 */
          zIndex: 999 /* Đảm bảo overlay hiển thị trên tất cả các phần tử khác */
        }}>
          <div className="popup" style={{
            background: 'white',
            padding: '16px',
            borderRadius: '6px',
            position: 'fixed',
            top: '20%',
            left: '10%',
            right: '10%',
            bottom: '20%',
            boxShadow: '2px 2px 20px 6px rgba(0, 0, 0, 0.05)',
            zIndex: 1000 /* Đảm bảo popup hiển thị trên overlay */
          }}>
            <div className="popup-content" style={{ height: '350px' }}>
              <span className="close" onClick={closePopup}>
                &times;
              </span>
              <Line  {...configPopup} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LineChartHover;
