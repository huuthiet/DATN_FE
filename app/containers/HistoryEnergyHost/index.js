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
import * as XLSX from 'xlsx-color';
// import XLSX from 'xlsx-style';
import InputForm from '../../components/InputForm';
import { getHistoryEnergyPerMonth } from './actions';
import reducer from './reducer';
import saga from './saga';
import makeSelectHistoryEnergyUser from './selectors';
import Money from '../App/format';

import { urlLink } from '../../helper/route';
import './style.scss';
import { toast } from 'react-toastify';
import LineChartHistoryEnergy from '../../components/LineChartHistoryEnergy';


export function HistoryEnergyHost(props) {
  useInjectReducer({ key: 'historyEnergy', reducer });
  useInjectSaga({ key: 'historyEnergy', saga });
  const { id = '', name = '' } = useParams();

  console.log({id})

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [yearDropdownOpen, setYearDropdownOpen] = useState(false);
  useEffect(() => {
    const data = {
      id,
      selectedYear,
    };
    props.getHistoryEnergyPerMonth(data);
  }, []);

  const { historyEnergy = {} } = props.historyEnergy;

  console.log({ historyEnergy });


  const years = [ new Date().getFullYear()];
  for (let i = (new Date().getFullYear() - 1); i > 2000; i--) {
    years.push(i);
  }

  // let data = [];
  // if(historyEnergy) {
  //   historyEnergy.historyLabel.forEach((label, index) => {
  //     data.push({label : label, value: historyEnergy.historyValue[index]})
  //   });
  // }

  // console.log({data})


  const handleFilter = () => {
    console.log('motelId', id);
    const data = {
      id,
      selectedYear,
    };

    props.getHistoryEnergyPerMonth(data);
  };


  const exportFile = async () => {
    // const data = hostRevenue || []; // Sử dụng dữ liệu từ hostRevenueData
    // const arrData = data.map((obj, index) => ({
    //   'STT': index + 1,
    //   'Thời gian': obj.time,
    //   'Doanh thu': obj.revenue,
    // }));

    // // Định dạng cho tiêu đề
    // const headerStyle = {
    //   font: { bold: true },
    //   alignment: { horizontal: 'center' },
    //   fill: { fgColor: { rgb: 'FFC000' } } // Màu cam
    // };

    // // Định dạng cho dữ liệu
    // const dataStyle = {
    //   font: { bold: false },
    //   alignment: { horizontal: 'left' },
    //   fill: { fgColor: { rgb: 'FFFFFF' } } // Màu trắng
    // };

    // const wscols = [
    //   { wch: 5 }, // Độ rộng của cột STT
    //   { wch: 15 }, // Độ rộng của cột Thời gian
    //   { wch: 20 }, // Độ rộng của cột Doanh thu
    // ];

    // const worksheet = XLSX.utils.json_to_sheet(arrData);
    // worksheet['!cols'] = wscols;

    // // Thêm hàng tiêu đề
    // XLSX.utils.sheet_add_aoa(worksheet, [['Số thứ tự', 'Thời gian', 'Doanh thu']], { origin: 'A1' });

    // // Định dạng tiêu đề
    // const headerRange = XLSX.utils.decode_range(worksheet['!ref']);
    // for (let c = headerRange.s.c; c <= headerRange.e.c; c++) {
    //   const cell = worksheet[XLSX.utils.encode_cell({ r: headerRange.s.r, c })];
    //   cell.s = headerStyle;
    // }

    // // Định dạng dữ liệu
    // const dataRange = XLSX.utils.decode_range(worksheet['!ref']);
    // for (let R = 1; R <= dataRange.e.r; ++R) {
    //   for (let C = dataRange.s.c; C <= dataRange.e.c; ++C) {
    //     const cell = worksheet[XLSX.utils.encode_cell({ r: R, c: C })];
    //     cell.s = dataStyle;
    //   }
    // }

    // const workbook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // // Thêm biểu đồ
    // const chart = {
    //   type: 'bar',
    //   data: arrData.map(obj => obj['Doanh thu']),
    //   labels: arrData.map(obj => obj['Thời gian']),
    // };
    // XLSX.utils.book_append_sheet(workbook, chart, 'Chart1');

    // if (arrData.length > 0) {
    //   XLSX.writeFile(workbook, 'Report.xlsx');
    // }
  };

  return (
    <div className="login-page-wrapper">
      <Helmet>
        <title>History Energy</title>
        <meta
          name="description"
          content="Description of History Energy"
        />
      </Helmet>
      <div className="title">Lịch sử tiêu thụ điện phòng {name}</div>
      <div className="job-list-wrapper container-fluid">
        <Row className="action-container">
          <Col xs={12}>
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
                  {/* <Col md={3}>
                    <Button
                      onClick={exportFile}
                      color="success"
                      className="btn-block mt-4"
                    >
                      Xuất
                    </Button>
                  </Col> */}
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="dashboard-container">
          <Col xs={12} className="compare-container">
            {Object.keys(historyEnergy).length !== 0 && (
              <LineChartHistoryEnergy
                textY="Số điện (KWh)"
                nameChart="Lịch sử tiêu dụng điện"
                hostRevenue={historyEnergy}
              />
            )}
          </Col>
        </Row>
        <Row className="user-room-container">
          <Col xs={12} className="compare-container">
            <div className="table-responsive">
              {/* <table striped className="user-room-table">
                <thead>
                  <tr>
                    <th>Thời gian</th>
                    <th>Số điện (KWh)</th>
                    <th>Giá (VNĐ)</th>
                  </tr>
                </thead>

                <tbody>
                  {historyEnergy && historyEnergy.historyLabel.map((item, index) => (
                    <tr>
                      <td>{item || 'Chưa có dữ liệu'}</td>
                      <td>{historyEnergy.historyValue[index] || 'Chưa có dữ liệu'}</td>
                      <td>{historyEnergy.historyPrice[index] ? Money(parseInt(historyEnergy.historyPrice[index])) : 'Chưa có dữ liệu'}</td>
                    </tr>
                  ))}
                </tbody>
              </table> */}
            </div>
          </Col>
        </Row>
      </div>
      <br/>
    </div>
  );
}

HistoryEnergyHost.propTypes = {
  getHistoryEnergyPerMonth: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  historyEnergy: makeSelectHistoryEnergyUser(),
});


function mapDispatchToProps(dispatch) {
  return {
    getHistoryEnergyPerMonth: id => {
      dispatch(getHistoryEnergyPerMonth(id));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(HistoryEnergyHost);
