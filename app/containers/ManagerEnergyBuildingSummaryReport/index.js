/**
 *
 * ManagerEnergyBuildingsHost
 *
 */

import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

import { Button } from '@material-ui/core';
import Search from '@material-ui/icons/Search';
import { GetApp } from '@material-ui/icons';

import localStore from 'local-storage';
import { useHistory } from 'react-router-dom';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { getMotelList } from './actions';
import reducer from './reducer';
import saga from './saga';
import makeSelectManagerBuildingHost from './selectors';
import './style.scss';
import { urlLink } from '../../helper/route';
import axios, { AxiosResponse } from 'axios';
import { useParams } from 'react-router';
import { set } from 'lodash';

export function ManagerEnergyBuildingsHost(props) {
  useInjectReducer({ key: 'profile', reducer });
  useInjectSaga({ key: 'motelprofileList', saga });

  const { name } = useParams();

  const currentUser = localStore.get('user') || {};
  const { role = [] } = currentUser;
  const history = useHistory();
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] =
    useState('') || new Date().getFullYear();
  const [latestData, setLatestData] = useState([]);
  const [lastMonthData, setLastMonthData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [enableFilter, setEnableFilter] = useState(false);
  const [enableExport, setEnableExport] = useState(false);
  const [lastMonth, setLastMonth] = useState('');
  const [lastYear, setLastYear] = useState('');

  useEffect(() => {
    props.getMotelList();
  }, []);
  const { motelList } = props.profile;

  const date = '';
  let totalElectricCost = 0; // Biến để tích lũy tổng electricCost

  const handleMonthChange = event => {
    const selectedMonth = event.target.value;
    setSelectedMonth(selectedMonth);
    setEnableFilter(true);
    console.log('selectedMonth', selectedMonth);
    // Add additional logic here, such as updating state or making API requests
  };

  const handleYearChange = event => {
    const selectedYear = event.target.value;
    setSelectedYear(selectedYear);
    console.log('selectedYear', selectedYear);
    // Add additional logic here, such as updating state or making API requests
  };

  const handleCallApiGetAllData = async () => {
    // Loading spin
    setLoading(true);
    setEnableExport(true);

    try {
      const current = new Date();
      const currentYear = current.getFullYear();
      const currentMon = current.getMonth();
      console.log('currentYear', currentYear);
      console.log('currentMon', currentMon);

      let lastMonth;
      let lastYear;

      if (
        selectedYear > currentYear ||
        (selectedYear === currentYear && selectedMonth > currentMon)
      ) {
        alert('Thời gian bạn chọn không thể lớn hơn thời gian hiện tại');
        return;
      }

      if (selectedMonth === '1') {
        lastMonth = '12'; // Nếu tháng hiện tại là tháng 1, tháng trước đó là tháng 12
        setLastMonth('12');
        lastYear = (selectedYear - 1).toString(); // Năm trước đó là năm đã chọn - 1
        setLastYear((selectedYear - 1).toString());
      } else {
        lastMonth = (parseInt(selectedMonth) - 1).toString(); // Ngược lại, tháng trước đó là tháng đã chọn - 1
        setLastMonth((parseInt(selectedMonth) - 1).toString());
        lastYear = selectedYear; // Năm trước đó giữ nguyên là năm đã chọn
        setLastYear(selectedYear);
      }

      console.log('lastMonth', lastMonth);
      console.log('lastYear', lastYear);

      const apiLink = `${urlLink.api.serverUrl +
        urlLink.api.getAllData}/${selectedYear}/${selectedMonth}`;
      console.log('apiLink', apiLink);
      const apiLastMonth = `${urlLink.api.serverUrl +
        urlLink.api.getLastRecordsOfPreviousMonth}/${lastYear}/${lastMonth}`;
      console.log('apiLastMonth', apiLastMonth);
      const response = await axios.get(apiLink);
      const responseLastMonth = await axios.get(apiLastMonth);
      const latestData = response.data.dataInMonth;
      const lastMonthData = responseLastMonth.data.dataInPreviousMonth;
      setLatestData(latestData);
      setLastMonthData(lastMonthData);
      setLoading(false);
      console.log('latestData', latestData);
      console.log('lastMonthData', lastMonthData);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle errors as needed
    }
  };

  const handleExportPDF = () => {
    const pdfDoc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
    });

    pdfDoc.setFontSize(12);
    pdfDoc.setFont('times', 'normal');

    // Define table column headers
    const headers = [
      [
        'Room Name',
        'Electricity Last Month (kWh)',
        'Electricity This Month (kWh)',
        'Electricity Consumption (kWh)',
        'Water Last Month',
        'Water This Month',
        'Electricity Price (VND)',
        'Electricity Cost (VND)',
        'Water Cost (VND)',
      ],
    ];

    // Set font for headers
    pdfDoc.setFontSize(13);
    pdfDoc.setFont('times', 'normal'); // Set font to bold for headers
    pdfDoc.setTextColor(0, 0, 0); // Set text color for headers

    // Tạo mảng data ban đầu
    const data = [];

    // Tạo mảng data từ latestData và lastMonthData
    latestData.forEach((latestData, index) => {
      const lastData = lastMonthData[index];
      const electricityDifference = lastData
        ? latestData.Total_kWh - lastData.Total_kWh
        : 0;
      const formattedElectricityDifference = electricityDifference.toFixed(0);
      const electricityCost = electricityDifference * 3900;
      const formattedElectricityCost = new Intl.NumberFormat('vi-VN', {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format(electricityCost);

      totalElectricCost += electricityCost;

      data.push([
        latestData.NameRoom,
        lastData ? lastData.Total_kWh : 'Data not available',
        latestData.Total_kWh,
        formattedElectricityDifference,
        'No data',
        'No data',
        '3.900',
        formattedElectricityCost,
        'No data',
      ]);
    });

    // Tính tổng cộng
    data.push([
      'Total',
      '',
      '',
      '',
      '',
      '',
      '',
      `${new Intl.NumberFormat('vi-VN', {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format(totalElectricCost)} VND`,
      'No data',
    ]);

    // Thêm tiêu đề và thông tin khác vào file PDF
    const title = 'HOMELAND INVOICE';
    pdfDoc.setFontSize(14); // Kích thước font

    pdfDoc.text(`Building: ${name}`, 20, 35);
    pdfDoc.text(`Monthly Report: ${selectedMonth}/${selectedYear}`, 20, 45);

    pdfDoc.setFont('times'); // Font chữ cho tiêu đề
    pdfDoc.setLineWidth(0.3); // Độ đậm của đường kẻ
    pdfDoc.line(10, 25, 290, 25); // Kẻ đường kẻ dưới tiêu đề

    // Tính toán vị trí để căn giữa
    const { pageSize } = pdfDoc.internal;
    const pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
    const textWidth =
      (pdfDoc.getStringUnitWidth(title) * pdfDoc.internal.getFontSize()) /
      pdfDoc.internal.scaleFactor;
    const textOffset = (pageWidth - textWidth) / 2;

    // Thêm tiêu đề vào file PDF
    pdfDoc.setFontSize(16); // Kích thước font cho tiêu đề
    pdfDoc.text(title, textOffset, 20);

    // Tạo bảng
    pdfDoc.autoTable({
      head: headers,
      body: data,
      startY: 50,
      theme: 'grid',
      styles: {
        fontSize: 10,
        cellPadding: 2,
        overflow: 'linebreak',
      },
      columnStyles: {
        0: { cellWidth: 30 },
        1: { cellWidth: 30 },
        2: { cellWidth: 30 },
        3: { cellWidth: 30 },
        4: { cellWidth: 30 },
        5: { cellWidth: 30 },
        6: { cellWidth: 30 },
        7: { cellWidth: 30 },
        8: { cellWidth: 30 },
      },
    });

    // Xuất file PDF
    pdfDoc.save(`Summary_Report_${name}_${selectedMonth}_${selectedYear}.pdf`);
  };

  return (
    <div className="user-profile-wrapper container">
      <Helmet>
        <title>Trang quản lý tiền tòa nhà: </title>
        <meta name="description" content="Description of Profile" />
      </Helmet>
      <div className="title-abc">Quản lý tiền tòa nhà {name}</div>

      {role.length === 2 && role[0] === 'host' ? (
        <div className="card-wrap">
          {loading && <div className="loading-overlay" />}
          <div className="filter-container">
            <select
              className="select-month"
              value={selectedMonth}
              onChange={handleMonthChange}
            >
              <option value="" disabled>
                Select month
              </option>
              <option value="1">Tháng 1</option>
              <option value="2">Tháng 2</option>
              <option value="3">Tháng 3</option>
              <option value="4">Tháng 4</option>
              <option value="5">Tháng 5</option>
              <option value="6">Tháng 6</option>
              <option value="7">Tháng 7</option>
              <option value="8">Tháng 8</option>
              <option value="9">Tháng 9</option>
              <option value="10">Tháng 10</option>
              <option value="11">Tháng 11</option>
              <option value="12">Tháng 12</option>
            </select>
            <select
              className="select-year"
              value={selectedYear}
              onChange={handleYearChange}
            >
              <option value="" disabled>
                Select year
              </option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
            </select>
            <Button
              className="filter-btn"
              onClick={handleCallApiGetAllData}
              disabled={!enableFilter}
            >
              <Search className="filter-icon" />
            </Button>
            <Button
              className="export-btn"
              onClick={handleExportPDF}
              disabled={!enableExport}
            >
              <GetApp className="export-icon" />
            </Button>
          </div>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Phòng</th>
                  <th>
                    Chỉ số điện mới nhất ({selectedMonth}/{selectedYear})
                  </th>
                  <th>
                    Chỉ số điện tháng trước ({lastMonth}/{lastYear})
                  </th>
                  <th>Tổng số điện đã dùng (kWh)</th>
                  <th>Chỉ số nước mới nhất</th>
                  <th>Chỉ số nước tháng trước</th>
                  <th>Giá điện</th>
                  <th>Tiền điện (VND)</th>
                  <th>Tiền nước</th>
                </tr>
              </thead>
              <tbody>
                {latestData.map((latestData, index) => {
                  const lastData = lastMonthData[index];
                  console.log('lastData', lastData);

                  // Calculate the difference in Total_kWh
                  const electricityDifference = lastData
                    ? latestData.Total_kWh - lastData.Total_kWh
                    : 0;
                  const formattedElectricityDifference = electricityDifference.toFixed(
                    0,
                  );

                  // You can add logic for calculating cost based on the difference, assuming you have a cost per kWh
                  const electricityCost = electricityDifference * 3900;
                  const formattedElectricityCost = new Intl.NumberFormat(
                    'vi-VN',
                    {
                      style: 'decimal',
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 2,
                    },
                  ).format(electricityCost);

                  // Cộng giá điện vào tổng
                  totalElectricCost += electricityCost;

                  // total all

                  return (
                    <tr key={index}>
                      <td>{latestData.NameRoom}</td>
                      <td>{latestData.Total_kWh}</td>
                      <td>
                        {lastData ? lastData.Total_kWh : 'Data not available'}
                      </td>
                      <td>{formattedElectricityDifference}</td>

                      <td>chưa có</td>
                      <td>chưa có</td>
                      <td>3.900 (VND)</td>

                      <td>{formattedElectricityCost} (VND)</td>
                      <td>chưa có</td>

                      {/* You can add similar logic for water values */}
                    </tr>
                  );
                })}

                <tr className="total-container">
                  <td colSpan="7">Tổng cộng</td>
                  <td>
                    {new Intl.NumberFormat('vi-VN', {
                      style: 'decimal',
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 2,
                    }).format(totalElectricCost)}{' '}
                    (VND)
                  </td>
                  <td>chưa có</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

ManagerEnergyBuildingsHost.propTypes = {
  dispatch: PropTypes.func,
  getRoomList: PropTypes.func,
  changeStoreData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  profile: makeSelectManagerBuildingHost(),
});

function mapDispatchToProps(dispatch) {
  return {
    getMotelList: () => {
      dispatch(getMotelList());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ManagerEnergyBuildingsHost);
