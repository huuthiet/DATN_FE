/**
 *
 * RoomManage
 *
 */
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import _ from 'lodash';

import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
// import localStore from 'local-storage';
import moment from 'moment';
import Modal from 'react-modal';
import { useHistory } from 'react-router-dom';
import { Button, Col, Row } from 'reactstrap';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import SuccessPopup from '../../components/SuccessPopup';
import WarningPopup from '../../components/WarningPopup';
import { changeStoreData, getListRoom } from './actions';
import reducer from './reducer';
import saga from './saga';
import makeSelectRoomManage from './selectors';
import Money from '../App/format';
import './styles.scss';

export function RoomManage(props) {
  useInjectReducer({ key: 'roomManage', reducer });
  useInjectSaga({ key: 'roomManage', saga });
  // const currentUser = localStore.get('user') || {};
  const history = useHistory();
  useEffect(() => {
    props.getListRoom();
  }, []);
  const { showSuccessPopup, showWarningPopup, job } = props.roomManage;
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

  // const today = new Date();
  // const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  const [isOpen, setIsOpen] = useState(false);
  const [OrderArr, setOrderArr] = useState([]);

  function toggleModal() {
    setIsOpen(!isOpen);
  }
  function handleProfile(profile, row) {
    toggleModal();
    // eslint-disable-next-line no-param-reassign
    profile.fullName = row.fullName;
    // eslint-disable-next-line no-param-reassign
    profile.frontIdUser = row.frontIdUser;
    // eslint-disable-next-line no-param-reassign
    profile.backIdUser = row.backIdUser;
    // eslint-disable-next-line no-param-reassign
    profile.avataIdUser = row.user.avatar;
    setProfile(profile);
  }

  const [isOpenHis, setIsOpenHis] = useState(false);

  const methodStatus = e => {
    if (e === 'monthlyPaymentCompleted') {
      return 'Đã Thanh Toán';
    }
    if (e === 'pendingMonthlyPayment') {
      return 'Chờ Thanh Toán Tiền Tháng';
    }
    if (e === 'afterCheckInCostPaymentCompleted') {
      return 'Chưa Thanh Toán';
    }
    if (e === 'pendingActivated') {
      return 'Đã Đặt Cọc';
    }
    return 'Chưa thanh toán';
  };
  const typePay = e => {
    if (e === 'deposit') {
      return 'Tiền đặt cọc';
    }
    if (e === 'afterCheckInCost') {
      return 'Tiền khi nhận phòng';
    }
    if (e === 'monthly') return 'Tiền hàng tháng';
    return 'Nạp tiền vào ví';
  };

  function toggleModalHis() {
    setIsOpenHis(!isOpenHis);
  }
  function handleHis(value, roomId) {
    if (_.isArray(value)) {
      // eslint-disable-next-line no-plusplus
      for (let index = 0; index < value.length; index++) {
        const element = value[index];
        element.key = index + 1;
        element.amount = Money(element.amount);
        element.roomId = roomId;
        // element.paymentMethod = methodPay(element.paymentMethod);
        // element.type = typePay(element.type);
        // element.description = element.description;
      }
    }
    toggleModalHis();
    setOrderArr(value);
  }

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

  const columns = [
    { field: 'key', headerName: 'STT', headerAlign: 'center', width: 150 },
    {
      field: 'fullName',
      headerName: 'Tên khách hàng',
      headerAlign: 'center',
      width: 300,
      headerClassName: 'header-bold',
    },
    {
      field: 'price',
      headerName: 'Giá phòng',
      headerAlign: 'center',
      width: 300,
      headerClassName: 'header-bold',
      renderCell: params => <p>{Money(params.value)}</p>,
    },
    // {
    //   field: 'checkInOutTime',
    //   headerName: 'Số ngày trễ chưa thanh toán',
    //   headerAlign: 'center',
    //   width: 500,
    //   headerClassName: 'header-bold',
    // },
    {
      field: 'status',
      headerName: 'Trạng thái phòng',
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
      renderCell: params => <p>{methodStatus(params.value)}</p>,
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
    {
      field: 'orders',
      headerName: 'Lịch sử đặt phòng',
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
      renderCell: params => (
        // eslint-disable-next-line no-unused-expressions
        <Button
          onClick={() => {
            // eslint-disable-next-line no-underscore-dangle
            handleHis(params.value, params.row.room._id);
          }}
          color="primary"
        >
          Chi tiết
        </Button>
      ),
    },
    {
      field: 'bill',
      headerName: 'Xuất hóa đơn',
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
      renderCell: params => (
        // eslint-disable-next-line no-unused-expressions
        <Button
          onClick={() => {
            // eslint-disable-next-line no-underscore-dangle
            history.push(
              `/bill/motel/${params.row.idMotel}/room/${params.row.room._id
              }/user/${params.row.ownerAndUser.userId}`,
            );
          }}
          color="primary"
        >
          Hóa Đơn
        </Button>
      ),
    },
    {
      field: 'roomKey',
      headerName: 'Tên Phòng',
      headerAlign: 'center',
      width: 200,
      headerClassName: 'header-bold',
    },
    {
      field: 'checkInTime',
      headerName: 'Ngày thuê',
      headerAlign: 'center',
      width: 200,
      headerClassName: 'header-bold',
    },
    {
      field: 'checkOutTime',
      headerName: 'Ngày hết hợp đồng',
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
    },
    {
      field: 'lastDay',
      headerName: 'Ngày thanh toán',
      headerAlign: 'center',
      width: 200,
      headerClassName: 'header-bold',
    },
  ];

  const columnsHis = [
    { field: 'key', headerName: 'STT', headerAlign: 'center', width: 150 },
    {
      field: 'amount',
      headerName: 'Số Tiền',
      headerAlign: 'center',
      width: 150,
      headerClassName: 'header-bold',
    },
    // {
    //   field: 'paymentMethod',
    //   headerName: 'Phương thức thanh toán',
    //   headerAlign: 'center',
    //   width: 250,
    //   headerClassName: 'header-bold',
    // },
    {
      field: 'description',
      headerName: 'Ghi Chú',
      headerAlign: 'center',
      width: 400,
      headerClassName: 'header-bold',
    },
    {
      field: 'type',
      headerName: 'Hình thức thanh toán',
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
      renderCell: params => <p>{typePay(params.value)}</p>,
    },
    {
      field: 'action',
      headerName: 'Sự kiện',
      headerAlign: 'center',
      width: 400,
      headerClassName: 'header-bold',
      renderCell: params => (
        // eslint-disable-next-line no-unused-expressions
        <>
          <Button
            className="ml-auto"
            color="primary"
            onClick={() => {
              history.push(`/order-pay/${params.row._id}`);
            }}
          >
            UNC
          </Button>
          <Button
            className="ml-auto"
            color="primary"
            onClick={() => {
              history.push(`/room-detail/${params.row.roomId}`);
            }}
          >
            Chi tiết phòng
          </Button>
          <Button
            className="ml-auto"
            color="primary"
            onClick={() => {
              history.push(`/room-detail-update-admin/${params.row.roomId}`);
            }}
          >
            Trạng Thái
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Helmet>
        <title>Quản lý phòng</title>
        <meta name="description" content="Description of RoomManage" />
      </Helmet>
      <div className="title">Quản lý phòng</div>
      <div className="admin-users-wrapper container-fuild">
        <div style={{ width: '100%' }}>
          <DataGrid
            getRowId={row => row.key}
            rows={job}
            columns={columns}
            pageSize={10}
            autoHeight
            isCellEditable={params => params.key}
          />
        </div>
      </div>
      <SuccessPopup
        visible={showSuccessPopup}
        content="Xóa thành công"
        toggle={() => {
          props.changeStoreData('showSuccessPopup', !showSuccessPopup);
        }}
      />
      <WarningPopup
        visible={showWarningPopup}
        content="Bạn thực sự muốn xóa?"
        // callBack={() => props.deleteAdminUser(id, '')}
        toggle={() => {
          props.changeStoreData('showWarningPopup', false);
        }}
      />
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
                    secondary={`SĐT: ${profile.phoneNumber.countryCode} ${profile.phoneNumber.number
                      }`}
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
      <Modal
        isOpen={isOpenHis}
        onRequestClose={toggleModalHis}
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
            <h4>Lịch sử đặt phòng</h4>
          </Row>
          <Row>
            <div style={{ width: '100%' }}>
              <DataGrid
                getRowId={row => row.key}
                rows={OrderArr}
                columns={columnsHis}
                pageSize={10}
                autoHeight
                isCellEditable={params => params.key}
              />
            </div>
          </Row>
        </div>
        <div style={{ textAlign: 'right', marginTop: '15px' }}>
          <Button
            className="btn btn-secondary"
            onClick={toggleModalHis}
            color="primary"
          >
            Đóng
          </Button>
        </div>
      </Modal>
    </div>
  );
}

RoomManage.propTypes = {
  changeStoreData: PropTypes.func,
  getListRoom: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  roomManage: makeSelectRoomManage(),
});

function mapDispatchToProps(dispatch) {
  return {
    changeStoreData: (key, value) => {
      dispatch(changeStoreData(key, value));
    },
    getListRoom: () => {
      dispatch(getListRoom());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(RoomManage);
