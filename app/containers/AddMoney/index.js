/**
 *
 * Payment
 *
 */

import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import classnames from 'classnames';
import {
  Alert,
  Button,
  Card,
  CardTitle,
  Col,
  Container,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from 'reactstrap';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import InputForm from '../../components/InputForm';
import Money from '../App/format';
import reducer from './reducer';
import saga from './saga';
import makeSelectAddMoney from './selectors';
import './style.scss';

import Select from 'react-select';
import {
  changeStoreData,
  getMasterDataBankUser,
  postPaymentUser,
} from './actions';

export function AddMoney(props) {
  useInjectReducer({ key: 'addMoney', reducer });
  useInjectSaga({ key: 'addMoney', saga });

  const [activeTab, setActiveTab] = useState('1');
  const [amount, setAmount] = useState(1000);

  const { bankUser = [] } = props.addMoney;
  let bankUserOptions = [];

  if (Array.isArray(bankUser))
    bankUserOptions = bankUser.map(item => ({
      ...item,
      key: item._id,
      label: item.nameTkLable,
      value: item.bank,
    }));

  console.log(bankUserOptions);

  const [dataOptions, setDataOptions] = useState('Chọn ngân hàng');

  const [branch, setBranch] = useState('');
  const [label, setLabel] = useState('');
  const [value, setValue] = useState('');
  const [images, setImages] = useState('');
  const [nameTk, setNameTk] = useState('');
  const [stk, setStk] = useState('');
  const [contentBank, setScontentBank] = useState('');
  const [showcontentBank, setShowScontentBank] = useState(false);
  const [minValue, setMinValue] = useState(10000);
  let MaThanhToan = '';

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    props.getMasterDataBankUser();
  }, []);

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
  // eslint-disable-next-line no-shadow
  const handleAddmoney = value => {
    if (dataOptions === 'Chọn ngân hàng') {
      setShowScontentBank(true);
      setScontentBank('Vui lòng chọn ngân hàng');
    } else if (amount < minValue) {
      setShowScontentBank(true);
      setScontentBank('Vui lòng nhập số tiền lớn hơn 10.000 VND');
    } else {
      toggle(value);
    }
  };

  const handleFromatMoney = value => {
    setAmount(value);
  };
  const toggle = tab => {
    setShowScontentBank(false);
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const handleChangeBank = e => {
    setDataOptions(e.value);
    const bankValue = e.value;
    // eslint-disable-next-line no-plusplus
    for (let k = 0; k < bankUserOptions.length; k++) {
      const item = bankUserOptions[k];
      if (item.value === bankValue) {
        setBranch(item.branch);
        setLabel(item.nameTkLable);
        setValue(item.bank);
        setImages(item.images);
        setNameTk(item.nameTk);
        setStk(item.stk);
      }
    }
  };
  return (
    <div>
      <Helmet>
        <title>AddMoney</title>
        <meta name="description" content="Description of AddMoney" />
      </Helmet>
      <Container>
        <div>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({
                  active: activeTab === '1' || activeTab === '3',
                })}
                onClick={() => {
                  toggle('1');
                }}
              >
                Chuyển khoản
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: activeTab === '2' || activeTab === '4',
                })}
                onClick={() => {
                  toggle('2');
                }}
              >
                Ví điện tử
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <Row>
                <Col sm="12">
                  <Card body>
                    <CardTitle>Chuyển tiền bằng tài khoản ngân hàng</CardTitle>
                    {showcontentBank && (
                      <Alert color="danger">{contentBank}</Alert>
                    )}
                    <Row style={{ display: 'flex', alignItems: 'center' }}>
                      <Col
                        sm="3"
                        className="input-form-wrapper"
                        style={{ textAlign: 'right' }}
                      >
                        <div className="form-group">Ngân hàng: </div>
                      </Col>
                      <Col sm="9">
                        <Select
                          key={bankUserOptions}
                          placeholder={dataOptions}
                          value={dataOptions}
                          options={bankUserOptions}
                          className="mb-3"
                          onChange={e => {
                            handleChangeBank(e);
                          }}
                        />
                      </Col>
                    </Row>
                    {stk && (
                      <>
                        <Row style={{ display: 'flex', alignItems: 'center' }}>
                          <Col
                            sm="3"
                            className="input-form-wrapper"
                            style={{ textAlign: 'right' }}
                          >
                            <div className="form-group">Số tài khoản nhận: </div>
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
                      </>
                    )}

                    <Row style={{ display: 'flex', alignItems: 'center' }}>
                      <Col
                        sm="3"
                        className="input-form-wrapper"
                        style={{ textAlign: 'right' }}
                      >
                        <div className="form-group">Số tiền (VND): </div>
                      </Col>
                      <Col sm="9">
                        <InputForm
                          placeholder="Số Tiền"
                          icon="fa fa-money"
                          value={amount}
                          onChange={evt => {
                            handleFromatMoney(evt.target.value);
                          }}
                        // onBlur={() => {
                        //   setAmount(MoneyVND(amount));
                        // }}
                        />
                      </Col>
                    </Row>
                    <Button
                      color="primary"
                      className="btn-block mt-3"
                      onClick={() => {
                        handleAddmoney('3');
                      }}
                    >
                      Nạp tiền
                    </Button>
                  </Card>
                </Col>
              </Row>
            </TabPane>
            {/* Chuyển Khoản QR */}
            <TabPane tabId="2">
              <Row>
                <Col sm="12">
                  <Card body>
                    <CardTitle>Chuyển tiền bằng ví điện tử</CardTitle>
                    <InputForm
                      placeholder="Số Tiền"
                      icon="fa fa-money"
                      value={amount}
                      onChange={evt => {
                        handleFromatMoney(evt.target.value);
                      }}
                    />
                    <Button
                      color="success"
                      className="btn-block mt-3"
                      onClick={() => {
                        toggle('4');
                      }}
                    >
                      Nạp tiền
                    </Button>
                  </Card>
                </Col>
              </Row>
            </TabPane>
            {/* Nội Dung Chuyển Khoản */}
            <TabPane tabId="3">
              <Row>
                <Col sm="12">
                  <Card body>
                    <CardTitle>Thông tin chuyển khoản ngân hàng</CardTitle>
                    <Row>
                      {/* <Col sm="5">
                        <div
                          className="img"
                          style={{ width: '100%', height: '350px' }}
                        >
                          <img
                            style={{ width: '100%', height: '100%' }}
                            src={images}
                            alt="language"
                          />
                        </div>
                      </Col> */}
                      <Col sm="2"></Col>
                      <Col sm="8">
                        <Row className="row-row">
                          <Col sm="4">Ngân hàng: </Col>
                          <Col sm="8" style={{ fontWeight: 'bold' }}>
                            {label}
                          </Col>
                        </Row>
                        <Row className="row-row">
                          <Col sm="4">Số tài khoản nhận: </Col>
                          <Col sm="8" style={{ fontWeight: 'bold' }}>
                            {stk}
                          </Col>
                        </Row>
                        <Row className="row-row">
                          <Col sm="4">Tên tài khoản: </Col>
                          <Col sm="8" style={{ fontWeight: 'bold' }}>
                            {nameTk}
                          </Col>
                        </Row>
                        <Row className="row-row">
                          <Col sm="4">Chi nhánh: </Col>
                          <Col sm="8" style={{ fontWeight: 'bold' }}>
                            {branch}
                          </Col>
                        </Row>
                        <Row className="row-row">
                          <Col sm="4">Số tiền: </Col>
                          <Col sm="8" style={{ fontWeight: 'bold' }}>
                            {Money(amount)} VND
                          </Col>
                        </Row>
                        <Row className="row-row">
                          <Col sm="4">Nội dung chuyển khoản: </Col>
                          <Col sm="8" style={{ fontWeight: 'bold' }}>
                            {getRandomHex2()}
                          </Col>
                        </Row>
                      </Col>
                      <Col sm="2"></Col>
                    </Row>
                    <Button
                      color="success"
                      className="btn-block mt-3"
                      onClick={() => {
                        const data = {
                          keyPayment: MaThanhToan,
                          amount,
                          type: 'banking',
                        };
                        props.postPaymentUser(data);
                      }}
                    >
                      Nạp tiền
                    </Button>
                  </Card>
                </Col>
              </Row>
            </TabPane>
            {/* Nội Dung Ví Điện TỬ */}
            <TabPane tabId="4">
              <Row>
                <Col sm="12">
                  <Card body>
                    <CardTitle>Thông tin ví điện tử</CardTitle>
                    <Row>
                      <Col sm="5">
                        <div
                          className="img"
                          style={{ width: '100%', height: '350px' }}
                        >
                          <img
                            style={{ width: '100%', height: '100%' }}
                            src={images}
                            alt="language"
                          />
                        </div>
                      </Col>
                      <Col sm="7">
                        <Row className="row-row">
                          <Col sm="4">Số tiền: </Col>
                          <Col sm="8" style={{ fontWeight: 'bold' }}>
                            {Money(amount)} VND
                          </Col>
                        </Row>
                        <Row className="row-row">
                          <Col sm="4">Nội dung chuyển khoản: </Col>
                          <Col sm="8" style={{ fontWeight: 'bold' }}>
                            {getRandomHex2()}
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    {/* <Button
                      color="success"
                      className="btn-block mt-3"
                      onClick={() => {
                        const data = {
                          keyPayment: MaThanhToan,
                          amount,
                          type: 'banking',
                        };
                        props.postPaymentUser(data);
                      }}
                    >
                      Đã Nạp Tiền
                    </Button> */}
                  </Card>
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </div>
      </Container>
    </div>
  );
}

AddMoney.propTypes = {
  dispatch: PropTypes.func,
  getMasterDataBankUser: PropTypes.func,
  postPaymentUser: PropTypes.func,
  changeStoreData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  addMoney: makeSelectAddMoney(),
});

function mapDispatchToProps(dispatch) {
  return {
    changeStoreData: (key, value) => {
      dispatch(changeStoreData(key, value));
    },
    getMasterDataBankUser: data => {
      dispatch(getMasterDataBankUser(data));
    },
    postPaymentUser: data => {
      dispatch(postPaymentUser(data));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(AddMoney);
