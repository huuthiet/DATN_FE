/**
 *
 * OrderPay
 *
 */
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
// eslint-disable-next-line import/named
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import localStoreService from 'local-storage';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams } from 'react-router';
import Select from 'react-select';
import { Col, Row } from 'reactstrap';
import PaperWrapper from '../../components/PaperWrapper/Loadable';
import { notificationController } from '../../controller/notificationController';
import { urlLink } from '../../helper/route';
import Money from '../App/format';
import { changeStoreData, getMasterDataBankUser, getOrderPay } from './actions';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import makeSelectOrderPay from './selectors';
import './style.scss';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
    justifyContent: 'center',
    alignItems: 'center',
  },
  large: {
    width: theme.spacing(25),
    height: theme.spacing(25),
  },
  input: {
    display: 'none',
  },
}));

export function OrderPay(props) {
  const classes = useStyles();
  useInjectReducer({ key: 'orderPay', reducer });
  useInjectSaga({ key: 'orderPay', saga });
  const { orderPay, bankUser = [] } = props.orderPay;
  const { id = '' } = useParams();
  const [dataOptions, setDataOptions] = useState('Chọn Ngân Hàng');
  const [urlImgCloud, setUrlImgCloud] = useState(UNC);

  useEffect(() => {
    props.getOrderPay(id);
    props.getMasterDataBankUser();
  }, [urlImgCloud, id]);

  const {
    UNC = '',
    updatedAt = '',
    vnpayStatus = '',
    paymentMethod = '',
    description = '',
    amount = 0,
  } = orderPay;

  const handleFileInputChange = e => {
    const TenMegaBytes = 10 * 1024 * 1024;
    const abcfile = e.target.files[0];
    // check mb file size
    if (abcfile.size <= TenMegaBytes) {
      const formData = new FormData();
      formData.append('file', abcfile);
      try {
        const data = {
          // eslint-disable-next-line no-underscore-dangle
          id,
          formData,
        };
        apiPostImg(data);
      } catch (error) { }
    }
  };
  const apiPostImg = async payload => {
    // eslint-disable-next-line no-shadow
    const { id, formData } = payload;
    // eslint-disable-next-line no-useless-concat
    const requestUrl =
      // eslint-disable-next-line no-useless-concat
      `${urlLink.api.serverUrl}/v1/uploading` + `/img/${id}/order`;
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${localStoreService.get('user').token}`,
      },
    };
    try {
      const response = await axios.post(requestUrl, formData, config);
      if (response.data.data.images) {
        setUrlImgCloud(response.data.data.images.imageUrl);
        notificationController.success('Tải Thành Công');
      }
    } catch (err) {
      console.error(err);
    }
  };
  const [branch, setBranch] = useState('');
  const [label, setLabel] = useState('');
  const [value, setValue] = useState('');
  const [images, setImages] = useState('');
  const [nameTk, setNameTk] = useState('');
  const [stk, setStk] = useState('');

  const handleChangeBank = e => {
    setDataOptions(e.value);
    const bankValue = e.value;
    // eslint-disable-next-line no-plusplus
    for (let k = 0; k < bankUser.length; k++) {
      const item = bankUser[k];
      if (item.value === bankValue) {
        setBranch(item.branch);
        setLabel(item.label);
        setValue(item.value);
        setImages(item.images);
        setNameTk(item.nameTk);
        setStk(item.stk);
      }
    }
  };

  const methodPay = e => {
    if (e === 'internal') {
      return 'Ví nội bộ';
    }
    if (e === 'vnpay') {
      return 'Vnpay';
    }
    if (e === 'cash') {
      return 'Tiền mặt';
    }
    return 'Chưa thanh toán';
  };
  return (
    <div className="user-OrderPay-wrapper container">
      <Helmet>
        <title>OrderPay</title>
        <meta name="description" content="Description of OrderPay" />
      </Helmet>
      <div className="user-OrderPay" style={{ margin: '2.5rem 0' }}>
        <div className="list-motel">
          <PaperWrapper
            className="header-profile-paper"
            style={{ paddingBottom: 0 }}
          >
            <Typography className="header-profile" component="h2" variant="h5">
              <FormattedMessage {...messages.orderPay} />
            </Typography>
            <Row style={{ margin: '2rem 0' }}>
              <Col md={2}>
                <h3>
                  <FormattedMessage {...messages.order} />
                </h3>
                <p>{id}</p>
              </Col>
              <Col md={10}>
                <Row>
                  <Col style={{ margin: '0', padding: '0' }} md={4}>
                    <div className="card">
                      <div className="card-header">
                        <h4> {<FormattedMessage {...messages.orderDay} />}</h4>
                      </div>
                      <div className="card-body">
                        <p>{moment(updatedAt).format('DD/MM/YYYY HH:mm:ss')}</p>
                      </div>
                    </div>
                  </Col>
                  <Col style={{ margin: '0', padding: '0' }} md={4}>
                    <div className="card">
                      <div className="card-header">
                        <h4>
                          {<FormattedMessage {...messages.paymentMethod} />}
                        </h4>
                      </div>
                      <div className="card-body">
                        <p>{methodPay(paymentMethod)}</p>
                      </div>
                    </div>
                  </Col>
                  <Col style={{ margin: '0', padding: '0' }} md={4}>
                    <div className="card">
                      <div className="card-header">
                        <h4>{<FormattedMessage {...messages.uploadUNC} />}</h4>
                      </div>
                      <div className="card-body" style={{ display: 'flex' }}>
                        <div className={classes.root}>
                          <input
                            accept=".png, .jpg"
                            className={classes.input}
                            id="contained-button-file"
                            type="file"
                            onChange={e => {
                              handleFileInputChange(e);
                            }}
                          />
                          <label
                            htmlFor="contained-button-file"
                            style={{ margin: '0px' }}
                          >
                            <Button
                              variant="contained"
                              color="primary"
                              component="span"
                            >
                              {<FormattedMessage {...messages.uploadUNC} />}
                            </Button>
                          </label>
                        </div>
                        {UNC && (
                          <span style={{ padding: '0 10px' }}>
                            <a href={UNC} target="bank">
                              <Button
                                variant="contained"
                                color="primary"
                                component="span"
                              >
                                {<FormattedMessage {...messages.ImageUNC} />}
                              </Button>
                            </a>
                          </span>
                        )}
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </PaperWrapper>
          <PaperWrapper
            className="header-profile-paper"
            style={{ paddingBottom: 0 }}
          >
            <Row style={{ display: 'flex', alignItems: 'center' }}>
              <Col
                sm="3"
                className="input-form-wrapper"
                style={{ textAlign: 'right' }}
              >
                <div className="form-group">Ngân Hàng: </div>
              </Col>
              <Col sm="9">
                <Select
                  key={bankUser}
                  placeholder={dataOptions}
                  value={dataOptions}
                  options={bankUser}
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
                    <div className="form-group">Ngân hàng: </div>
                  </Col>
                  <Col sm="9" style={{ fontWeight: 'bold' }}>
                    {label}
                  </Col>
                </Row>
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
                    <div className="form-group">Số tiền: </div>
                  </Col>
                  <Col sm="9" style={{ fontWeight: 'bold' }}>
                    {Money(amount)}
                  </Col>
                </Row>
                <Row style={{ display: 'flex', alignItems: 'center' }}>
                  <Col
                    sm="3"
                    className="input-form-wrapper"
                    style={{ textAlign: 'right' }}
                  >
                    <div className="form-group">Nội Dung Chuyển Khoản: </div>
                  </Col>
                  <Col sm="9" style={{ fontWeight: 'bold' }}>
                    {id}
                  </Col>
                </Row>
              </>
            )}
          </PaperWrapper>
        </div>
      </div>
    </div>
  );
}

OrderPay.propTypes = {
  dispatch: PropTypes.func,
  changeStoreData: PropTypes.func,
  getOrderPay: PropTypes.func,
  getMasterDataBankUser: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  orderPay: makeSelectOrderPay(),
});

function mapDispatchToProps(dispatch) {
  return {
    getOrderPay: id => {
      dispatch(getOrderPay(id));
    },

    getMasterDataBankUser: () => {
      dispatch(getMasterDataBankUser());
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

export default compose(withConnect)(OrderPay);
