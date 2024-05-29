/**
 *
 * HostMotelRoom
 *
 */
import { useHistory } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
// import * as XLSX from 'xlsx-color';
import XLSX from 'xlsx-style';
import InputForm from '../../components/InputForm';
import { getListRoom, getHostRevenue } from './actions';
import reducer from './reducer';
import saga from './saga';
import makeSelectHostMotelRoomDetailUser, { makeSelectHostRevenue } from './selectors';

import { urlLink } from '../../helper/route';
import './style.scss';
import { toast } from 'react-toastify';
import LineChart from '../../components/LineChartRevenue';



export function HostMotelRoomDetailUser(props) {
  useInjectReducer({ key: 'hostMotelRoomDetailUser', reducer });
  useInjectSaga({ key: 'hostMotelRoomDetailUser', saga });
  const { listRoom = [] } = props.hostMotelRoomDetailUser;
  console.log('check props: ', props);
  const { hostRevenue } = props.hostMotelRoomDetailUser;
  console.log('hostRevenueData', hostRevenue);
  const { id = '' } = useParams();
  useEffect(() => {
    const data = {
      id,
    };
    props.getListRoom(data);
  }, []);
  console.log('listRoom', listRoom);
  const roomEntries = Object.entries(listRoom);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenMonth, setIsOpenMonth] = useState(false);
  const [yearDropdownOpen, setYearDropdownOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('Chọn tháng');
  const [monthKey, setMonthKey] = useState(0);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedBuilding, setSelectedBuilding] = useState('Chọn tòa nhà');
  const [motelId, setMotelId] = useState('');

  const months = [
    'All Time', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const years = ["All Years"];
  for (let i = 2000; i <= new Date().getFullYear(); i++) {
    years.push(i);
  }

  const handleSelect = (month, index) => {
    console.log('month', month);
    setSelectedMonth(month);
    setMonthKey(index); // Update monthKey with the corresponding number
    console.log('monthKey', monthKey);
    setIsOpen(false);
  };


  const handleSelectBuilding = (value, key) => {
    setMotelId(value);
    setSelectedBuilding(key);
    setIsOpen(false);
  };

  const handleFilter = () => {
    console.log('motelId', motelId);
    // console.log('monthKey', monthKey);
    if (selectedBuilding === 'Chọn tòa nhà') {
      toast.error('Vui lòng chọn tòa nhà và tháng cần xem doanh thu');
      return;
    }

    const data = {
      selectedBuilding: motelId,
      // selectedMonth: monthKey,
      selectedYear: selectedYear,
    };

    props.getHostRevenue(data);

    // Reset the selections
    setSelectedBuilding('Chọn tòa nhà');
    setSelectedMonth('Chọn tháng');
    setMonthKey(0);
  };



  const exportFile = async () => {
    const data = hostRevenue || []; // Sử dụng dữ liệu từ hostRevenueData
    const arrData = data.map((obj, index) => ({
      'STT': index + 1,
      'Thời gian': obj.time,
      'Doanh thu': obj.revenue,
    }));

    // Định dạng cho tiêu đề
    const headerStyle = {
      font: { bold: true },
      alignment: { horizontal: 'center' },
      fill: { fgColor: { rgb: 'FFC000' } } // Màu cam
    };

    // Định dạng cho dữ liệu
    const dataStyle = {
      font: { bold: false },
      alignment: { horizontal: 'left' },
      fill: { fgColor: { rgb: 'FFFFFF' } } // Màu trắng
    };

    const wscols = [
      { wch: 5 }, // Độ rộng của cột STT
      { wch: 15 }, // Độ rộng của cột Thời gian
      { wch: 20 }, // Độ rộng của cột Doanh thu
    ];

    const worksheet = XLSX.utils.json_to_sheet(arrData);
    worksheet['!cols'] = wscols;

    // Thêm hàng tiêu đề
    XLSX.utils.sheet_add_aoa(worksheet, [['Số thứ tự', 'Thời gian', 'Doanh thu']], { origin: 'A1' });

    // Định dạng tiêu đề
    const headerRange = XLSX.utils.decode_range(worksheet['!ref']);
    for (let c = headerRange.s.c; c <= headerRange.e.c; c++) {
      const cell = worksheet[XLSX.utils.encode_cell({ r: headerRange.s.r, c })];
      cell.s = headerStyle;
    }

    // Định dạng dữ liệu
    const dataRange = XLSX.utils.decode_range(worksheet['!ref']);
    for (let R = 1; R <= dataRange.e.r; ++R) {
      for (let C = dataRange.s.c; C <= dataRange.e.c; ++C) {
        const cell = worksheet[XLSX.utils.encode_cell({ r: R, c: C })];
        cell.s = dataStyle;
      }
    }

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // Thêm biểu đồ
    const chart = {
      type: 'bar',
      data: arrData.map(obj => obj['Doanh thu']),
      labels: arrData.map(obj => obj['Thời gian']),
    };
    XLSX.utils.book_append_sheet(workbook, chart, 'Chart1');

    if (arrData.length > 0) {
      XLSX.writeFile(workbook, 'Report.xlsx');
    }
  };






  // const exportFile = async () => {
  //   const data = listRoom;
  //   const arrData = data.map((obj, index) => ({
  //     STT: index + 1,
  //     'Tên Khu Trọ': obj.keyName,
  //     'Tên Phòng': obj.nameRoom,
  //     'Người Thuê Hiện Tại': obj.userName,
  //     'Ngày Thuê': obj.checkInTime,
  //     'Ngày Hết Hợp Đồng': obj.checkOutTime,
  //     'Ngày Thanh Toán': obj.lastDay,
  //     'Giá Phòng': obj.priceMoney,
  //     'Giá Thanh Toán': obj.currentPrice,
  //     'Nội Dung Thanh Toán': obj.description,
  //     'Tổng Thanh Toán': obj.sumOrder,
  //   }));
  //   const wscols = [
  //     { wch: 10 },
  //     { wch: 20 },
  //     { wch: 30 },
  //     { wch: 20 },
  //     { wch: 10 },
  //     { wch: 20 },
  //     { wch: 25 },
  //     { wch: 20 },
  //     { wch: 25 },
  //     { wch: 25 },
  //     { wch: 25 },
  //   ];
  //   const worksheet = XLSX.utils.json_to_sheet(arrData);
  //   worksheet['!cols'] = wscols;
  //   if (arrData.length > 0) {
  //     // eslint-disable-next-line no-plusplus
  //     for (let i = 0; i < listRowExcel.length; i++) {
  //       const element1 = listNameExcel[i];
  //       const element2 = listRowExcel[i];
  //       worksheet[`${element2}1`] = {
  //         v: element1,
  //         s: {
  //           font: {
  //             sz: 12,
  //             color: { rgb: '#FF000000' },
  //             bold: 'true',
  //           },
  //         },
  //         t: 's',
  //       };
  //     }
  //   }
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  //   if (arrData.length > 0) {
  //     XLSX.writeFile(workbook, 'Report.xlsx');
  //   }
  // };
  return (
    <div className="login-page-wrapper">
      <Helmet>
        <title>Quản lý doanh thu</title>
        <meta
          name="description"
          content="Description of HostRevenue"
        />
      </Helmet>
      <div className="title">Quản lý doanh thu</div>
      <div className="job-list-wrapper container-fluid">
        <Row className="action-container">
          <Col md={10}>
            <Row>
              {/* <Col md={6}>
                <DatePicker
                  dateFormat="dd/MM/yyyy"
                  showMonthDropdown
                  showYearDropdown
                  selected={startDate}
                  onChange={date => {
                    setStartDate(date);
                  }}
                  customInput={<InputForm label="Từ" icon="fa fa-calendar" />}
                />
              </Col>
              <Col md={6}>
                <DatePicker
                  dateFormat="dd/MM/yyyy"
                  showMonthDropdown
                  showYearDropdown
                  selected={endDate}
                  onChange={date => {
                    setEndDate(date);
                  }}
                  customInput={<InputForm label="Đến" icon="fa fa-calendar" />}
                />
              </Col> */}
              {/* <Col md={2}>
                <Dropdown isOpen={isOpenMonth} toggle={() => setIsOpenMonth(!isOpenMonth)} className="mt-4 room-dropdown-container">
                  <DropdownToggle caret color="none" className="room-dropdown custom-dropdown-toggle">
                    {selectedMonth}
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-menu">
                    {months.map((month, index) => (
                      <DropdownItem key={index} onClick={() => handleSelect(month, index)} className='dropdown-item'>
                        <span className='dropdown-key'>{month}</span>
                      </DropdownItem>
                    ))}
                  </DropdownMenu>

                </Dropdown>
              </Col> */}
              <Col md={2}>
                <Dropdown isOpen={yearDropdownOpen} toggle={() => setYearDropdownOpen(!yearDropdownOpen)} className="mt-4 room-dropdown-container">
                  <DropdownToggle caret color="none" className="room-dropdown custom-dropdown-toggle">
                    {selectedYear}
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-menu">
                    {years.map((year, index) => (
                      <DropdownItem key={index} onClick={() => setSelectedYear(year, index)} className='dropdown-item'>
                        <span className='dropdown-key'>{year}</span>
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              </Col>
              <Col md={3}>
                <Dropdown
                  isOpen={isOpen}
                  toggle={() => setIsOpen(!isOpen)}
                  className="mt-4 room-dropdown-container"
                >
                  <DropdownToggle
                    caret
                    color="none"
                    className="room-dropdown"
                  >
                    {selectedBuilding}
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-menu">
                    {roomEntries.length > 0 ? roomEntries.map(([key, value]) => (
                      <DropdownItem key={key}
                        value={value}
                        className='dropdown-item'
                        onClick={() => handleSelectBuilding(value, key)}
                      >
                        <span className='dropdown-key'>{key}</span>
                      </DropdownItem>
                    )) : (
                      <DropdownItem>Không có dữ liệu</DropdownItem>
                    )}
                  </DropdownMenu>
                </Dropdown>
              </Col>
              <Col md={5}>
                <Row>
                  <Col md={3}>
                    <Button
                      color="primary"
                      className="btn-block mt-4"
                      onClick={handleFilter}
                    >
                      Tìm
                    </Button>
                  </Col>
                  <Col md={3}>
                    <Button
                      onClick={exportFile}
                      color="success"
                      className="btn-block mt-4"
                    >
                      Xuất
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="dashboard-container">
          <Col xs={12} className="compare-container">
            <LineChart
              textY="Doanh thu"
              nameChart="Doanh thu"
              hostRevenue={hostRevenue}
            />
          </Col>
        </Row>
        <Row className="dashboard-container">
          <Col xs={12} sm={5} className="monthly-chart">
            Monthly chart
          </Col>
          <Col xs={12} sm={6} className="target-actual-chart">
            Target vs Actual Chart
          </Col>
        </Row>
      </div>
    </div>
  );
}

HostMotelRoomDetailUser.propTypes = {
  getListRoom: PropTypes.func,
  getHostRevenue: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  hostMotelRoomDetailUser: makeSelectHostMotelRoomDetailUser(),
  hostRevenueData: makeSelectHostRevenue(),
});


function mapDispatchToProps(dispatch) {
  return {
    getListRoom: id => {
      dispatch(getListRoom(id));
    },
    getHostRevenue: data => {
      dispatch(getHostRevenue(data));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(HostMotelRoomDetailUser);
