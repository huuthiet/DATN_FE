import React from 'react';
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

const LineChart = ({ textY, nameChart, dataEnergy, labelsEnergy }) => {
  const labels = labelsEnergy;

  let dataLine = [];
  if (dataEnergy !== undefined) {
    dataLine = dataEnergy;
  }

  const data = {
    labels,
    datasets: [
      {
        label: nameChart,
        data: dataLine,
        fill: true,
        backgroundColor: 'rgba(75, 192, 192, 0.25)',
        smooth: false,
        borderColor: 'rgb(75, 192, 192)',
        // tension: 0.01,
        borderWidth: 1, // Set border width
        pointRadius: 3,
        // cubicInterpolationMode: 'monotone',
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
    },
  };

  return <Line {...config} />;
};

export default LineChart;
