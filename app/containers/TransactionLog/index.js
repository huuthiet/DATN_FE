/**
 *
 * CTransantionLog
 *
 */
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from 'reactstrap';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { getGetOrder } from './actions';
import reducer from './reducer';
import saga from './saga';
import makeSelectTransantionLog from './selectors';
import './style.scss';

import localStore from 'local-storage';
import { CloudUpload } from '@material-ui/icons';

export function TransantionLog(props) {
  useInjectReducer({ key: 'transantionLog', reducer });
  useInjectSaga({ key: 'transantionLog', saga });
  const history = useHistory();
  const { OrderArr = [], OrderArrNone } = props.transantionLog;
  const currentUser = localStore.get('user') || {};
  const { _id } = currentUser;
  useEffect(() => {
    props.getGetOrder(_id);
  }, []);

  const columns = [
    { field: 'key', headerName: 'STT', headerAlign: 'center', width: 150 },
    {
      field: 'amount',
      headerName: 'Số tiền',
      headerAlign: 'center',
      width: 150,
      headerClassName: 'header-bold',
    },
    {
      field: 'paymentMethod',
      headerName: 'Phương thức thanh toán',
      headerAlign: 'center',
      width: 300,
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
      headerName: 'Tên chủ trọ',
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
    },
    {
      field: 'paymentDate',
      headerName: 'Ngày thanh toán',
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
      field: 'type',
      headerName: 'Nội dung thanh toán',
      headerAlign: 'center',
      width: 400,
      headerClassName: 'header-bold',
    },
    {
      field: 'action',
      headerName: 'Sự kiện',
      headerAlign: 'center',
      width: 400,
      headerClassName: 'header-bold',
      renderCell: params => (
        // eslint-disable-next-line no-unused-expressions
        <>
          <button
            className='btn-unc'
            color="primary"
            onClick={() => {
              history.push(`/order-pay/${params.row._id}`);
            }}
          >
            <CloudUpload className='upload-icon' />
            UNC
          </button>
          {/* <Button
              style={{ margin: '0 20px' }}
              color="primary"
              onClick={() => {
                history.push(`/job-detail/${params.row.job}`);
              }}
            >
              Edit
            </Button> */}
          <div
            style={{ margin: '0 20px' }}
            className="edit-button"
            onClick={() => {
              history.push(`/job-detail/${params.row.job}`);
            }}
          >
            <img src="/edit.png" />
          </div>
        </>
      ),
    },
  ];
  const columnNonePayment = [
    { field: 'key', headerName: 'STT', headerAlign: 'center', width: 150 },
    {
      field: 'amount',
      headerName: 'Số tiền',
      headerAlign: 'center',
      width: 150,
      headerClassName: 'header-bold',
    },
    {
      field: 'paymentMethod',
      headerName: 'Phương thức thanh toán',
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
    },
    {
      field: 'nameMotelRoom',
      headerName: 'Tên Khu Trọ',
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
    },
    {
      field: 'nameRoom',
      headerName: 'Tên Trọ',
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
    },
    {
      field: 'paymentDate',
      headerName: 'Ngày Thanh Toán',
      headerAlign: 'center',
      width: 250,
      headerClassName: 'header-bold',
    },
    {
      field: 'description',
      headerName: 'Ghi Chú',
      headerAlign: 'center',
      width: 400,
      headerClassName: 'header-bold',
    },
    {
      field: 'type',
      headerName: 'Nội Dung Thanh Toán',
      headerAlign: 'center',
      width: 400,
      headerClassName: 'header-bold',
    },
    {
      field: 'action',
      headerName: 'Sự Kiện',
      headerAlign: 'center',
      width: 400,
      headerClassName: 'header-bold',
      renderCell: params => (
        // eslint-disable-next-line no-unused-expressions
        <>
          <Button
            color="primary"
            onClick={() => {
              history.push(`/order-pay/${params.row._id}`);
            }}
          >
            UNC
          </Button>
          {/* <Button
              style={{ margin: '0 20px' }}
              color="primary"
              onClick={() => {
                history.push(`/job-detail/${params.row.job}`);
              }}
            >
              Edit
            </Button> */}
          <div
            style={{ margin: '0 20px' }}
            className="edit-button"
            onClick={() => {
              history.push(`/job-detail/${params.row.job}`);
            }}
          >
            <img src="/edit.png" />
          </div>
        </>
      ),
    },
  ];
  return (
    <div className="login-page-wrapper">
      <Helmet>
        <title>TransantionLog</title>
        <meta name="description" content="Description of TransantionLog" />
      </Helmet>
      <div className="title">Nhật ký giao dịch</div>
      <div className="job-list-wrapper container-fluid">
        <div style={{ width: '100%' }}>
          <DataGrid
            getRowId={row => row.key}
            rows={OrderArr}
            columns={columns}
            pageSize={10}
            autoHeight
          // isCellEditable={params => params.key}
          />
        </div>
      </div>

      {/* <div className="title">Nhật Ký Chưa Thanh Toán</div>
      <div className="job-list-wrapper container-fluid">
        <div style={{ width: '100%' }}>
          <DataGrid
            getRowId={row => row.key}
            rows={OrderArrNone}
            columns={columnNonePayment}
            pageSize={10}
            autoHeight
            isCellEditable={params => params.key}
          />
        </div>
      </div> */}
    </div>
  );
}

TransantionLog.propTypes = {
  getGetOrder: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  transantionLog: makeSelectTransantionLog(),
});

function mapDispatchToProps(dispatch) {
  return {
    getGetOrder: _id => {
      dispatch(getGetOrder(_id));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(TransantionLog);
