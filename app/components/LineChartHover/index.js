import React, { useState } from 'react';
import axios from 'axios';
import { urlLink } from '../../helper/route';
import { toast } from 'react-toastify';
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

import { Bar, Line } from 'react-chartjs-2';
import moment from 'moment';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const LineChartHover = ({ textY, nameChart, dataEnergy, labelsEnergy, roomId }) => {
  //popup
  const [popupData, setPopupData] = useState(null);
  const [titlePopup, setTitlePopup] = useState('');

  const [totalkWhTime, setTotalkWhTime] = useState(-1);

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
        backgroundColor: 'rgba(75, 192, 192, 1)',
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
    type: 'bar',
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
        console.log("chartElement", chartElement);
        if (chartElement[0]) {
          // console.log('hover chart');
          const pointIndex = chartElement[0].index;
          console.log("pointIndex", pointIndex);
          if (pointIndex !== undefined) {
            const clickedLabel = labels[pointIndex];
            const clickedValue = dataLine[pointIndex];
            console.log("clickedLabel", clickedLabel);
            //Trong tháng
            if (clickedLabel[clickedLabel.length - 1] !== 'h') {

              // Tháng được chọn: đã được lọc qua filter
              if (clickedLabel.length > 4) {
                console.log("XXXXX");
                console.log({ clickedLabel })
                setTitlePopup(clickedLabel);

                const apiGetDay =
                  urlLink.api.serverUrl + urlLink.api.getTotalKWhPerHourInOneDayV2 + roomId + '/' + clickedLabel;
                console.log("apiGetDay", apiGetDay);

                try {
                  const response = await axios.get(apiGetDay);

                  setPopupData(response.data.data.kWhData);
                  setTotalkWhTime(response.data.data.totalkWhTime);
                } catch (e) {
                  console.log(e.response.data.errors[0].errorMessage);
                  toast.error(
                    e.response.data.errors[0].errorMessage,
                    {
                      position: toast.POSITION.TOP_RIGHT,
                      autoClose: 3000,
                      hideProgressBar: false,
                      pauseOnHover: true,
                      draggable: true,
                    },
                  );
                }
              } else {
                console.log("YYYYYY");
                console.log({ clickedLabel });
                //Tháng hiện tại: mặc định chọn 1 tháng ở hiện tại
                const today = moment();
                let yearMonth = today.format("YYYY-MM");
                // if (month < 10) {
                //   month = '0' + month;
                // }
                let day = clickedLabel;
                if (day < 10) {
                  day = '0' + day;
                }

                const timeQuery = yearMonth + '-' + day;
                setTitlePopup(timeQuery);
                const apiGetDay =
                  urlLink.api.serverUrl + urlLink.api.getTotalKWhPerHourInOneDayV2 + roomId + '/' + timeQuery;

                console.log({ apiGetDay });

                try {
                  const response = await axios.get(apiGetDay);

                  setPopupData(response.data.data.kWhData);
                  setTotalkWhTime(response.data.data.totalkWhTime);
                } catch (e) {
                  console.log(e.response.data.errors[0].errorMessage);
                  toast.error(
                    e.response.data.errors[0].errorMessage,
                    {
                      position: toast.POSITION.TOP_RIGHT,
                      autoClose: 3000,
                      hideProgressBar: false,
                      pauseOnHover: true,
                      draggable: true,
                    },
                  );
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
    '0h',
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
  ];
  const dataPopup = {
    // labels,
    labels: timeArray,
    datasets: [
      {
        label: `Total kWh at ${titlePopup}: ${totalkWhTime}`,
        data: popupData,
        // label: nameChart,
        fill: true,
        backgroundColor: 'rgba(75, 192, 192, 1)',
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

  // console.log("popupData", popupData);

  const chartStyle = {
    width: '100%',
    height: '100%',
    position: 'absolute',
    background: 'gray',
  };

  return (
    <>
      <Bar  {...config} />
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
              <Bar  {...configPopup} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LineChartHover;
