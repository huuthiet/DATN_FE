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
  approveAdminRequestWithdraw,
  changeStoreData,
  getRequestWithdrawList,
} from './actions';
import reducer from './reducer';
import saga from './saga';
import makeSelectRequestWithdrawList from './selectors';
import './style.scss';

export function RequestWithdrawList(props) {
  useInjectReducer({ key: 'requestWithdrawList', reducer });
  useInjectSaga({ key: 'requestWithdrawList', saga });
  const [id, setId] = useState('');
  const [status, setStatus] = useState('');
  useEffect(() => {
    props.getRequestWithdrawList();
  }, []);
  const {
    requestWithdraw,
    showWarningapprove,
    showSuccessapprove,
  } = props.requestWithdrawList;

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
      width: 300,
      headerClassName: 'header-bold',
    },
    {
      field: 'paymentInfor',
      headerName: 'Tài khoản nhận tiền',
      headerAlign: 'center',
      width: 400,
      headerClassName: 'header-bold',
      renderCell: params => (
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '4px 0',
            // alignItems: 'center',
            height: '175px',
            overflow: 'auto',
            lineHeight: '0.75',
          }}
        >
          <br />
          <p>
            <strong>Ngân hàng:</strong>
          </p>
          <p>{params.row.paymentInfor[0]}</p>
          <p>
            <strong>Chi nhánh: </strong>
            {params.row.paymentInfor[1]}
          </p>
          <p>
            <strong>Chủ tài khoản: </strong>
            {params.row.paymentInfor[2]}
          </p>
          <p>
            <strong>Số tài khoản: </strong>
            {params.row.paymentInfor[3]}
          </p>
        </div>
      ),
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
                className='btn-accept'
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
                Xác nhận
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
        <title>Quản lý yêu cầu rút tiền</title>
        <meta name="description" content="Description of requestWithdrawList" />
      </Helmet>
      <div className="title-abc">Quản lý yêu cầu rút tiền</div>
      <div
        className="order-list-wrapper container-fulid"
        style={{ margin: '15px' }}
      >
        <div style={{ width: '100%' }}>
          <DataGrid
            getRowId={row => row.key}
            rows={requestWithdraw}
            columns={columns}
            pageSize={10}
            autoHeight
            isCellEditable={params => params.key}
            rowHeight={150}
          />
        </div>
      </div>
      <WarningPopup
        visible={showWarningapprove}
        content="Xác nhận bạn đã chuyển tiền vào tài khoản này?"
        callBack={() => props.approveAdminRequestWithdraw(id, status)}
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

RequestWithdrawList.propTypes = {
  getRequestWithdrawList: PropTypes.func,
  requestWithdrawList: PropTypes.object,
  changeStoreData: PropTypes.func,
  approveAdminRequestWithdraw: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  requestWithdrawList: makeSelectRequestWithdrawList(),
});

function mapDispatchToProps(dispatch) {
  return {
    getRequestWithdrawList: () => {
      dispatch(getRequestWithdrawList());
    },
    changeStoreData: (key, value) => {
      dispatch(changeStoreData(key, value));
    },
    approveAdminRequestWithdraw: (id, status) => {
      dispatch(approveAdminRequestWithdraw(id, status));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(RequestWithdrawList);
