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
      startDate,
      endDate,
    };
    props.getListRoom(data);
  }, []);
  const dateNow = new Date();
  const beforeNow = dateNow.setDate(dateNow.getDate() - 1);

  const [startDate, setStartDate] = useState(new Date(beforeNow));
  const [endDate, setEndDate] = useState(new Date());

  const columns = [
    { field: 'key', headerName: 'STT', headerAlign: 'center', width: 150 },
    {
      field: 'keyName',
      headerName: 'Tên Khu Trọ',
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
    },
    {
      field: 'nameRoom',
      headerName: 'Tên Phòng',
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
    },
    {
      field: 'userName',
      headerName: 'Người Thuê Hiện Tại',
      headerAlign: 'center',
      width: 350,
      headerClassName: 'header-bold',
    },
    {
      field: 'checkInTime',
      headerName: 'Ngày Thuê',
      headerAlign: 'center',
      width: 350,
      headerClassName: 'header-bold',
    },
    {
      field: 'checkOutTime',
      headerName: 'Ngày Hết Hợp Đồng',
      headerAlign: 'center',
      width: 350,
      headerClassName: 'header-bold',
    },
    {
      field: 'lastDay',
      headerName: 'Ngày Thanh Toán',
      headerAlign: 'center',
      width: 350,
      headerClassName: 'header-bold',
    },
    {
      field: 'priceMoney',
      headerName: 'Giá Phòng',
      headerAlign: 'center',
      width: 350,
      headerClassName: 'header-bold',
    },
    {
      field: 'currentPrice',
      headerName: 'Giá Thanh Toán',
      headerAlign: 'center',
      width: 350,
      headerClassName: 'header-bold',
    },
    {
      field: 'description',
      headerName: 'Nội Dung Thanh Toán',
      headerAlign: 'center',
      width: 350,
      headerClassName: 'header-bold',
    },
    {
      field: 'sumOrder',
      headerName: 'Tổng Thanh Toán',
      headerAlign: 'center',
      width: 200,
      headerClassName: 'header-bold',
    },
    {
      field: 'bill',
      headerName: 'Xuất Hóa Đơn',
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
      renderCell: params => {
        // eslint-disable-next-line no-unused-expressions
        return (
          <Button
            onClick={() => {
              // eslint-disable-next-line no-underscore-dangle
              history.push(
                `/bill/motel/${params.row.motelRoom._id}/room/${params.row.room._id
                }/user/${params.row.user._id}`,
              );
            }}
            color="primary"
          >
            Hóa Đơn
          </Button>
        );
      },
    },
  ];
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
  const listNameExcel = [
    'STT',
    'Tên Khu Trọ',
    'Tên Phòng',
    'Người Thuê Hiện Tại',
    'Ngày Thuê',
    'Ngày Hết Hợp Đồng',
    'Ngày Thanh Toán',
    'Giá Phòng',
    'Giá Thanh Toán',
    'Nội Dung Thanh Toán',
    'Tổng Thanh Toán',
  ];
  const listRowExcel = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    // 'L',
    // 'M',
    // 'N',
    // 'O',
  ];
  return (
    <div className="login-page-wrapper">
      <Helmet>
        <title>Quản lý doanh thu</title>
        <meta
          name="description"
          content="Description of HostMotelRoomDetailUser"
        />
      </Helmet>
      <div className="title"></div>
      <div className="job-list-wrapper container-fluid">
        <Row>
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
          <Col md={2}>
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
            <Row>
              <Col md={8} />
              <Col md={4}>
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
        <div style={{ width: '100%' }}>
          <DataGrid
            getRowId={row => row.key}
            rows={listRoom}
            columns={columns}
            pageSize={10}
            autoHeight
            isCellEditable={params => params.key}
          />
        </div>
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
