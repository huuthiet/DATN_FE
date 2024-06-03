/**
 *
 * HostMotelRoom
 *
 */
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
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
import * as XLSX from 'xlsx-color';
import { getListRoom, getHostRevenue } from './actions';
import reducer from './reducer';
import saga from './saga';
import makeSelectHostMotelRoomDetailUser, { makeSelectHostRevenue } from './selectors';

import './style.scss';
import { toast } from 'react-toastify';
import LineChart from '../../components/LineChartRevenue';
import LineChartElectric from '../../components/LineChartElectric';
import { MonetizationOn, Payment, Power } from '@material-ui/icons';



export function HostMotelRoomDetailUser(props) {
  useInjectReducer({ key: 'hostMotelRoomDetailUser', reducer });
  useInjectSaga({ key: 'hostMotelRoomDetailUser', saga });
  const { listRoom = [] } = props.hostMotelRoomDetailUser;
  console.log('check props: ', props);
  const { hostRevenue } = props.hostMotelRoomDetailUser;
  console.log('hostRevenueData', hostRevenue);
  let totalRevenue = 0;
  let totalElectricPrice = 0;

  if (hostRevenue) {
    totalRevenue = hostRevenue.totalRevenue;
    totalElectricPrice = hostRevenue.totalElectricPrice;
  }

  // Define the formatter
  const vndFormatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
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

  const years = ["Chọn năm"];
  for (let i = 2000; i <= new Date().getFullYear(); i++) {
    years.push(i);
  }

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

  const getCurrentMonthData = (monthlyRevenue) => {
    const currentMonth = new Date().getMonth() + 1; // Lấy tháng hiện tại
    const currentMonthData = monthlyRevenue.find(item => {
      const [month, year] = item.time.split('/'); // Tách tháng và năm từ chuỗi 'time'
      return parseInt(month) === currentMonth; // So sánh với tháng hiện tại
    });
    return currentMonthData || {}; // Trả về dữ liệu của tháng hiện tại hoặc một đối tượng rỗng nếu không có dữ liệu
  };

  // Lấy dữ liệu cho tháng hiện tại
  const currentMonthData = getCurrentMonthData(hostRevenue.monthlyRevenue || []);

  // Lấy giá trị doanh thu, electricNumber và electricPrice của tháng hiện tại
  const currentMonthRevenue = currentMonthData.revenue || 0;
  const currentMonthElectricNumber = currentMonthData.electricNumber || 0;
  const currentMonthElectricPrice = currentMonthData.electricPrice || 0;

  console.log('currentMonthRevenue', currentMonthRevenue);
  console.log('currentMonthElectricNumber', currentMonthElectricNumber);
  console.log('currentMonthElectricPrice', currentMonthElectricPrice);






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
        <Row className="revenueData-container">
          <Col xs={12} sm={4} className="totalRevenue-container">
            <div className="totalRevenue">
              <div className='icon-container'>
                <MonetizationOn />
              </div>
              <div className='revenueText-container'>
                <span className="totalRevenue-text">Tổng doanh thu</span>
                <span className="totalRevenue-number">
                  {totalRevenue ? vndFormatter.format(totalRevenue) : 'Không có dữ liệu'}</span>
              </div>

            </div>
          </Col>
          <Col xs={12} sm={4} className="totalRevenue-container">
            <div className="totalRevenue">
              <div className='icon-container'>
                <Payment />
              </div>
              <div className='revenueText-container'>
                <span className="totalRevenue-text">Doanh thu tháng này</span>
                <span className="totalRevenue-number">
                  {currentMonthRevenue ? vndFormatter.format(currentMonthRevenue) : 'Không có dữ liệu'}</span>
              </div>

            </div>
          </Col>
          <Col xs={12} sm={3} className="totalRevenue-container">
            <div className="totalRevenue">
              <div className='icon-container'>
                <Power />
              </div>
              <div className='revenueText-container'>
                <span className="totalRevenue-text">Tiền điện tháng này</span>
                <span className="totalRevenue-number">
                  {currentMonthElectricPrice ? vndFormatter.format(currentMonthElectricPrice) : 'Không có dữ liệu'}
                </span>
              </div>

            </div>
          </Col>
        </Row>
        <Row className="dashboard-container">
          <Col xs={12} sm={7} className="compare-container">
            <LineChart
              textY="Doanh thu"
              nameChart="Doanh thu"
              hostRevenue={hostRevenue ? hostRevenue.monthlyRevenue : []}
            />
          </Col>
          <Col xs={12} sm={4} className="compare-container">
            <LineChartElectric
              textY="Tỉ lệ doanh thu và tiền điện"
              nameChart="Tỉ lệ doanh thu và tiền điện"
              hostRevenue={hostRevenue ? hostRevenue.monthlyRevenue : []}
            />
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
