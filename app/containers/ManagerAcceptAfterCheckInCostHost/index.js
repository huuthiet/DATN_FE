/**
 *
 * Profile
 *
 */

import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { toast } from 'react-toastify';
import { DataGrid } from '@mui/x-data-grid';

import {
  Avatar,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  colors,
} from '@material-ui/core';
import Modal from 'react-modal';
import { Col, Row } from 'reactstrap';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import localStore from 'local-storage';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

import Money from '../../containers/App/format';
import SuccessPopup from '../../components/SuccessPopup';
import WarningPopup from '../../components/WarningPopup';

import {
  changeStoreData,
  getPayDepositList,
  approvePendingPayDeposit,
} from './actions';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import makeSelectPayDepositList from './selectors';
import './style.scss';
import { urlLink } from '../../helper/route';
import axios from 'axios';
import localStoreService from 'local-storage';



import useMediaQuery from '@material-ui/core/useMediaQuery';
import { set } from 'lodash';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
    justifyContent: 'center',
    alignItems: 'center',
  },
  large: {
    width: theme.spacing(25),
    height: theme.spacing(25),
  },
  input: {
    display: 'none',
  },
}));

export function ManagerAcceptAfterCheckInCostHost(props) {
  useInjectReducer({ key: 'pendingAcceptDepositList', reducer });
  useInjectSaga({ key: 'pendingAcceptDepositList', saga });
  // const [urlImgCloud, setUrlImgCloud] = useState('');
  const currentUser = localStore.get('user') || {};

  const [idTransaction, setIdTransaction] = useState('');
  const [status, setStatus] = useState('');

  const {
    _id = '',
    lastName = '',
    firstName = '',
    role = [],
    phoneNumber = {},
  } = currentUser;

  const { id } = useParams();
  console.log({id});

  console.log({currentUser});

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const promises = jobs.map(async job => {
  //       try {
  //         const { _id } = job;
  //         console.log({_id});

  //         const totalKWhApi =
  //           `${urlLink.api.serverUrl +
  //           urlLink.api.getDataEnergyPerDayV2}${_id}`;

  //           console.log({totalKWhApi});
  //         const response = await axios.get(totalKWhApi, {
  //           headers: {
  //             Authorization: `Bearer ${localStoreService.get('user').token}`,
  //           },
  //         });

  //         const { data } = response.data;

  //         if (data !== null) {
  //           const totalKWh = data.toFixed(2);
  //           console.log('totalKWh', totalKWh);

  //           return totalKWh;
  //         }
  //         console.log('Chưa có dữ liệu');
  //         return 'Chưa có dữ liệu';
  //       } catch (error) {
  //         console.error('Error fetching data:', error);
  //         return 'Chưa có dữ liệu';
  //       }
  //     });

  //     const results = await Promise.all(promises);
  //     setDataEnergyPerMonth(results);
  //   };

  //   fetchData();
  // }, [jobs]);

  const {
    pendingAcceptDepositList = [],
    showWarningapprove,
    showSuccessapprove,
    action = 0,
  } = props.pendingAcceptDepositList;
  console.log({showWarningapprove})
  console.log({pendingAcceptDepositList});
  console.log("accctionnnn", action);

  useEffect(() => {
    props.getPayDepositList(id);
  }, [action]);

  

  let transformedData= [];
  if (pendingAcceptDepositList.length !== 0) {
    transformedData = pendingAcceptDepositList.map((item, index) => ({
      key: index + 1, // STT
      nameUser: `${item.user.lastName} ${item.user.firstName}`, // Người thuê
      phone: `${item.user.phoneNumber.countryCode}${item.user.phoneNumber.number}`, // Số điện thoại
      roomName: (item.room.name) ? (item.room.name) : "N/A", // Phòng
      amount: Money(item.amount) + " VNĐ", // Số tiền cọc
      description: item.description,
      keyPayment: item.keyPayment,
      status: item.status === 'waiting' ? 'Đang chờ duyệt' :
                            item.status === 'faild' ? 'Thất bại' :
                            item.status === 'success' ? 'Thành công' :
                            item.status === 'cancel' ? 'Đã hủy': 'N/A',
    time: moment(new Date(item.createdAt)).format("DD-MM-YYYY"),
    payment_Method: (item.paymentMethod === "cash")?"Tiền mặt": "Ngân hàng",
      // ...item,
      file: item.file,
      _id: item._id,
      backId: item.user.backId ? item.user.backId : '',
      frontId: item.user.frontId ? item.user.frontId : '',
      avatar: item.user.avatar ? item.user.avatar : '',
      gender: item.user.gender ? item.user.gender : '',
      nationalId: item.user.nationalId ? item.user.nationalId : '',
      address: item.user.address ? item.user.address : '',
      email: item.user.email ? item.user.email : '',
      dob: item.user.dob ? item.user.dob : '',
    }));
  }

  const profileTemp = {
    phoneNumber: '',
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

  function handleProfile(row) {
    
    console.log({row})
    // eslint-disable-next-line no-param-reassign
    profile.fullName = row.nameUser;
    profile.nationalId = row.nationalId;
    profile.address = row.address;
    profile.email = row.email;
    profile.dob = row.dob;
    profile.phoneNumber = row.phone;
    // eslint-disable-next-line no-param-reassign
    // profile.frontIdUser = row.user.frontIdUser;
    // eslint-disable-next-line no-param-reassign
    // profile.backIdUser = row.user.backIdUser;
    // eslint-disable-next-line no-param-reassign
    // profile.avataIdUser = row.user.avatar;
    profile.gender = row.gender ? row.gender : "Khác";
    profile.avataIdUser = row.avatar;
    profile.backIdUser = row.backId;
    profile.frontIdUser = row.frontId;
    setProfile(profile);

    toggleModal();
  }

  function toggleModal() {
    setIsOpen(!isOpen);
    console.log({profile})
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
    { field: 'key', headerName: 'STT', headerAlign: 'center', width: 120 },
    {
      field: 'nameUser',
      headerName: 'Người thuê',
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
    },
    {
      field: 'phone',
      headerName: 'Số điện thoại',
      headerAlign: 'center',
      width: 200,
      headerClassName: 'header-bold',
    },
    {
      field: 'roomName',
      headerName: 'Phòng',
      headerAlign: 'center',
      width: 150,
      headerClassName: 'header-bold',
    },
    {
      field: 'time',
      headerName: 'Thời gian',
      headerAlign: 'center',
      width: 150,
      headerClassName: 'header-bold',
    },
    {
      field: 'payment_Method',
      headerName: 'Phương thức thanh toán',
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
    },
    {
      field: 'amount',
      headerName: 'Số tiền cọc',
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
    },
    {
      field: 'keyPayment',
      headerName: 'Nội dung thanh toán',
      headerAlign: 'center',
      width: 200,
      headerClassName: 'header-bold',
    },
    {
      field: 'description',
      headerName: 'Mô tả',
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
    },
    {
      field: 'UNC',
      headerName: 'Minh chứng',
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
      renderCell: params => (
        <a href={params.row.file} target="bank">
          LINK
        </a>
      ),
    },
    {
      field: 'status',
      headerName: 'Trạng thái',
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
    },
    {
      field: 'success',
      headerName: 'Chấp nhận',
      headerAlign: 'center',
      width: 200,
      headerClassName: 'header-bold',
      // eslint-disable-next-line consistent-return
      renderCell: params => {
        // eslint-disable-next-line no-unused-expressions
        if (params.row.status === "Đang chờ duyệt") {
          return (
            <Button
              color="success"
              onClick={() => {
                /* eslint no-underscore-dangle: 0 */
                // eslint-disable-next-line no-undef
                console.log({params})
                setIdTransaction(params.row._id);
                // eslint-disable-next-line no-undef
                setStatus('success');
                // eslint-disable-next-line no-undef
                props.changeStoreData('showWarningapprove', true);
              }}
            >
              <i className="fa fa-check" aria-hidden="true">
                Chấp Nhận
              </i>
            </Button>
          );
        }
        return '';
      },
    },
    {
      field: 'error',
      headerName: 'Hủy',
      headerAlign: 'center',
      width: 200,
      headerClassName: 'header-bold',
      // eslint-disable-next-line consistent-return
      renderCell: params => {
        // eslint-disable-next-line no-unused-expressions
        if (params.row.status === "Đang chờ duyệt") {
          return (
            <Button
              color="cancel"
              onClick={() => {
                /* eslint no-underscore-dangle: 0 */
                // eslint-disable-next-line no-undef
                setIdTransaction(params.row._id);
                // eslint-disable-next-line no-undef
                setStatus('cancel');
                // eslint-disable-next-line no-undef
                props.changeStoreData('showWarningapprove', true);
              }}
            >
              <i className="fa fa-check" aria-hidden="true">
                Không chấp nhận
              </i>
            </Button>
          );
        }
        return '';
      },
    },
    {
      field: 'user',
      headerName: 'Thông tin khách hàng',
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
      renderCell: params => (
        <Button
          onClick={() => {
            handleProfile(params.row);
          }}
          color="primary"
        >
          Chi tiết
        </Button>
      ),
    },
    // {
    //   field: 'action',
    //   headerName: 'Chi tiết',
    //   headerAlign: 'center',
    //   width: 200,
    //   headerClassName: 'header-bold',
    //   renderCell: params => {
    //     // eslint-disable-next-line no-unused-expressions
    //     return (
    //       <>
    //         <a
    //           className='btn-detail'
    //           onClick={() => {
    //             console.log("{params.row._id}",params.row._id);
    //             history.push(`/manage-deposit/pay-deposit/${id}/${params.row._id}`);
    //           }}
    //         >
    //           Xem chi tiết
    //         </a>
    //       </>
    //     );
    //   },
    // },
  ];

  const filteredColumns = columns.filter(column => {
    if ((role.length === 1 || role.includes('host')) && (column.field === 'error' || column.field === 'success')) {
      return false;
    }
    return true;
  });

  return (
    <div className="user-profile-wrapper container">
      <Helmet>
        <title>Accept AfterCheckInCost</title>
        <meta name="description" content="Description of Accept AfterCheckInCost " />
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
                    secondary={`SĐT: ${profile.phoneNumber}`}
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
      <div className="title">Danh sách phê duyệt Thanh toán khi nhận phòng</div>
      <div className="job-list-wrapper container-fluid">
        <div style={{ width: '100%' }}>
          <DataGrid
            getRowId={row => row.key}
            rows={transformedData}
            columns={filteredColumns}
            pageSize={10}
            autoHeight
            isCellEditable={params => params.key}
          />
        </div>
      </div>
      <WarningPopup
        visible={showWarningapprove}
        content="Xác nhận thực hiện?"
        callBack={() => props.approvePendingPayDeposit(idTransaction, status)}
        toggle={() => {
          props.changeStoreData('showWarningapprove', false);
        }}
      />
      <SuccessPopup
        visible={showSuccessapprove}
        content="Thành công!"
        toggle={() => {
          props.changeStoreData('showSuccessapprove', !showSuccessapprove);
        }}
      />
    </div>
  );
}

ManagerAcceptAfterCheckInCostHost.propTypes = {
  dispatch: PropTypes.func,
  changeStoreData: PropTypes.func,
  changeStoreData: PropTypes.func,
  approvePendingPayDeposit: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  pendingAcceptDepositList: makeSelectPayDepositList(),
});

function mapDispatchToProps(dispatch) {
  return {
    getPayDepositList: id => {
      dispatch(getPayDepositList(id));
    },
    changeStoreData: (key, value) => {
      dispatch(changeStoreData(key, value));
    },
    approvePendingPayDeposit: (idTransaction, status) => {
      dispatch(approvePendingPayDeposit(idTransaction, status));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ManagerAcceptAfterCheckInCostHost);
