/**
 *
 * TransactionPaymentList
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
  getTransactionPayMentList,
} from './actions';
import reducer from './reducer';
import saga from './saga';
import makeSelectTransactionPaymentList from './selectors';
import './style.scss';



export function TransactionPayMentList(props) {
  useInjectReducer({ key: 'transactionPaymentList', reducer });
  useInjectSaga({ key: 'transactionPaymentList', saga });
  const [id, setId] = useState('');

  const [status, setStatus] = useState('');
  useEffect(() => {
    props.getTransactionPayMentList();
  }, []);
  const {
    transactionPayment,
    showWarningapprove,
    showSuccessapprove,
  } = props.transactionPaymentList;

  const columns = [
    { field: 'key', headerName: 'STT', headerAlign: 'center', width: 150 },
    {
      field: 'keyPayment',
      headerName: 'Mã thanh toán',
      headerAlign: 'center',
      width: 200,
      headerClassName: 'header-bold',
    },
    {
      field: 'paymentMethod',
      headerName: 'Phương thức thanh toán',
      headerAlign: 'center',
      width: 280,
      headerClassName: 'header-bold',
    },
    {
      field: 'phoneNumberFull',
      headerName: 'Số điện thoại',
      headerAlign: 'center',
      width: 220,
      headerClassName: 'header-bold',
    },
    {
      field: 'fullName',
      headerName: 'Tên',
      headerAlign: 'center',
      width: 300,
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
      headerName: 'Trạng thái',
      headerAlign: 'center',
      width: 200,
      headerClassName: 'header-bold',
      renderCell: (params) => {
        const status = params.value;
        let color = '';
        let background = '';
        let width = '';
        let borderRadius = '20px';

        switch (status) {
          case 'success':
            color = '#56AD1F';
            width = '120px';
            break;
          case 'waiting':
            color = '#C9CF1A';
            width = '120px';
            break;
          case 'cancel':
            color = '#FF0000';
            width = '120px';
            break;
          default:
            color = 'black';
            break;
        }

        return <span style=
          {{
            color: color,
            background: background,
            width: width,
            borderRadius: borderRadius,
            padding: '2px auto',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textTransform: 'capitalize',
          }}>{status}</span>;
      },
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
      headerName: 'Thao tác',
      headerAlign: 'center',
      width: 300,
      headerClassName: 'header-bold',
      // eslint-disable-next-line consistent-return
      renderCell: params => {
        // eslint-disable-next-line no-unused-expressions
        if (params.value === 'true') {
          return (
            <div className='button-container'>
              <Button
                className='btn-cancel'
                color="danger"
                onClick={() => {
                  /* eslint no-underscore-dangle: 0 */
                  setId(params.row._id);
                  setStatus('cancel');
                  props.changeStoreData('showWarningapprove', true);
                }}
              >
                Từ chối
              </Button>
              <Button
                color="success"
                className='btn-accept'
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
                Chấp nhận
              </Button>
            </div>
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
          content="Description of transactionPaymentList"
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
            setId={setId}
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

TransactionPayMentList.propTypes = {
  getTransactionPayMentList: PropTypes.func,
  transactionPaymentList: PropTypes.object,
  changeStoreData: PropTypes.func,
  approveAdminTransactionPayment: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  transactionPaymentList: makeSelectTransactionPaymentList(),
});

function mapDispatchToProps(dispatch) {
  return {
    getTransactionPayMentList: () => {
      dispatch(getTransactionPayMentList());
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

export default compose(withConnect)(TransactionPayMentList);
