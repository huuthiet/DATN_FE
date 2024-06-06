import React, { useEffect, useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from 'reactstrap';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as fileDownload from 'js-file-download';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { urlLink } from '../../helper/route';
import { notificationController } from '../../controller/notificationController';
import './style.scss';
import { changeStoreData, getPendingAcceptBankingCashList, approveWithdrawRequest } from './actions';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import makeSelectPendingAcceptBankCashList from './selectors';
import SuccessPopup from '../../components/SuccessPopup';
import WarningPopup from '../../components/WarningPopup';
import localStoreService from 'local-storage';
import * as localStore from 'local-storage';
import { CloudUpload } from '@material-ui/icons';
import moment from 'moment';
import Money from '../App/format';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

export function TransactionBankingCashLog(props) {
  useInjectReducer({ key: 'pendingAcceptBankCashList', reducer });
  useInjectSaga({ key: 'pendingAcceptBankCashList', saga });

  const history = useHistory();

  const currentUser = localStore.get('user') || {};
  const { _id } = currentUser;
  console.log({ currentUser });

  const [orderArr, setOrderArr] = useState([]);
  const [urlImgCloud, setUrlImgCloud] = useState('');
  const [idTransaction, setIdTransaction] = useState('');
  const [status, setStatus] = useState('');

  const fileInputRef = useRef(null);
  const fileRefs = useRef({});

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    props.getPendingAcceptBankingCashList();
  }, [urlImgCloud, status]);

  useEffect(() => {
    if (status === 'success') {
      props.getPendingAcceptBankingCashList();
      setStatus('');
    }
  }, [status]);

  const {
    pendingAcceptBankCashList = [],
    showWarningapprove,
    showWarningreject,
    showSuccessapprove,
    action = 0,
  } = props.pendingAcceptBankCashList;

  let transformedData = [];

  if (pendingAcceptBankCashList.length !== 0) {
    transformedData = pendingAcceptBankCashList.map((item, index) => ({
      key: index + 1,
      nameMotelRoom: item.motel && item.motel.name ? item.motel.name : 'N/A',
      nameRoom: item.room && item.room.name ? item.room.name : 'N/A',
      time: moment(new Date(item.createdAt)).format('DD-MM-YYYY'),
      amount_tranform: `${Money(parseInt(item.amount.toFixed(0)))} VNĐ`,
      payment_Method: item.paymentMethod === 'cash' ? 'Tiền mặt' : 'Ngân hàng',
      type_trasaction:
        item.type === 'monthly'
          ? 'Thanh toán hàng tháng'
          : item.type === 'afterCheckInCost'
            ? 'Thanh toán khi nhận phòng'
            : item.type === 'deposit'
              ? 'Thanh toán cọc'
              : 'N/A',
      ...item,
    }));
  }

  console.log('transformedData', transformedData);

  const handleFileChange = async (e, key) => {
    console.log({ key });
    const abcfile = e.target.files[0];
    const formData = new FormData();
    formData.append('file', abcfile);

    try {
      const data = {
        id: key,
        formData,
      };
      apiPostImg(data);
    } catch (error) {
      console.log({ error });
    }
  };

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
      urlLink.api.serverUrl + urlLink.api.postExportBillPaidByTransaction + id;
    console.log({ requestUrl });
    try {
      const response = await axios.post(
        requestUrl,
        null,
        {
          responseType: 'blob',
        },
        config,
      );
      console.log('file', response.data);
      fileDownload(response.data, 'export.pdf');
      stopLoading();
      notificationController.success('Xuất Hóa Đơn Thành Công');
    } catch (err) {
      stopLoading();
      notificationController.error('Xuất Hóa Đơn Không Thành Công');
    }
  };

  const apiPostImg = async payload => {
    const { id, formData } = payload;
    console.log('formData', formData);
    const requestUrl = `${urlLink.api.serverUrl}/v1/uploading/img/${id}/transaction`;
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${localStoreService.get('user').token}`,
      },
    };
    try {
      const response = await axios.post(requestUrl, formData, config);
      console.log('responsexx', response);
      if (response.data.data.images) {
        setUrlImgCloud(response.data.data.images.imageUrl);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const columns = [
    { field: 'key', headerName: 'STT', headerAlign: 'center', width: 150 },
    {
      field: 'keyPayment',
      headerName: 'Nội dung thanh toán',
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
    },
    {
      field: 'amount_tranform',
      headerName: 'Số tiền',
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
      width: 200,
      headerClassName: 'header-bold',
    },
    {
      field: 'nameMotelRoom',
      headerName: 'Tên khu trọ',
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
    },
    {
      field: 'nameRoom',
      headerName: 'Phòng',
      headerAlign: 'center',
      width: 150,
      headerClassName: 'header-bold',
    },
    {
      field: 'type_trasaction',
      headerName: 'Loại thanh toán',
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
    },
    {
      field: 'description',
      headerName: 'Ghi chú',
      headerAlign: 'center',
      width: 400,
      headerClassName: 'header-bold',
    },
    {
      field: 'status',
      headerName: 'Trạng thái',
      headerAlign: 'center',
      width: 150,
      headerClassName: 'header-bold',
    },
    {
      field: 'iamgeLink',
      headerName: 'Minh chứng đã tải',
      headerAlign: 'center',
      width: 200,
      headerClassName: 'header-bold',
      renderCell: params => (
        <a href={params.row.file} target="bank">
          LINK
        </a>
      ),
    },
    {
      field: 'action',
      headerName: 'Tải minh chứng',
      headerAlign: 'center',
      width: 200,
      headerClassName: 'header-bold',
      renderCell: params => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            paddingBottom: '5px',
            alignItems: 'center',
          }}
        >
          <input
            type="file"
            ref={el => (fileRefs.current[params.row._id] = el)}
            style={{ display: 'none' }}
            onChange={evt => {
              console.log({ params });
              handleFileChange(evt, params.row._id);
            }}
          />
          <CloudUpload
            style={{ fontSize: 40, cursor: 'pointer' }}
            onClick={() => fileRefs.current[params.row._id].click()}
          />
        </div>
      ),
    },
    {
      field: 'success',
      headerName: 'Chấp nhận',
      headerAlign: 'center',
      width: 200,
      headerClassName: 'header-bold',
      renderCell: params => {
        if (params.row.status === "waiting") {
          return (
            <Button
              color="success"
              onClick={() => {
                setIdTransaction(params.row._id);
                setStatus('approve');
                props.changeStoreData('showWarningapprove', true);
              }}
            >
              <i className="fa fa-check" aria-hidden="true">
                <FormattedMessage {...messages.Accept} />
              </i>
            </Button>
          );
        }
        return '';
      },
    },
    {
      field: 'reject',
      headerName: 'Từ chối',
      headerAlign: 'center',
      width: 200,
      headerClassName: 'header-bold',
      renderCell: params => {
        if (params.row.status === "waiting") {
          return (
            <Button
              color="danger"
              onClick={() => {
                setIdTransaction(params.row._id);
                setStatus('reject');
                props.changeStoreData('showWarningapprove', true);
              }}
            >
              <i className="fa fa-check" aria-hidden="true">
                <FormattedMessage {...messages.Reject} />
              </i>
            </Button>
          );
        }
        return '';
      },
    },
  ];

  return (
    <div className="login-page-wrapper">
      <Helmet>
        <title>WithdrawalRequestProcess</title>
        <meta
          name="description"
          content="Description of TransactionBankingCashLog"
        />
      </Helmet>
      <div className="title">
        <FormattedMessage {...messages.Header} />
      </div>
      {loading && <div className="loading-overlay" />}
      <div className="job-list-wrapper container-fluid">
        <div style={{ width: '100%' }}>
          <DataGrid
            getRowId={row => row._id}
            rows={transformedData}
            columns={columns}
            pageSize={10}
            autoHeight
            isCellEditable={params => params._id}
          />
        </div>
      </div>
      <WarningPopup
        visible={showWarningapprove}
        content="Xác nhận thực hiện?"
        callBack={() => {
          props.approveWithdrawRequest(idTransaction, status);
          console.log({ idTransaction, status });
        }}
        toggle={() => {
          props.changeStoreData('showWarningapprove', false);
        }}
      />

      <WarningPopup
        visible={showWarningreject}
        content="Xác nhận từ chối?"
        callBack={() => {
          props.approveWithdrawRequest(idTransaction, status);
          console.log({ idTransaction, status });
          toast.success('Từ chối yêu cầu thành công!');
        }}
        toggle={() => {

          props.changeStoreData('showWarningreject', false);
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

TransactionBankingCashLog.propTypes = {
  dispatch: PropTypes.func,
  changeStoreData: PropTypes.func,
  approveWithdrawRequest: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  pendingAcceptBankCashList: makeSelectPendingAcceptBankCashList(),
});

function mapDispatchToProps(dispatch) {
  return {
    getPendingAcceptBankingCashList: () => {
      dispatch(getPendingAcceptBankingCashList());
    },
    approveWithdrawRequest: (idTransaction, status) => {
      dispatch(approveWithdrawRequest(idTransaction, status));
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

export default compose(withConnect)(TransactionBankingCashLog);
