/**
 *
 * TransactionPaymentListHost
 *
 */

import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import SuccessPopup from '../../components/SuccessPopup';
import WarningPopup from '../../components/WarningPopup';
import {
  approveAdminTransactionPayment,
  changeStoreData,
  getTransactionPayMentListHost,
} from './actions';
import reducer from './reducer';
import saga from './saga';
import makeSelectTransactionPaymentListHost from './selectors';
import './style.scss';

export function TransactionPayMentListHost(props) {
  useInjectReducer({ key: 'transactionPaymentListHost', reducer });
  useInjectSaga({ key: 'transactionPaymentListHost', saga });
  const [id, setId] = useState('');
  const [status, setStatus] = useState('');
  useEffect(() => {
    props.getTransactionPayMentListHost();
  }, []);
  const {
    transactionPayment,
    showWarningapprove,
    showSuccessapprove,
  } = props.transactionPaymentListHost;

  console.log({transactionPayment});

  const columns = [
    { field: 'key', headerName: 'STT', headerAlign: 'center', width: 150 },
    {
      field: 'keyPayment',
      headerName: 'Mã Thanh Toán',
      headerAlign: 'center',
      width: 200,
      headerClassName: 'header-bold',
    },
    {
      field: 'paymentMethod',
      headerName: 'Loại Thanh Toán',
      headerAlign: 'center',
      width: 200,
      headerClassName: 'header-bold',
    },
    {
      field: 'phoneNumberFull',
      headerName: 'SĐT',
      headerAlign: 'center',
      width: 200,
      headerClassName: 'header-bold',
    },
    {
      field: 'fullName',
      headerName: 'Tên',
      headerAlign: 'center',
      width: 200,
      headerClassName: 'header-bold',
    },
    {
      field: 'amount',
      headerName: 'Số tiền',
      headerAlign: 'center',
      width: 200,
      headerClassName: 'header-bold',
    },
    {
      field: 'updatedAt',
      headerName: 'Ngày',
      headerAlign: 'center',
      width: 200,
      headerClassName: 'header-bold',
    },
    {
      field: 'description',
      headerName: 'Nội dung thanh toán',
      headerAlign: 'center',
      width: 500,
      headerClassName: 'header-bold',
    },
    {
      field: 'status',
      headerName: 'Trạng Thái',
      headerAlign: 'center',
      width: 200,
      headerClassName: 'header-bold',
    },
    {
      field: 'image',
      headerName: 'Image',
      headerAlign: 'center',
      width: 200,
      headerClassName: 'header-bold',
      // eslint-disable-next-line consistent-return
      renderCell: params => {
        // eslint-disable-next-line no-unused-expressions
        if (params.value) {
          return (
            <a href={params.value} target="bank">
              LINK
            </a>
          );
        }
      },
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
        if (params.value === 'true') {
          return (
            <Button
              color="success"
              onClick={() => {
                /* eslint no-underscore-dangle: 0 */
                // eslint-disable-next-line no-undef
                setId(params.row._id);
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
        if (params.value === 'true') {
          return (
            <Button
              color="danger"
              onClick={() => {
                /* eslint no-underscore-dangle: 0 */
                setId(params.row._id);
                setStatus('cancel');
                props.changeStoreData('showWarningapprove', true);
              }}
            >
              <i className="fa fa-check" aria-hidden="true">
                Không Chấp Nhận
              </i>
            </Button>
          );
        }
        return '';
      },
    },
  ];

  return (
    <div>
      <Helmet>
        <title>Quản lý giao dịch</title>
        <meta
          name="description"
          content="Description of transactionPaymentListHost"
        />
      </Helmet>
      <div className="title">Quản lý giao dịch</div>
      <div
        className="order-list-wrapper container-fulid"
        style={{ margin: '15px' }}
      >
        <div style={{ width: '100%' }}>
          <DataGrid
            getRowId={row => row.key}
            rows={transactionPayment}
            columns={columns}
            pageSize={10}
            autoHeight
            isCellEditable={params => params.key}
          />
        </div>
      </div>
      <WarningPopup
        visible={showWarningapprove}
        content="Bạn thực sự muốn đồng ý chuyển tiền vào tài khoản?"
        callBack={() => props.approveAdminTransactionPayment(id, status)}
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

TransactionPayMentListHost.propTypes = {
  getTransactionPayMentListHost: PropTypes.func,
  transactionPaymentListHost: PropTypes.object,
  changeStoreData: PropTypes.func,
  approveAdminTransactionPayment: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  transactionPaymentListHost: makeSelectTransactionPaymentListHost(),
});

function mapDispatchToProps(dispatch) {
  return {
    getTransactionPayMentListHost: () => {
      dispatch(getTransactionPayMentListHost());
    },
    changeStoreData: (key, value) => {
      dispatch(changeStoreData(key, value));
    },
    approveAdminTransactionPayment: (id, status) => {
      dispatch(approveAdminTransactionPayment(id, status));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(TransactionPayMentListHost);
