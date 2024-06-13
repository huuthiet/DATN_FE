/**
 *
 * CTransantionLog
 *
 */
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from 'reactstrap';
import * as fileDownload from 'js-file-download';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { urlLink } from '../../helper/route';
import { notificationController } from '../../controller/notificationController';

import './style.scss';
import { changeStoreData, getPendingAcceptBankingCashList } from './actions';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import makeSelectPendingAcceptBankCashList from './selectors';

// import localStore  from 'local-storage';
import localStoreService from 'local-storage';
import * as localStore from 'local-storage';
import { CloudDownload } from '@material-ui/icons';
import moment from 'moment';
import Money from '../App/format';

export function OrdersPendingPayUser(props) {
  useInjectReducer({ key: 'ordersPendingPayUserList', reducer });
  useInjectSaga({ key: 'ordersPendingPayUserList', saga });

  const history = useHistory();

  const currentUser = localStore.get('user') || {};
  const { _id } = currentUser;
  console.log({ currentUser });

  const [orderArr, setOrderArr] = useState([]);
  const [urlImgCloud, setUrlImgCloud] = useState('');

  // const getDataTransactons = async () => {
  //   const requestUrl = urlLink.api.serverUrl + urlLink.api.getBankingCashTransactionList;
  //   try {
  //     const response = await axios.get(requestUrl);

  //     setOrderArr(response.data.data);

  //     console.log({response});
  //   } catch (error) {
  //     console.log({error});
  //     toast.error(
  //       e.response.data.errors[0].errorMessage,
  //       {
  //         position: toast.POSITION.TOP_RIGHT,
  //         autoClose: 3000,
  //         hideProgressBar: false,
  //         pauseOnHover: true,
  //         draggable: true,
  //       },
  //     );
  //   } finally {}
  // }

  // useEffect(() => {
  //   getDataTransactons();
  // }, []);

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
    // const requestUrl =
    //   urlLink.api.serverUrl
    //   + urlLink.api.postExportBillPaidBTransaction
    //   + id;
    const requestUrl =
      urlLink.api.serverUrl +
      urlLink.api.postExportBillRoomPendingPayByOrder +
      id;
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

  const fileInputRef = React.useRef(null);

  const handleIconClick = () => {
    fileInputRef.current.click();
  };
  useEffect(() => {
    props.getPendingAcceptBankingCashList();
  }, [urlImgCloud]);

  // const ordersPendingPayUserList= [];
  const { ordersPendingPayUserList = [] } = props.ordersPendingPayUserList;

  console.log({ ordersPendingPayUserList });

  let transformedData = [];

  if (ordersPendingPayUserList.length !== 0) {
    transformedData = ordersPendingPayUserList.map((item, index) => ({
      key: index + 1, // STT
      nameMotelRoom: item.motel && item.motel.name ? item.motel.name : 'N/A',
      nameRoom: item.job && item.job.room ? item.job.room.name : 'N/A',
      time: moment(new Date(item.createdAt)).format('DD-MM-YYYY'),
      time_expire: moment(new Date(item.expireTime)).format('DD-MM-YYYY'),
      amount_tranform: item.amount ? `${Money(parseInt(item.amount.toFixed(0)))} VNĐ` : 'N/A',
      type_trasaction:
        (item.type === 'monthly')
          ? 'Thanh toán hàng tháng'
          : item.type === 'afterCheckInCost'
            ? 'Thanh toán khi nhận phòng'
            : item.type === 'deposit' ? "Thanh toán cọc"
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
        // eslint-disable-next-line no-underscore-dangle
        id: key,
        formData,
      };
      apiPostImg(data);
    } catch (error) {
      console.log({ error });
    }
  };

  const apiPostImg = async payload => {
    const { id, formData } = payload;
    console.log('formData', formData);
    // eslint-disable-next-line no-useless-concat
    const requestUrl =
      // eslint-disable-next-line no-useless-concat
      `${urlLink.api.serverUrl}/v1/uploading` + `/img/${id}/transaction`;
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
      field: 'time_expire',
      headerName: 'Hạn cuối thanh toán',
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
      headerName: 'Thời gian tạo',
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
      field: 'action-1',
      headerName: 'Xuất hóa đơn',
      headerAlign: 'center',
      width: 200,
      headerClassName: 'header-bold',
      // renderCell: params => (
      //   <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: '5px', alignItems: 'center' }}>
      //     <input
      //       type="file"
      //       ref={fileInputRef}
      //       style={{ display: 'none' }} // Ẩn thẻ input
      //       onChange={evt => {
      //         console.log({ params });
      //         handleFileChange(evt, params.row._id);
      //       }}
      //     />
      //     <CloudDownload
      //       style={{ fontSize: 40, cursor: 'pointer' }} // Kích thước của icon và con trỏ chuột
      //       onClick={handleIconClick}
      //     />
      //   </div>
      // ),
      renderCell: params =>
      // eslint-disable-next-line no-unused-expressions
      (
        <Button
          onClick={() => {
            // eslint-disable-next-line no-underscore-dangle
            downloadFile(params.row._id);
          }}
          color="primary"
        >
          Xuất Hóa Đơn
        </Button>
      )
    },
    {
      field: 'action-2',
      headerName: 'Thanh toán',
      headerAlign: 'center',
      width: 200,
      headerClassName: 'header-bold',
      renderCell: params =>
      // eslint-disable-next-line no-unused-expressions
      (
        <>
          <a
            className="btn-detail"
            onClick={() => {
              console.log();
              history.push(
                `/job-detail/${params.row.job._id}/${params.row.job.room._id}`,
              );
            }}
          >
            Xem chi tiết
          </a>
        </>
      )
    },
  ];

  return (
    <div className="login-page-wrapper">
      <Helmet>
        <title>OrdersPendingPayUser</title>
        <meta
          name="description"
          content="Description of OrdersPendingPayUser"
        />
      </Helmet>
      <div className="title">Danh sách hóa đơn chờ thanh toán</div>
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
    </div>
  );
}

OrdersPendingPayUser.propTypes = {
  dispatch: PropTypes.func,
  changeStoreData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  ordersPendingPayUserList: makeSelectPendingAcceptBankCashList(),
});

function mapDispatchToProps(dispatch) {
  return {
    getPendingAcceptBankingCashList: () => {
      dispatch(getPendingAcceptBankingCashList());
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

export default compose(withConnect)(OrdersPendingPayUser);
// export default TransactionBankingCashLog;
