import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import _ from 'lodash';

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
import axios from 'axios';
import { useParams } from 'react-router';

export function ManagerEnergyBuildingsHost(props) {
  useInjectReducer({ key: 'profile', reducer });
  useInjectSaga({ key: 'motelprofileList', saga });

  const { id, name } = useParams();
  const currentUser = localStore.get('user') || {};
  const { role = [] } = currentUser;
  const history = useHistory();
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('') || new Date().getFullYear();
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

  const handleMonthChange = event => {
    const selectedMonth = event.target.value;
    setSelectedMonth(selectedMonth);
    setEnableFilter(true);
  };

  const handleYearChange = event => {
    const selectedYear = event.target.value;
    setSelectedYear(selectedYear);
  };

  const handleCallApiGetAllData = async () => {
    setLoading(true);
    setEnableExport(true);

    try {
      const current = new Date();
      const currentYear = current.getFullYear();
      const currentMon = current.getMonth();

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
        lastMonth = '12';
        setLastMonth('12');
        lastYear = (selectedYear - 1).toString();
        setLastYear((selectedYear - 1).toString());
      } else {
        lastMonth = (parseInt(selectedMonth) - 1).toString();
        setLastMonth((parseInt(selectedMonth) - 1).toString());
        lastYear = selectedYear;
        setLastYear(selectedYear);
      }

      const apiLink = `${urlLink.api.serverUrl}${urlLink.api.getAllData}${selectedYear}/${selectedMonth}/${id}`;

      const response = await axios.get(apiLink);
      console.log('response', response.data.data)
      const latestData = response.data.data;
      setLatestData(latestData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
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
        'Note',
      ],
    ];

    pdfDoc.setFontSize(13);
    pdfDoc.setFont('times', 'normal');
    pdfDoc.setTextColor(0, 0, 0);

    const data = [];
    let totalElectricityCost = 0;

    latestData.forEach((latestData, index) => {
      const lastData = latestData.latestDataBeforeMonth;
      const electricityDifference = latestData
        // ? (latestData.latestDataCurrentMonth - latestData.latestDataBeforeMonth)
        ? (latestData.totalKwhCurrentMonth)
        : 0;
      const electricityDifferenceFormat = electricityDifference.toFixed(2);
      const electricityCost = electricityDifferenceFormat * 3900;
      const electricityCostFormat = electricityCost.toLocaleString('vi-VN') + ' VND';

      totalElectricityCost += electricityCost;

      data.push([
        latestData.name,
        latestData ? latestData.latestDataBeforeMonth : 'Data not available',
        latestData.latestDataCurrentMonth,
        electricityDifferenceFormat,
        'No data',
        'No data',
        '3,900 VND',
        electricityCostFormat,
        'No data',
        (latestData.numberOfMeter) > 1 ? `Changed ${latestData.numberOfMeter} meters` : '',
      ]);
    });

    const totalElectricityCostFormat = totalElectricityCost.toLocaleString('vi-VN') + ' VND';

    data.push([
      'Total',
      '',
      '',
      '',
      '',
      '',
      '',
      totalElectricityCostFormat,
      'No data',
    ]);

    const title = 'HOMELAND INVOICE';
    pdfDoc.setFontSize(14);

    pdfDoc.text(`Building: ${name}`, 20, 35);
    pdfDoc.text(`Monthly Report: ${selectedMonth}/${selectedYear}`, 20, 45);

    pdfDoc.setFont('times');
    pdfDoc.setLineWidth(0.3);
    pdfDoc.line(10, 25, 290, 25);

    const { pageSize } = pdfDoc.internal;
    const pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
    const textWidth =
      (pdfDoc.getStringUnitWidth(title) * pdfDoc.internal.getFontSize()) /
      pdfDoc.internal.scaleFactor;
    const textOffset = (pageWidth - textWidth) / 2;

    pdfDoc.setFontSize(16);
    pdfDoc.text(title, textOffset, 20);

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
        1: { cellWidth: 25 },
        2: { cellWidth: 25 },
        3: { cellWidth: 25 },
        4: { cellWidth: 25 },
        5: { cellWidth: 25 },
        6: { cellWidth: 30 },
        7: { cellWidth: 30 },
        8: { cellWidth: 30 },
        9: { cellWidth: 25 },
      },
    });

    pdfDoc.save(`Summary_Report_${name}_${selectedMonth}_${selectedYear}.pdf`);
  };


  return (
    <div className="user-profile-wrapper container">
      <Helmet>
        <title>Trang quản lý tiền tòa nhà: {name}</title>
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
              {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                <option key={month} value={month}>
                  Tháng {month}
                </option>
              ))}
            </select>
            <select
              className="select-year"
              value={selectedYear}
              onChange={handleYearChange}
            >
              <option value="" disabled>
                Select year
              </option>
              {Array.from({ length: 3 }, (_, i) => new Date().getFullYear() + i).map(year => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
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
                    Chỉ số điện tháng trước ({lastMonth}/{lastYear})
                  </th>
                  <th>
                    Chỉ số điện mới nhất ({selectedMonth}/{selectedYear})
                  </th>
                  <th>Tổng số điện đã dùng (kWh)</th>
                  <th>Chỉ số nước tháng trước</th>
                  <th>Chỉ số nước mới nhất</th>
                  <th>Giá điện (VND)</th>
                  <th>Tiền điện (VND)</th>
                  <th>Tiền nước (VND)</th>
                  <th>Ghi chú</th>
                </tr>
              </thead>
              <tbody>
                {latestData.map((latestData, index) => {
                  {/* console.log('latestData', latestData.latestDataBeforeMonth); */}
                  {/* const electricityCost = (latestData.latestDataCurrentMonth - latestData.latestDataBeforeMonth) * 3900; */}
                  const electricityCost = (latestData.totalKwhCurrentMonth) * 3900;

                  return (
                    <tr key={index}>
                      <td>{latestData.name}</td>
                      <td>{latestData.latestDataBeforeMonth ? latestData.latestDataBeforeMonth : 'Data not available'}</td>
                      <td>{latestData.latestDataCurrentMonth}</td>
                      {/* <td>{latestData.latestDataCurrentMonth - latestData.latestDataBeforeMonth}</td> */}
                      <td>{latestData.totalKwhCurrentMonth}</td>
                      <td>No data</td>
                      <td>No data</td>
                      <td>3.900 (VND)</td>
                      <td>{electricityCost.toLocaleString('vi-VN')} (VND)</td>
                      <td>No data</td>
                      <td>{latestData.numberOfMeter > 1 ? `Đã thay ${latestData.numberOfMeter} đồng hồ` : ''}</td>
                    </tr>
                  );
                })}
                <tr className="total-container">
                  <td colSpan="7">Tổng cộng</td>
                  {/* <td>{_.sumBy(latestData, data => (data.latestDataCurrentMonth - data.latestDataBeforeMonth) * 3900).toLocaleString('vi-VN')} (VND)</td> */}
                  <td>{_.sumBy(latestData, data => (data.totalKwhCurrentMonth) * 3900).toLocaleString('vi-VN')} (VND)</td>
                  <td>No data</td>
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
