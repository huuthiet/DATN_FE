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
  getWithdrawalList,
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

export function WithdrawRequestListHost(props) {
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

  const { userId, motelName } = useParams();
  console.log({ userId, motelName });



  useEffect(() => {
    props.getWithdrawalList({ userId, motelName });
  }, []);

  const {
    showWarningapprove,
    showSuccessapprove,
    action = 0,
  } = props.pendingAcceptDepositList;

  const pendingAcceptDepositList = props.pendingAcceptDepositList.withdrawalList || [];

  console.log("Check props", props.pendingAcceptDepositList.withdrawalList);



  let transformedData = [];
  if (pendingAcceptDepositList.length !== 0) {
    transformedData = pendingAcceptDepositList.map((item, index) => ({
      key: index + 1, // STT
      nameUser: `${item.lastName} ${item.firstName}`, // Người thuê
      motelName: (item.motelName) ? (item.motelName) : "N/A", // Tòa nhà
      amount: Money(item.amount) + " VNĐ", // Số tiền cần rút
      description: item.description,
      keyPayment: item.keyPayment,
      bankName: item.bankName,
      accountNumber: item.bankNumber,
      bankOwner: item.bankOwner,
      status: item.status === 'waiting' ? 'Đang chờ duyệt' :
        item.status === 'approved' ? 'Đã được duyệt' :
          item.status === 'cancel' ? 'Đã hủy' : 'N/A',
      note: item.note,
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
      headerName: 'Người yêu cầu',
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
    },
    {
      field: 'keyPayment',
      headerName: 'Mã giao dịch',
      headerAlign: 'center',
      width: 200,
      headerClassName: 'header-bold',
    },
    {
      field: 'bankName',
      headerName: 'Ngân hàng',
      headerAlign: 'center',
      width: 400,
      headerClassName: 'header-bold',
    },
    {
      field: 'accountNumber',
      headerName: 'Số tài khoản',
      headerAlign: 'center',
      width: 200,
      headerClassName: 'header-bold',
    },
    {
      field: 'bankOwner',
      headerName: 'Tên chủ tài khoản',
      headerAlign: 'center',
      width: 200,
      headerClassName: 'header-bold',
    },
    {
      field: 'motelName',
      headerName: 'Tòa nhà',
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
      width: 300,
      headerClassName: 'header-bold',
    },
    {
      field: 'amount',
      headerName: 'Số tiền cần rút',
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
    },
    {
      field: 'description',
      headerName: 'Mô tả',
      headerAlign: 'center',
      width: 400,
      headerClassName: 'header-bold',
    },
    {
      field: 'note',
      headerName: 'Ghi chú từ người dùng',
      headerAlign: 'center',
      width: 400,
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
                console.log({ params })
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
    //             console.log("{params.row._id}", params.row._id);
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

  console.log({ filteredColumns });

  // const [id, setId] = useState('');

  return (
    <div className="user-profile-wrapper container">
      <Helmet>
        <title>Withdrawal List</title>
        <meta name="description" content="Description of Accept Deposit " />
      </Helmet>
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

WithdrawRequestListHost.propTypes = {
  dispatch: PropTypes.func,
  changeStoreData: PropTypes.func,
  changeStoreData: PropTypes.func,
  approvePendingPayDeposit: PropTypes.func,
  getWithdrawalList: PropTypes.func,
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
    getWithdrawalList: (userId, motelName) => {
      dispatch(getWithdrawalList(userId, motelName));
    },
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(WithdrawRequestListHost);
