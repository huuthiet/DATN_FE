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
import { Button, Col, Row } from 'reactstrap';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import * as XLSX from 'xlsx-color';
import InputForm from '../../components/InputForm';
import { getListRoom } from './actions';
import reducer from './reducer';
import saga from './saga';
import makeSelectHostMotelRoomDetailUser from './selectors';
import './style.scss';
export function HostMotelRoomDetailUser(props) {
  useInjectReducer({ key: 'hostMotelRoomDetailUser', reducer });
  useInjectSaga({ key: 'hostMotelRoomDetailUser', saga });
  const { listRoom = [] } = props.hostMotelRoomDetailUser;
  const { id = '' } = useParams();
  const history = useHistory();
  useEffect(() => {
    const data = {
      id,
    };
    props.getListRoom(data);
  }, []);
  const dateNow = new Date();
  const beforeNow = dateNow.setDate(dateNow.getDate() - 1);

  const [startDate, setStartDate] = useState(new Date(beforeNow));
  const [endDate, setEndDate] = useState(new Date());

  const exportFile = async () => {
    const data = listRoom;
    const arrData = data.map((obj, index) => ({
      STT: index + 1,
      'Tên Khu Trọ': obj.keyName,
      'Tên Phòng': obj.nameRoom,
      'Người Thuê Hiện Tại': obj.userName,
      'Ngày Thuê': obj.checkInTime,
      'Ngày Hết Hợp Đồng': obj.checkOutTime,
      'Ngày Thanh Toán': obj.lastDay,
      'Giá Phòng': obj.priceMoney,
      'Giá Thanh Toán': obj.currentPrice,
      'Nội Dung Thanh Toán': obj.description,
      'Tổng Thanh Toán': obj.sumOrder,
    }));
    const wscols = [
      { wch: 10 },
      { wch: 20 },
      { wch: 30 },
      { wch: 20 },
      { wch: 10 },
      { wch: 20 },
      { wch: 25 },
      { wch: 20 },
      { wch: 25 },
      { wch: 25 },
      { wch: 25 },
    ];
    const worksheet = XLSX.utils.json_to_sheet(arrData);
    worksheet['!cols'] = wscols;
    if (arrData.length > 0) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < listRowExcel.length; i++) {
        const element1 = listNameExcel[i];
        const element2 = listRowExcel[i];
        worksheet[`${element2}1`] = {
          v: element1,
          s: {
            font: {
              sz: 12,
              color: { rgb: '#FF000000' },
              bold: 'true',
            },
          },
          t: 's',
        };
      }
    }
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
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
          content="Description of HostMotelRoomDetailUser"
        />
      </Helmet>
      <div className="title">Danh sách chi tiết phòng cho thuê</div>
      <div className="job-list-wrapper container-fluid">
        <Row className="action-container">
          <Col md={4}>
            <Row>
              <Col md={6}>
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
              </Col>
            </Row>
          </Col>
          <Col md={4}>
            <Row>
              <Col md={6}>
                <Button
                  color="primary"
                  className="btn-block mt-4"
                  onClick={() => {
                    const data = {
                      id,
                      startDate,
                      endDate,
                    };
                    props.getListRoom(data);
                  }}
                >
                  Tìm
                </Button>
              </Col>
              <Col md={6}>
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
        <Row className="dashboard-container">
          <Col xs={12} sm={5} className="revenue-container">
            {Object.values(listRoom).map((item, index) => (
              <div key={index}>
                <span>{item.name}</span> <span>{item.totalRevenue}</span>
              </div>
            ))}
          </Col>
          <Col xs={12} sm={6} className="compare-container">
            Comparing Container
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
};

const mapStateToProps = createStructuredSelector({
  hostMotelRoomDetailUser: makeSelectHostMotelRoomDetailUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    getListRoom: id => {
      dispatch(getListRoom(id));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(HostMotelRoomDetailUser);
