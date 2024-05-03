/**
 *
 * HistoryFloorsRoomHostDetail
 *
 */
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
import { getGetMotelRoom } from './actions';
import reducer from './reducer';
import saga from './saga';
import makeSelectHistoryFloorsRoomHostDetail from './selectors';
import './style.scss';
// import localStore from 'local-storage';
export function HistoryFloorsRoomHostDetail(props) {
  useInjectReducer({ key: 'historyFloorsRoomHostDetail', reducer });
  useInjectSaga({ key: 'historyFloorsRoomHostDetail', saga });

  const dateNow = new Date();
  // const beforeNow = dateNow.setDate(dateNow.getDate() - 1);
  const beforeNow = new Date(dateNow.getFullYear(), dateNow.getMonth(), 1);

  const [startDate, setStartDate] = useState(new Date(beforeNow));
  const [endDate, setEndDate] = useState(new Date());

  // eslint-disable-next-line react/prop-types
  const { MotelRoom = [] } = props.historyFloorsRoomHostDetail;
  const { id = '' } = useParams();
  const { idroom = '' } = useParams();
  const payload = {
    id,
    idroom,
    startDate,
    endDate,
  };
  // const currentUser = localStore.get('user') || {};
  // const { _id } = currentUser;
  useEffect(() => {
    props.getGetMotelRoom(payload);
  }, []);

  const exportFile = async () => {
    const data = MotelRoom;
    const arrData = data.map((obj, index) => {
      return {
        STT: index + 1,
        'Người Thuê': obj.userName,
        'Ngày Thuê': obj.checkInTime,
        'Ngày Hết Hợp Đồng': obj.checkOutTime,
        'Ngày Thanh Toán': obj.lastDay,
        'Giá Phòng': obj.priceMoney,
        'Giá Chưa Thanh Toán': obj.currentPrice,
        'Nội Dung Chưa Thanh Toán': obj.description,
        'Tổng Thanh Toán': obj.sumOrder,
      };
    });
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
    'Người Thuê',
    'Ngày Thuê',
    'Ngày Hết Hợp Đồng',
    'Ngày Thanh Toán',
    'Giá Phòng',
    'Giá Chưa Thanh Toán',
    'Nội Dung Chưa Thanh Toán',
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
    // 'J',
    // 'K',
    // 'L',
    // 'M',
    // 'N',
    // 'O',
    // 'P',
    // 'Q',
    // 'R',
    // 'S',
    // 'T',
    // 'U',
    // 'V',
    // 'W',
    // 'X',
    // 'Y',
    // 'Z',
    // 'AA',
    // 'AB',
    // 'AC',
    // 'AD',
    // 'AE',
    // 'AF',
    // 'AG',
    // 'AH',
    // 'AI',
    // 'AJ',
    // 'AK',
    // 'AL',
    // 'AM',
    // 'AN',
    // 'AO',
    // 'AP',
  ];

  const columns = [
    { field: 'key', headerName: 'STT', headerAlign: 'center', width: 150 },
    {
      field: 'userName',
      headerName: 'Người Thuê',
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
    },
    {
      field: 'checkInTime',
      headerName: 'Ngày Thuê',
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
    },
    {
      field: 'checkOutTime',
      headerName: 'Ngày Hết Hợp Đồng',
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
    },
    {
      field: 'lastDay',
      headerName: 'Ngày Thanh Toán',
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
    },
    {
      field: 'priceMoney',
      headerName: 'Giá Phòng',
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
    },
    {
      field: 'currentPrice',
      headerName: 'Giá Chưa Thanh Toán',
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
    },
    {
      field: 'description',
      headerName: 'Nội Dung Chưa Thanh Toán',
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
    },
    {
      field: 'sumOrder',
      headerName: 'Tổng Thanh Toán',
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
    },
  ];

  return (
    <div className="login-page-wrapper">
      <Helmet>
        <title>HistoryFloorsRoomHostDetail</title>
        <meta
          name="description"
          content="Description of HistoryFloorsRoomHostDetail"
        />
      </Helmet>
      <div className="title">Danh sách phòng Chi Tiết</div>
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
                // eslint-disable-next-line no-shadow
                const payload = {
                  id,
                  idroom,
                  startDate,
                  endDate,
                };
                props.getGetMotelRoom(payload);
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
            rows={MotelRoom}
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

HistoryFloorsRoomHostDetail.propTypes = {
  getGetMotelRoom: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  historyFloorsRoomHostDetail: makeSelectHistoryFloorsRoomHostDetail(),
});

function mapDispatchToProps(dispatch) {
  return {
    getGetMotelRoom: payload => {
      dispatch(getGetMotelRoom(payload));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(HistoryFloorsRoomHostDetail);
