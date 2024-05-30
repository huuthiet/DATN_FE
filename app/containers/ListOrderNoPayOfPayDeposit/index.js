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
  getListOrderNoPay,
} from './actions';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import makeSelectListOrderNoPayOfPayDepositList from './selectors';
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

export function ListOrderNoPayOfPayDeposit(props) {
  useInjectReducer({ key: 'listOrderNoPayOfPayDeposit', reducer });
  useInjectSaga({ key: 'listOrderNoPayOfPayDeposit', saga });
  // const [urlImgCloud, setUrlImgCloud] = useState('');
  const currentUser = localStore.get('user') || {};

  const history = useHistory();

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

  const { id, idPayDeposit } = useParams();

  const {
    listOrderNoPayOfPayDeposit = [],
  } = props.listOrderNoPayOfPayDeposit;
  useEffect(() => {
    props.getListOrderNoPay(idPayDeposit);
  }, []);

  console.log({listOrderNoPayOfPayDeposit});

  

  const transformedData = listOrderNoPayOfPayDeposit.map((item, index) => ({
    key: index + 1, // STT
    amount: Money(item.amount) + " VNĐ", // Số tiền cọc
    type: item.description,
    _id: item._id, // ID của đối tượng
    time: moment(new Date(item.createdAt)).format("DD/MM/YYYY"),
    expireTime: moment(new Date(item.expireTime)).format("DD/MM/YYYY"),
    keyOrder: item.keyOrder,
  }));

  const columns = [
    { field: 'key', headerName: 'STT', headerAlign: 'center', width: 120 },
    {
      field: 'keyOrder',
      headerName: 'Mã hóa đơn',
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
      headerName: 'Thời gian hết hạn',
      headerAlign: 'center',
      width: 200,
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
      field: 'type',
      headerName: 'Loại hóa đơn',
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
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
        <title>Orders No Pay</title>
        <meta name="description" content="Description of Orders No Pay" />
      </Helmet>
      <div className="title">Danh sách hóa đơn không được thanh toán</div>
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
    </div>
  );
}

ListOrderNoPayOfPayDeposit.propTypes = {
  dispatch: PropTypes.func,
  changeStoreData: PropTypes.func,
  getListOrderNoPay: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  listOrderNoPayOfPayDeposit: makeSelectListOrderNoPayOfPayDepositList(),
});

function mapDispatchToProps(dispatch) {
  return {
    getListOrderNoPay: id => {
      dispatch(getListOrderNoPay(id));
    },
    changeStoreData: (key, value) => {
      dispatch(changeStoreData(key, value));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ListOrderNoPayOfPayDeposit);
