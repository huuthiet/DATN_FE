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

import { Button } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import localStore from 'local-storage';
import moment from 'moment';
import axios from 'axios';
import {
  FormGroup,
  Label,
  Input,
  FormFeedback,
} from 'reactstrap';
import localStoreService from 'local-storage';
import { useParams } from 'react-router-dom';
import * as fileDownload from 'js-file-download';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

import Money from '../../containers/App/format';
import SuccessPopup from '../../components/SuccessPopup';
import WarningPopup from '../../components/WarningPopup';

import {
  changeStoreData,
  getPayDepositList,
} from './actions';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import makeSelectPayDepositList from './selectors';
import './style.scss';
import { urlLink } from '../../helper/route';
import { notificationController } from '../../controller/notificationController';
import ModalComponent from './modal';


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

export function OrderMonthlyPendingPayment(props) {
  useInjectReducer({ key: 'historyMonthly', reducer });
  useInjectSaga({ key: 'historyMonthly', saga });
  // const [urlImgCloud, setUrlImgCloud] = useState('');
  const currentUser = localStore.get('user') || {};

  const [idTransaction, setIdTransaction] = useState('');
  const [status, setStatus] = useState('');
  const [modal, setModal] = useState(false);

  const {
    _id = '',
    lastName = '',
    firstName = '',
    role = [],
    phoneNumber = {},
  } = currentUser;

  const { idMotel = '', nameMotel = '' } = useParams();

  const [loading, setLoading] = useState(false);
  const startLoading = () => {
    setLoading(true);
  };

  const stopLoading = () => {
    setLoading(false);
  };

  const downloadFile = async id => {
    startLoading();
    console.log({id});
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${localStoreService.get('user').token}`,
      },
    };
    console.log({config})
    const requestUrl =
      urlLink.api.serverUrl
      + urlLink.api.postExportBillRoomPendingPayByOrder
      + id;
      console.log({requestUrl})
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

  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [listIdOrder, setListOrder] = useState([]);

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    setIsValid(validateEmail(value));
  };

  const downloadAllFile = async() => {
    console.log("hihi");
    
    let listIdOrderTemp = [];
    if(transformedData.length > 0) {
      listIdOrderTemp = transformedData.map((item) => item._id);
    }

    console.log({listIdOrderTemp});
    if(listIdOrderTemp.length > 0) {
      setModal(!modal);
      setListOrder(listIdOrderTemp);
    } else {
      notificationController.error("Hiện Không Có Hóa Đơn Nào!");
    }
  }

  const cancelToggle = () => {
    setModal(!modal);
  };

  const handleSendMail = async () => {
    const requestUrl =
      urlLink.api.serverUrl
      + urlLink.api.postExportAllBillRoomPendingPayByOrderToMail;
    if(isValid) {
      setModal(!modal);
      console.log("Đã gửi", listIdOrder);

      const data = {
        email: email,
        listIdOrder: listIdOrder
      }

      try {
        const response = await axios.post(requestUrl, data);
        console.log("file", response.data);
        notificationController.success('Xuất Hóa Đơn Thành Công, Vui Lòng Chờ Trong Giây Lát Và Kiểm Tra Email!');
      } catch (err) {
        stopLoading();
        notificationController.error(err.response.data.errors[0].errorMessage);
      }
    }
  }

  const {
    historyMonthly = [],
    showWarningapprove,
    showSuccessapprove,
    action = 0,
  } = props.historyMonthly;

  useEffect(() => {
    props.getPayDepositList(idMotel);
  }, [action]);

  

  let transformedData= [];
  if (historyMonthly.length !== 0) {
    transformedData = historyMonthly.map((item, index) => ({
      key: index + 1, // STT
      nameUser: (item.userName) ? item.userName : "", // Người thuê
      phone: (item.userPhone) ? item.userPhone : "", // Số điện thoại
      roomName: (item.roomName) ? item.roomName : "", // Số điện thoại
      amount: Money(parseInt(item.amount)) + " VNĐ", // Số tiền cọc
      description: item.description,
      keyPayment: item.keyPayment,
      time: moment(new Date(item.createdAt)).format("DD-MM-YYYY"),
      // timePaid: moment(new Date(item.updatedAt)).format("DD-MM-YYYY"),
      expireTime: moment(new Date(item.expireTime)).format("DD-MM-YYYY"),
      keyOrder: item.keyOrder,
      _id: item._id,
    }));
  }

  // console.log({transformedData});s

  const columns = [
    { field: 'key', headerName: 'STT', headerAlign: 'center', width: 120 },
    {
      field: 'roomName',
      headerName: 'Phòng',
      headerAlign: 'center',
      width: 150,
      headerClassName: 'header-bold',
    },
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
      headerName: 'Hạn thanh toán',
      headerAlign: 'center',
      width: 200,
      headerClassName: 'header-bold',
    },
    // {
    //   field: 'timePaid',
    //   headerName: 'Thời gian thanh toán',
    //   headerAlign: 'center',
    //   width: 200,
    //   headerClassName: 'header-bold',
    // },
    {
      field: 'keyOrder',
      headerName: 'Mã hóa đơn',
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

  // const [id, setId] = useState('');

  return (
    <div className="user-profile-wrapper container">
      <Helmet>
        <title>Order Monthly</title>
        <meta name="description" content="Description of History Monthly" />
      </Helmet>
      <div className="title">Hóa hàng tháng chờ thanh toán tòa {nameMotel}</div>
      <Button
        style={{
          marginLeft: '10px',
        }}
        onClick={() => {
          downloadAllFile();
        }}
        color="primary"
      >
        Xuất Toàn Bộ Hóa Đơn
      </Button>
      <ModalComponent
        modal={modal}
        toggle={cancelToggle}
        modalTitle="Xuất toàn bộ hóa đơn"
        footer={
          <div>
            <Button
              variant="outlined"
              color="secondary"
              onClick={cancelToggle}
            >
              Hủy
            </Button>{' '}
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleSendMail()}
            >
              Xác nhận
            </Button>
          </div>
        }
      >
        <FormGroup>
          <Label for="email">Vui lòng nhập email nhận hóa đơn</Label>
          <Input
            id="email"
            name="email"
            placeholder="email"
            type="email"
            value={email}
            onChange={handleChange}
            invalid={!isValid && email !== ''}
          />
          <FormFeedback>Vui lòng nhập lại email!</FormFeedback>
        </FormGroup>
        <div>
          Tất cả hóa đơn chờ thanh toán sẽ được gửi vào email bạn cung cấp, vui lòng cung cấp chính xác email.
          Xác nhận xuất hóa đơn!
        </div>
      </ModalComponent>
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

OrderMonthlyPendingPayment.propTypes = {
  dispatch: PropTypes.func,
  changeStoreData: PropTypes.func,
  changeStoreData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  historyMonthly: makeSelectPayDepositList(),
});

function mapDispatchToProps(dispatch) {
  return {
    getPayDepositList: id => {
      dispatch(getPayDepositList(id));
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

export default compose(withConnect)(OrderMonthlyPendingPayment);
