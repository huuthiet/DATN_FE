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
import * as fileDownload from 'js-file-download';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

import Money from '../../containers/App/format';
import SuccessPopup from '../../components/SuccessPopup';
import WarningPopup from '../../components/WarningPopup';
import { notificationController } from '../../controller/notificationController';

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

export function HistoryDepositAfterCheckInCost(props) {
  useInjectReducer({ key: 'historyDepositAfterCheckInCost', reducer });
  useInjectSaga({ key: 'historyDepositAfterCheckInCost', saga });
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

  const { idRoom = '', nameRoom = '' } = useParams();

  const [loading, setLoading] = useState(false);
  const startLoading = () => {
    setLoading(true);
  };

  const stopLoading = () => {
    setLoading(false);
  };

  const downloadFile = async id => {
    startLoading();
    console.log({ id });
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${localStoreService.get('user').token}`,
      },
    };
    const requestUrl =
      urlLink.api.serverUrl
      + urlLink.api.postExportBillPaidByOrder
      + id;
    console.log({ requestUrl })
    try {
      const response = await axios.post(
        requestUrl,
        null,
        {
          responseType: 'blob',
        },
        config,
      );
      console.log("file", response.data);
      fileDownload(response.data, 'export.pdf');
      stopLoading();
      notificationController.success('Xuất Hóa Đơn Thành Công');
    } catch (err) {
      stopLoading();
      notificationController.error('Xuất Hóa Đơn Không Thành Công');
    }
  };

  const {
    historyDepositAfterCheckInCost = [],
    showWarningapprove,
    showSuccessapprove,
    action = 0,
  } = props.historyDepositAfterCheckInCost;
  console.log({ showWarningapprove });
  console.log({ historyDepositAfterCheckInCost });
  console.log('accctionnnn', action);

  useEffect(() => {
    props.getPayDepositList(idRoom);
  }, [action]);

  let transformedData = [];
  if (historyDepositAfterCheckInCost.length !== 0) {
    transformedData = historyDepositAfterCheckInCost.map((item, index) => ({
      key: index + 1, // STT
      nameUser: `${item.user.lastName} ${item.user.firstName}`, // Người thuê
      phone: `${item.user.phoneNumber.countryCode}${item.user.phoneNumber.number}`, // Số điện thoại
      amount: Money(parseInt(item.amount)) + " VNĐ", // Số tiền cọc
      description: item.description,
      keyPayment: item.keyPayment,
      status:
        item.status === 'waiting'
          ? 'Đang chờ duyệt'
          :
          item.status === 'faild' ? 'Thất bại' :
            item.status === 'success' ? 'Thành công' :
              item.status === 'cancel' ? 'Đã hủy' : 'N/A',
      time: moment(new Date(item.createdAt)).format("DD-MM-YYYY"),
      timePaid: moment(new Date(item.updatedAt)).format("DD-MM-YYYY"),
      expireTime: moment(new Date(item.expireTime)).format("DD-MM-YYYY"),
      payment_Method: (item.paymentMethod === "cash") ? "Tiền mặt" : "Ngân hàng",
      // ...item,
      _id: item._id,
      keyOrder: item.keyOrder,
    }));
  }

  // console.log({transformedData});s

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
      field: 'time',
      headerName: 'Thời gian tạo',
      headerAlign: 'center',
      width: 200,
      headerClassName: 'header-bold',
    },
    {
      field: 'expireTime',
      headerName: 'Hạn thanh tóa',
      headerAlign: 'center',
      width: 200,
      headerClassName: 'header-bold',
    },
    {
      field: 'timePaid',
      headerName: 'Thời gian thanh toán',
      headerAlign: 'center',
      width: 200,
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
      field: 'keyOrder',
      headerName: 'Mã hóa đơn',
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
      field: 'bill',
      headerName: 'Hóa đơn',
      headerAlign: 'center',
      width: 200,
      headerClassName: 'header-bold',
      // eslint-disable-next-line consistent-return
      renderCell: params => {
        return (
          <Button
            onClick={() => {
              downloadFile(params.row._id);
            }}
            color="primary"
          >
            Xuất Hóa Đơn
          </Button>
        );
      },
    },
  ];


  return (
    <div className="user-profile-wrapper container">
      <Helmet>
        <title>History Deposit</title>
        <meta name="description" content="Description of History Deposit" />
      </Helmet>
      <div className="title">Lịch sử đặt cọc phòng {nameRoom}</div>
      {loading && <div className="loading-overlay" />}
      <div className="job-list-wrapper container-fluid">
        <div style={{ width: '100%' }}>
          <DataGrid
            getRowId={row => row.key}
            rows={transformedData}
            columns={columns}
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

HistoryDepositAfterCheckInCost.propTypes = {
  dispatch: PropTypes.func,
  changeStoreData: PropTypes.func,
  changeStoreData: PropTypes.func,
  approvePendingPayDeposit: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  historyDepositAfterCheckInCost: makeSelectPayDepositList(),
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

export default compose(withConnect)(HistoryDepositAfterCheckInCost);
