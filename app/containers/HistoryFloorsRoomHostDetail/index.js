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
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import moment from 'moment';
import Modal from 'react-modal';
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
  // const beforeNow = new Date(dateNow.getFullYear(), dateNow.getMonth(), 1); // đầu tháng hiện tại
  const beforeNow = new Date(dateNow.getFullYear(), 0, 1); // đầu năm hiện tại

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

  console.log({MotelRoom});

  const exportFile = async () => {
    const data = MotelRoom;
    const arrData = data.map((obj, index) => {
      return {
        STT: index + 1,
        'Người Thuê': obj.userName,
        'Ngày Thuê': obj.checkInTime,
        'Ngày Hết Hợp Đồng': obj.checkOutTime,
        'Hạn Thanh Toán': obj.lastDay,
        'Giá Phòng': obj.priceMoney,
        'Giá Chưa Thanh Toán': obj.currentPrice,
        'Nội Dung Chưa Thanh Toán': obj.description,
        'Tổng Đã Thanh Toán': obj.sumOrder,
      };
    });
    const wscols = [
      { wch: 10 },
      { wch: 20 },
      { wch: 30 },
      { wch: 20 },
      { wch: 20 },
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
    'Hạn Thanh Toán',
    'Giá Phòng',
    'Giá Chưa Thanh Toán',
    'Nội Dung Chưa Thanh Toán',
    'Tổng Đã Thanh Toán',
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

  const profileTemp = {
    phoneNumber: {
      countryCode: '',
      number: '',
    },
    nationalId: '',
    address: '',
    dob: '',
    email: '',
    gender: '',
    fullName: '',
    frontIdUser: '',
    backIdUser: '',
    avataIdUser: '',
  };
  const [profile, setProfile] = useState(profileTemp);
  const [isOpen, setIsOpen] = useState(false);

  function handleProfile(profile, row) {
    toggleModal();
    // eslint-disable-next-line no-param-reassign
    profile.fullName = row.user.lastName + row.user.firstName;
    // // eslint-disable-next-line no-param-reassign
    // profile.frontIdUser = row.user.frontIdUser;
    // // eslint-disable-next-line no-param-reassign
    // profile.backIdUser = row.user.backIdUser;
    // // eslint-disable-next-line no-param-reassign
    // profile.avataIdUser = row.user.avatar;
    profile.gender = row.user.gender ? row.user.gender : "Khác";
    profile.avataIdUser = row.user.avatar;
    profile.backIdUser = row.user.backId;
    profile.frontIdUser = row.user.frontId;
    setProfile(profile);
  }

  function toggleModal() {
    setIsOpen(!isOpen);
  }

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
      headerName: 'Hạn Thanh Toán',
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
      headerName: 'Tổng Đã Thanh Toán',
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
    },
    {
      field: 'user',
      headerName: 'Thông tin khách hàng',
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
      renderCell: params => (
        // eslint-disable-next-line no-unused-expressions

        <Button
          onClick={() => {
            handleProfile(params.value, params.row);
          }}
          color="primary"
        >
          Chi tiết
        </Button>
      ),
    },
  ];

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '100%',
      height: '100%',
    },
  };

  return (
    <div className="login-page-wrapper">
      <Helmet>
        <title>HistoryFloorsRoomHostDetail</title>
        <meta
          name="description"
          content="Description of HistoryFloorsRoomHostDetail"
        />
      </Helmet>
      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
        style={customStyles}
        ariaHideApp={false}
      >
        <div className="deposit">
          <Row
            className="infor"
            style={{
              paddingTop: '20px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <h4>Thông Tin Cá Nhân</h4>
          </Row>
          <Row
            className="infor"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Col md={6}>
              <List>
                <ListItem>
                  <ListItemText
                    secondary={`SĐT: ${profile.phoneNumber.countryCode} ${profile.phoneNumber.number}`}
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemText secondary={`CMND: ${profile.nationalId}`} />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemText secondary={`Tên: ${profile.fullName}`} />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemText secondary={`Địa chỉ: ${profile.address}`} />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemText secondary={`Email: ${profile.email}`} />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemText secondary={`Giới Tính: ${profile.gender}`} />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem>
                  <ListItemText
                    secondary={`Ngày Sinh: ${moment(profile.dob).format(
                      'DD/MM/YYYY',
                    )}`}
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </List>
            </Col>
            <Col md={6}>
              <h5>Ảnh chân dung </h5>
              {profile.avataIdUser ? (
                <Avatar
                  style={{
                    width: '100%',
                    height: '200px',
                    margin: '10px auto',
                  }}
                  variant="square"
                  alt="Avatar"
                  src={profile.avataIdUser}
                />
              ) : (
                <Avatar
                  style={{
                    width: '100%',
                    height: '200px',
                    margin: '10px auto',
                  }}
                  variant="square"
                  alt="Avatar"
                >
                  N
                </Avatar>
              )}
            </Col>
          </Row>
          <Row className="infor">
            {/* Image */}

            <Col md={6}>
              {profile.frontIdUser ? (
                <Avatar
                  style={{
                    width: '100%',
                    height: '200px',
                    margin: '10px auto',
                  }}
                  variant="square"
                  alt="Avatar"
                  src={profile.frontIdUser}
                />
              ) : (
                <Avatar
                  style={{
                    width: '100%',
                    height: '200px',
                    margin: '10px auto',
                  }}
                  variant="square"
                  alt="Avatar"
                >
                  N
                </Avatar>
              )}
            </Col>
            <Col md={6}>
              {profile.backIdUser ? (
                <Avatar
                  style={{
                    width: '100%',
                    height: '200px',
                    margin: '10px auto',
                  }}
                  variant="square"
                  alt="Avatar"
                  src={profile.backIdUser}
                />
              ) : (
                <Avatar
                  style={{
                    width: '100%',
                    height: '200px',
                    margin: '10px auto',
                  }}
                  variant="square"
                  alt="Avatar"
                >
                  N
                </Avatar>
              )}
            </Col>
          </Row>
        </div>
        <div style={{ textAlign: 'right' }}>
          <Button
            className="btn btn-secondary"
            onClick={toggleModal}
            color="primary"
          >
            Đóng
          </Button>
        </div>
      </Modal>
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
