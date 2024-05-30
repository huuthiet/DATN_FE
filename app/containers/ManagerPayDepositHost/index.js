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
import moment from 'moment';

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

export function ManagerPayDepositHost(props) {
  useInjectReducer({ key: 'payDepositList', reducer });
  useInjectSaga({ key: 'payDepositList', saga });
  // const [urlImgCloud, setUrlImgCloud] = useState('');
  const currentUser = localStore.get('user') || {};

  const [idTransaction, setIdTransaction] = useState('');
  const [status, setStatus] = useState('');
  // let idTransaction = '';

  const {
    _id = '',
    lastName = '',
    firstName = '',
    role = [],
    phoneNumber = {},
  } = currentUser;

  const { id } = useParams();
  console.log({id});

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
    payDepositList = [],
    showWarningapprove,
    showSuccessapprove,
    action = 0,
  } = props.payDepositList;
  console.log({showWarningapprove})
  console.log({payDepositList});

  console.log("acction", action);
  useEffect(() => {
    props.getPayDepositList(id);
  }, [action]);

  

  const transformedData = payDepositList.map((item, index) => ({
    key: index + 1, // STT
    user: `${item.user.lastName} ${item.user.firstName}`, // Người thuê
    phone: item.user.phoneNumber.countryCode + item.user.phoneNumber.number, // Số điện thoại
    room: item.room.name, // Phòng
    amount: Money(item.amount) + " VNĐ", // Số tiền cọc
    type: item.type === 'noPayDeposit' ? 'Không trả cọc' : 'Trả cọc', // Loại (Trả cọc/ Không trả cọc)
    // reasonNoPay: item.reasonNoPay,
    // success:  item.type === 'payDeposit' ? 1: 2,
    reasonNoPay: item.reasonNoPay === 'noActive' ? 'Chưa active phòng' :
                          item.reasonNoPay === 'noPayAterCheckInCost' ? 'Không thanh sau khi nhận phòng' :
                          item.reasonNoPay === 'noPayMonthly' ? 'Không thanh toán hàng tháng' :
                          item.reasonNoPay === 'unknown' ? 'N/A' : 'N/A',
    status: (item.status === 'pendingPay' && item.type === 'payDeposit') ? 'Đang chờ thanh toán' : 
                (item.status === 'paid' && item.type === 'payDeposit') ? 'Đã thanh toán' : 'N/A', // Trạng thái
    _id: item._id, // ID của đối tượng
    time: moment(new Date(item.createdAt)).format("DD/MM/YYYY"),
  }));

  const columns = [
    { field: 'key', headerName: 'STT', headerAlign: 'center', width: 120 },
    {
      field: 'user',
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
      field: 'room',
      headerName: 'Phòng',
      headerAlign: 'center',
      width: 150,
      headerClassName: 'header-bold',
    },
    {
      field: 'time',
      headerName: 'Thời gian',
      headerAlign: 'center',
      width: 200,
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
      field: 'type',
      headerName: 'Loại (Trả cọc/ Không trả cọc)',
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
    },
    {
      field: 'reasonNoPay',
      headerName: 'Lý do không trả cọc',
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
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
        if (params.row.type === "Trả cọc" && params.row.status === "Đang chờ thanh toán") {
          return (
            <Button
              color="success"
              onClick={() => {
                /* eslint no-underscore-dangle: 0 */
                // eslint-disable-next-line no-undef
                setIdTransaction(params.row._id);
                // idTransaction = params.row._id;
                console.log("ddddd", params.row._id);
                // eslint-disable-next-line no-undef
                setStatus('paid');
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
      field: 'action',
      headerName: 'Chi tiết',
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
                console.log("{params.row._id}",params.row._id);
                history.push(`/manage-deposit/pay-deposit/${id}/${params.row._id}`);
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
    if ((role.length === 1 || role.includes('host')) && (column.field === 'success')) {
      return false;
    }
    return true;
  });

  // const [id, setId] = useState('');

  return (
    <div className="user-profile-wrapper container">
      <Helmet>
        <title>Pay Deposit</title>
        <meta name="description" content="Description of Pay Deposit" />
      </Helmet>
      <div className="title">Danh sách trả cọc</div>
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
        content="Xác nhận bạn đã trả cọc cho khách hàng?"
        callBack={() => props.approvePendingPayDeposit(idTransaction, status)}
        toggle={() => {
          props.changeStoreData('showWarningapprove', false);
        }}
      />
      <SuccessPopup
        visible={showSuccessapprove}
        content="Chấp nhận thành công"
        toggle={() => {
          props.changeStoreData('showSuccessapprove', !showSuccessapprove);
        }}
      />
    </div>
  );
}

ManagerPayDepositHost.propTypes = {
  dispatch: PropTypes.func,
  changeStoreData: PropTypes.func,
  approvePendingPayDeposit: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  payDepositList: makeSelectPayDepositList(),
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

export default compose(withConnect)(ManagerPayDepositHost);
