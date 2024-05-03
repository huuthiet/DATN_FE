/**
 *
 * Payment
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectPayment from './selectors';
import reducer from './reducer';
import saga from './saga';
import { Container } from 'reactstrap';
import InputForm from '../../components/InputForm';

export function Payment() {
  useInjectReducer({ key: 'payment', reducer });
  useInjectSaga({ key: 'payment', saga });
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const order_id = urlParams.get('order_id') || '',
    amount = urlParams.get('amount') || '',
    order_desc = urlParams.get('order_desc') || '';
  return (
    <div>
      <Helmet>
        <title>Payment</title>
        <meta name="description" content="Description of Payment" />
      </Helmet>
      <Container>
        <form id="create_form" method="post">
          <div className="form-group">
            <label htmlFor="language">Loại hàng hóa </label>
            <select name="order_type" id="order_type" className="form-control">
              <option value="billpayment">Thanh toán hóa đơn</option>
              <option value="topup">Nạp tiền điện thoại</option>
              <option value="fashion">Thời trang</option>
              <option value="other">Khác - Xem thêm tại VNPAY</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="order_id">Mã hóa đơn</label>
            <InputForm name="order_id" value={order_id} readOnly />
          </div>
          <div className="form-group">
            <label htmlFor="amount">Số tiền</label>
            <InputForm name="amount" type="number" value={amount} readOnly />
          </div>
          <div className="form-group">
            <label htmlFor="order_desc">Nội dung thanh toán</label>
            <InputForm
              type="textarea"
              name="order_desc"
              value={order_desc}
              readOnly
            />
          </div>
          <div className="form-group">
            <label htmlFor="bank_code">Ngân hàng</label>
            <select name="bank_code" id="bank_code" className="form-control">
              <option value="">Không chọn</option>
              <option value="NCB"> Ngan hang NCB</option>
              <option value="AGRIBANK"> Ngan hang Agribank</option>
              <option value="SCB"> Ngan hang SCB</option>
              <option value="SACOMBANK">Ngan hang SacomBank</option>
              <option value="EXIMBANK"> Ngan hang EximBank</option>
              <option value="MSBANK"> Ngan hang MSBANK</option>
              <option value="NAMABANK"> Ngan hang NamABank</option>
              <option value="VNMART"> Vi dien tu VnMart</option>
              <option value="VIETINBANK">Ngan hang Vietinbank</option>
              <option value="VIETCOMBANK"> Ngan hang VCB</option>
              <option value="HDBANK">Ngan hang HDBank</option>
              <option value="DONGABANK"> Ngan hang Dong A</option>
              <option value="TPBANK"> Ngân hàng TPBank</option>
              <option value="OJB"> Ngân hàng OceanBank</option>
              <option value="BIDV"> Ngân hàng BIDV</option>
              <option value="TECHCOMBANK"> Ngân hàng Techcombank</option>
              <option value="VPBANK"> Ngan hang VPBank</option>
              <option value="MBBANK"> Ngan hang MBBank</option>
              <option value="ACB"> Ngan hang ACB</option>
              <option value="OCB"> Ngan hang OCB</option>
              <option value="IVB"> Ngan hang IVB</option>
              <option value="VISA"> Thanh toan qua VISA/MASTER</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="language">Ngôn ngữ</label>
            <select name="language" id="language" className="form-control">
              <option value="vn">Tiếng Việt</option>
              <option value="en">English</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary" id="btnPopup">
            Thanh toán
          </button>
        </form>
      </Container>
    </div>
  );
}

Payment.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  payment: makeSelectPayment(),
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

export default compose(withConnect)(Payment);
