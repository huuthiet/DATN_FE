/**
 *
 * Withdraw
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import Select from 'react-select';

import { Col, Row, Alert, Button } from 'reactstrap';

import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@material-ui/core';

import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import { FormattedMessage } from 'react-intl';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import makeSelectProfile from './selectors';
import { getProfile, getUserBank, postRequestWithdrawUser } from './actions';

import Money from '../../helper/format';

import PaperWrapper from '../../components/PaperWrapper/Loadable';
import InputForm from '../../components/InputForm';
import messages from './messages';
import { isNumber } from 'lodash';

const Withdraw = props => {
  useInjectReducer({ key: 'profile', reducer });
  useInjectSaga({ key: 'profile', saga });

  const servicePercent = 0.002; // 0.2%
  const minValue = 10000; // 10.000 VND
  const defaultValue = 1000; // 1.000 VND
  const [amount, setAmount] = useState(defaultValue);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showcontentBank, setShowScontentBank] = useState(false);
  const [contentBank, setcontentBank] = useState('');
  const [checkWalletChange, setCheckWalletChange] = useState(true);
  const [dataOptions, setDataOptions] = useState('Chọn Ngân Hàng Nhận Tiền');
  const [branch, setBranch] = useState('');

  const [label, setLabel] = useState('');
  const [value, setValue] = useState('');
  const [images, setImages] = useState('');

  const [nameTkLable, setNameTkLable] = useState('');

  const [nameTk, setNameTk] = useState('');
  const [stk, setStk] = useState('');

  let MaThanhToan = '';

  const { profile = {}, banks = [] } = props.profile;

  const [currentWallet, setCurrentWallet] = useState(profile.wallet);
  const [phoneNumberFull, setPhoneNumberFull] = useState(
    profile.phoneNumberFull,
  );

  const getRandomInt = (min, max) =>
    Math.floor(Math.random() * (max - min)) + min;
  const getRandomString = (length, base) => {
    let result = '';
    const baseLength = base.length;

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < length; i++) {
      const randomIndex = getRandomInt(0, baseLength);
      result += base[randomIndex];
    }
    return result;
  };
  const getRandomHex2 = () => {
    const baseString = '0123456789ABCDEF';
    const ma = `${getRandomString(8, baseString)}`;
    MaThanhToan = ma;
    return ma;
  };

  const handleChangeBank = e => {
    setDataOptions(e.value);
    const bankValue = e.value;
    // eslint-disable-next-line no-plusplus

    for (let k = 0; k < banks.length; k++) {
      const item = banks[k];
      if (item._id === bankValue) {
        setDataOptions(item.nameTkLable);
        setNameTkLable(item.nameTkLable);

        setBranch(item.branch);

        setLabel(item.nameTkLable);

        setValue(item.bank);

        setImages(item.images);

        setNameTk(item.nameTk);

        setStk(item.stk);
      }
    }
  };

  const renderBankOptions = () => {
    if (!Array.isArray(banks)) {
      return [];
    }
    return banks.map(item => ({
      value: item._id,
      label: item.nameTkLable,
    }));
  };
  const options = renderBankOptions();

  const handleWithdrawmoney = () => {
    setCheckWalletChange(!checkWalletChange);
    if (dataOptions === 'Chọn Ngân Hàng') {
      setShowScontentBank(true);
      setcontentBank('Vui Lòng Chọn Ngân Hàng');
      return false;
    }
    if (amount < minValue) {
      setcontentBank('Vui Lòng Nhập Số Tiền Trên 10.000 VND');
      setShowScontentBank(true);
      return false;
    }
    if (amount > currentWallet) {
      setcontentBank('Vui Lòng Nhập Số Tiền Không Lớn Hơn Số Tiền Hiện Tại');
      setShowScontentBank(true);
      return false;
    }
    setShowScontentBank(false);
    return true;
  };

  useEffect(() => {
    props.getProfile();
  }, [checkWalletChange]);

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    props.getUserBank();
  }, []);

  useEffect(() => {
    const result = amount + Math.round(parseFloat(amount * servicePercent));
    console.log({ result });
    setTotalAmount(result);
    // if (isNumber(amount) && amount > 0) {
    //   const result = parseFloat(amount * serviceCharge) + parseFloat(amount);
    //   console.log({ result });
    //   setTotalAmount(Math.round(result));
    // } else {
    //   setTotalAmount(0);
    // }
  }, [amount]);

  return (
    <div className="withdraw-wrapper container">
      <Helmet>
        <title>Withdraw</title>
        <meta name="description" content="Description of Withdraw" />
      </Helmet>
      <div className="withdraw">
        <PaperWrapper style={{ paddingBottom: 0 }}>
          <Typography component="h1" variant="h5">
            <FormattedMessage {...messages.withdraw} />
          </Typography>
          <Row style={{ justifyContent: 'center', alignItems: 'center' }}>
            {showcontentBank && <Alert color="danger">{contentBank}</Alert>}
          </Row>
          <Row style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Col sm="9">
              <Select
                key={options}
                placeholder={dataOptions}
                value={dataOptions.bank}
                // dataOptions
                options={options}
                className="mb-3 "
                onChange={e => {
                  handleChangeBank(e);
                }}
              />
            </Col>
          </Row>
          {stk && (
            <>
              <Row style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Col sm="4" />
                <Col sm="8">
                  <Row style={{ display: 'flex', alignItems: 'center' }}>
                    <Col
                      sm="3"
                      className="input-form-wrapper"
                      style={{ textAlign: 'right' }}
                    >
                      <div className="form-group">STK nhận: </div>
                    </Col>
                    <Col sm="9" style={{ fontWeight: 'bold' }}>
                      {stk}
                    </Col>
                  </Row>
                  <Row style={{ display: 'flex', alignItems: 'center' }}>
                    <Col
                      sm="3"
                      className="input-form-wrapper"
                      style={{ textAlign: 'right' }}
                    >
                      <div className="form-group">Tên tài khoản: </div>
                    </Col>
                    <Col sm="9" style={{ fontWeight: 'bold' }}>
                      {nameTk}
                    </Col>
                  </Row>
                  <Row style={{ display: 'flex', alignItems: 'center' }}>
                    <Col
                      sm="3"
                      className="input-form-wrapper"
                      style={{ textAlign: 'right' }}
                    >
                      <div className="form-group">Chi nhánh: </div>
                    </Col>
                    <Col sm="9" style={{ fontWeight: 'bold' }}>
                      {branch}
                    </Col>
                  </Row>
                  <Row style={{ display: 'flex', alignItems: 'center' }}>
                    <Col
                      sm="3"
                      className="input-form-wrapper"
                      style={{ textAlign: 'right' }}
                    >
                      <div className="form-group">Nội dung chuyển khoản: </div>
                    </Col>
                    <Col sm="9" style={{ fontWeight: 'bold' }}>
                      {getRandomHex2()}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </>
          )}
          <Row style={{ justifyContent: 'center', alignItems: 'center' }}>
            <List>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <AccountBalanceWalletIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText secondary={Money(Number(profile.wallet))} />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem>
                <FormattedMessage {...messages.amount} />
                <InputForm
                  placeholder="Số Tiền"
                  icon="fa fa-money"
                  value={amount}
                  onChange={evt => {
                    setAmount(+evt.target.value);
                  }}
                />
              </ListItem>
              <ListItem
                style={{ display: 'flex', alignItems: 'center', gap: 5 }}
              >
                <div>Phí dịch vụ: </div>
                <div style={{ fontSize: '16px' }}>
                  {Money(Math.round(parseFloat(amount * servicePercent)))}(0.2%)
                </div>
              </ListItem>
              <ListItem
                style={{ display: 'flex', alignItems: 'center', gap: 5 }}
              >
                <div>Tổng số tiền rút: </div>
                <div style={{ fontSize: '16px' }}>{Money(totalAmount)}</div>
              </ListItem>

              <Button
                color="primary"
                className="btn-block mt-3"
                onClick={() => {
                  const check = handleWithdrawmoney();
                  const data = {
                    keyPayment: MaThanhToan,
                    amount: totalAmount,
                    type: 'banking',
                    stk,
                    branch,
                    nameTkLable,
                    nameTk,
                    phoneNumberFull,
                  };
                  if (check) {
                    console.log({ data });
                    props.postRequestWithdrawUser(data);
                  }
                }}
              >
                <FormattedMessage {...messages.withdraw} />
              </Button>
            </List>
          </Row>
        </PaperWrapper>
      </div>
    </div>
  );
};

Withdraw.propTypes = {
  dispatch: PropTypes.func,
  getUserBank: PropTypes.func,
  postRequestWithdrawUser: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  profile: makeSelectProfile(),
});

function mapDispatchToProps(dispatch) {
  return {
    getProfile: () => {
      dispatch(getProfile());
    },
    getUserBank: data => {
      dispatch(getUserBank(data));
    },
    postRequestWithdrawUser: data => {
      dispatch(postRequestWithdrawUser(data));
    },
  };
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Withdraw);

Withdraw.propTypes = {
  profile: PropTypes.object,
  getProfile: PropTypes.func,
  getUserBank: PropTypes.func,
  postRequestWithdrawUser: PropTypes.func,
};
