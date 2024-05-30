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
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import localStore from 'local-storage';
import { useHistory, useParams } from 'react-router-dom';
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

export function ManagerAcceptMonthlyHost(props) {
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
  console.log({ showWarningapprove });
  console.log({ pendingAcceptDepositList });
  console.log('accctionnnn', action);

  useEffect(() => {
    props.getPayDepositList(id);
  }, [action]);

  let transformedData = [];
  if (pendingAcceptDepositList.length !== 0) {
    transformedData = pendingAcceptDepositList.map((item, index) => ({
      key: index + 1, // STT
      nameUser: `${item.user.lastName} ${item.user.firstName}`, // Người thuê
      phone: `${item.user.phoneNumber.countryCode}${item.user.phoneNumber.number
        }`, // Số điện thoại
      roomName: item.room.name ? item.room.name : 'N/A', // Phòng
      amount: `${Money(parseInt(item.amount))} VNĐ`, // Số tiền cọc
      // amount: Money(item.amount), // Số tiền cọc
      description: item.description,
      keyPayment: item.keyPayment,
      status: item.status === 'waiting' ? 'Đang chờ duyệt' :
        item.status === 'faild' ? 'Thất bại' :
          item.status === 'success' ? 'Thành công' :
            item.status === 'cancel' ? 'Đã hủy' : 'N/A',
      time: moment(new Date(item.createdAt)).format("DD-MM-YYYY"),
      payment_Method: (item.paymentMethod === "cash") ? "Tiền mặt" : "Ngân hàng",
      // ...item,
      file: item.file,
      _id: item._id,
    }));
  }

  console.log({ transformedData });

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
      headerName: 'Số tiền',
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
        if (params.row.status === 'Đang chờ duyệt') {
          return (
            <Button
              color="success"
              onClick={() => {
                /* eslint no-underscore-dangle: 0 */
                // eslint-disable-next-line no-undef
                console.log({ params });
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
        if (params.row.status === 'Đang chờ duyệt') {
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
      field: 'action',
      headerName: 'Chi tiết',
      headerAlign: 'center',
      width: 200,
      headerClassName: 'header-bold',
      renderCell: params =>
      // eslint-disable-next-line no-unused-expressions
      (
        <>
          <a
            className='btn-detail'
            onClick={() => {
              console.log("{params.row._id}", params.row._id);
              history.push(`/manage-deposit/pay-deposit/${id}/${params.row._id}`);
            }}
          >
            Xem chi tiết
          </a>
        </>
      )
      ,
    },
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
        <title>Accept Monthly Order</title>
        <meta
          name="description"
          content="Description of Accept Monthly Order"
        />
      </Helmet>
      <div className="title">Danh sách phê duyệt Thanh toán hàng tháng</div>
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

ManagerAcceptMonthlyHost.propTypes = {
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

export default compose(withConnect)(ManagerAcceptMonthlyHost);
