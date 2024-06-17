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
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import localStore from 'local-storage';
import { useHistory } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
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
import { FormattedMessage } from 'react-intl';

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

export function CensorHosts(props) {
  useInjectReducer({ key: 'pendingAcceptDepositList', reducer });
  useInjectSaga({ key: 'pendingAcceptDepositList', saga });
  // const [urlImgCloud, setUrlImgCloud] = useState('');
  const currentUser = localStore.get('user') || {};

  const [idUser, setIdUser] = useState('');
  const [status, setStatus] = useState(false);

  const history = useHistory();

  const {
    _id = '',
    lastName = '',
    firstName = '',
    role = [],
    phoneNumber = {},
  } = currentUser;

  const { id } = useParams();
  console.log({ id });

  // console.log({currentUser});

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
  console.log({ showWarningapprove })
  console.log({ pendingAcceptDepositList });
  console.log("accctionnnn", action);

  useEffect(() => {
    props.getPayDepositList();
  }, [action]);



  let transformedData = [];
  if (pendingAcceptDepositList.length !== 0) {
    transformedData = pendingAcceptDepositList.map((item, index) => ({
      key: index + 1, // STT
      name: item.lastName + item.firstName,
      address: item.address.address ? item.address.address : "N/A",
      _id: item._id,
      phone: item.phoneNumber ? item.phoneNumber.countryCode + item.phoneNumber.number : "N/A",
      // ...item,
      backId: item.backId ? item.backId : '',
      frontId: item.frontId ? item.frontId : '',
      avatar: item.avatar ? item.avatar : '',
      gender: item.gender ? item.gender : '',
      nationalId: item.nationalId ? item.nationalId : '',
      email: item.email ? item.email : '',
      dob: item.dob ? item.dob : '',
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

    console.log({ row })
    // eslint-disable-next-line no-param-reassign
    profile.fullName = row.owner;
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
    console.log({ profile })
  }

  const columns = [
    { field: 'key', headerName: 'STT', headerAlign: 'center', width: 120 },
    {
      field: 'name',
      headerName: 'Tên chủ trọ',
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
    },
    {
      field: 'addressMotel',
      headerName: 'Địa chỉ',
      headerAlign: 'center',
      width: 400,
      headerClassName: 'header-bold',
    },
    {
      field: 'ownerInfor',
      headerName: 'Thông tin tiết',
      headerAlign: 'center',
      width: 200,
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
    {
      field: 'success',
      headerName: 'Chấp nhận',
      headerAlign: 'center',
      width: 200,
      headerClassName: 'header-bold',
      // eslint-disable-next-line consistent-return
      renderCell: params => {
        // eslint-disable-next-line no-unused-expressions
        return (
          <Button
            color="success"
            onClick={() => {
              /* eslint no-underscore-dangle: 0 */
              // eslint-disable-next-line no-undef
              console.log({ params })
              setIdUser(params.row._id);
              // eslint-disable-next-line no-undef
              setStatus(true);
              // eslint-disable-next-line no-undef
              props.changeStoreData('showWarningapprove', true);
            }}
          >
            <i className="fa fa-check" aria-hidden="true">
              Chấp Nhận
            </i>
          </Button>
        );
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
        console.log({ params })
        return (
          <Button
            color="cancel"
            onClick={() => {
              /* eslint no-underscore-dangle: 0 */
              // eslint-disable-next-line no-undef
              setIdUser(params.row._id);
              // eslint-disable-next-line no-undef
              setStatus(false);
              // eslint-disable-next-line no-undef
              props.changeStoreData('showWarningapprove', true);
            }}
          >
            <i className="fa fa-check" aria-hidden="true">
              Không chấp nhận
            </i>
          </Button>
        );
      },
    },
    {
      field: 'action',
      headerName: 'Chỉnh sửa',
      headerAlign: 'center',
      width: 200,
      headerClassName: 'header-bold',
      renderCell: params => {
        // eslint-disable-next-line no-unused-expressions
        return (
          <>
            <a
              className='btn-detail'
              onClick={() => {
                history.push(`/admin/users/${params.row._id}`);
              }}
            >
              Xem chi tiết
            </a>
          </>
        );
      },
    },
  ];

  const filteredColumns = columns.filter(column => {
    if ((role.length === 1 || role.includes('host')) && (column.field === 'error' || column.field === 'success')) {
      return false;
    }
    return true;
  });

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

  // const [id, setId] = useState('');

  return (
    <div className="user-profile-wrapper container">
      <Helmet>
        <title>Censor Hosts</title>
        <meta name="description" content="Description of Censor Hosts" />
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
            <h4>Kiểm Duyệt Chủ Trọ</h4>
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
      <div className="title">
        <FormattedMessage {...messages.Header} />
      </div>
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
        callBack={() => props.approvePendingPayDeposit(idUser, status)}
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

CensorHosts.propTypes = {
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
    getPayDepositList: () => {
      dispatch(getPayDepositList());
    },
    changeStoreData: (key, value) => {
      dispatch(changeStoreData(key, value));
    },
    approvePendingPayDeposit: (idUser, status) => {
      dispatch(approvePendingPayDeposit(idUser, status));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(CensorHosts);
