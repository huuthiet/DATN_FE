/**
 *
 * PaymentReturn
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
// import { useParams } from 'react-router-dom';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectPaymentReturn from './selectors';
import reducer from './reducer';
import saga from './saga';

export function PaymentReturn(props) {
  useInjectReducer({ key: 'paymentReturn', reducer });
  useInjectSaga({ key: 'paymentReturn', saga });
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const order_id = urlParams.get('order_id') || '',
    amount = urlParams.get('amount') || '',
    order_desc = urlParams.get('order_desc') || '',
    vnp_TransactionNo = urlParams.get('vnp_TransactionNo') || '',
    vnp_ResponseCode = urlParams.get('vnp_ResponseCode') || '',
    msg = urlParams.get('msg') || '';
  return (
    <div>
      <Helmet>
        <title>PaymentReturn</title>
        <meta name="description" content="Description of PaymentReturn" />
      </Helmet>
      <div className="panel-body">
        <p>order_id:{order_id}</p>
        <p>amount:{amount}</p>
        <p>order_desc:{order_desc}</p>
        <p>vnp_TransactionNo:{vnp_TransactionNo}</p>
        {vnp_ResponseCode === '00' ? (
          <p>vnp_ResponseCode: {vnp_ResponseCode} - Thành công</p>
        ) : (
          <p>vnp_ResponseCode: {vnp_ResponseCode} - Lỗi</p>
        )}
        {msg && <p className="alert-warning"> {msg}</p>}
      </div>
    </div>
  );
}

PaymentReturn.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  paymentReturn: makeSelectPaymentReturn(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(PaymentReturn);
