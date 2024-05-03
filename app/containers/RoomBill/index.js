/**
 *
 * RoomBill
 *
 */
import { Typography } from '@material-ui/core';
import { Button, Col, Container, Row, Alert } from 'reactstrap';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import InputForm from '../../components/InputForm';
import PaperWrapper from '../../components/PaperWrapper/Loadable';
import {
  getListRoomUser,
  postExportBill,
  updateTotalElectricity,
} from './actions';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import makeSelectRoomBill from './selectors';
import './style.scss';
import { urlLink } from '../../helper/route';
import * as fileDownload from 'js-file-download';
import axios from 'axios';
import localStoreService from 'local-storage';
import { useHistory } from 'react-router-dom';
import { notificationController } from '../../controller/notificationController';
import moment from 'moment';

export function RoomBill(props) {
  const [totalkWhMon, setTotalkWhMon] = useState(1);
  const [totalAndTaxAllState, setTotalAndTaxAllState] = useState(1);
  const history = useHistory();
  const { id, idroom, idUser } = useParams();
  useInjectReducer({ key: 'roomBill', reducer });
  useInjectSaga({ key: 'roomBill', saga });
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    const payload = {
      id,
      idroom,
      idUser,
    };
    props.getListRoomUser(payload);
  }, [flag]);

  console.log(props.roomBill);

  const { billData = {}, fileSuccess = {} } = props.roomBill;
  const validateForm = Yup.object().shape({
    expenseRoom: Yup.string().required('Vui lòng nhập mã xác nhận'),
  });

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
    const baseString =
      '0123456789QƯERTYUIOPASDFGHJKLZXCVBNMqưertyuiopasdfghjklzxcvbnm';
    const ma = `${getRandomString(12, baseString)}`;
    return ma;
  };
  const {
    idBill = '',
    dateBill = '',
    nameMotel = '',
    nameRoom = '',
    nameUser = '',
    phoneUser = '',
    address = '',
    imgRoom = '',
    emailOwner = '',
    totalAll = 0,
    totalAndTaxAll = 0,
    totalTaxAll = 0,
    typeTaxAll = 0,
    idElectricMetter,

    expenseRoom = '',
    typeRoom = 0,
    unitPriceRoom = 0,
    totalRoom = 0,
    unitPriceRoomAction = 0,

    expenseElectricity = '',
    typeElectricity = 0,
    unitPriceElectricity = 0,
    totalElectricity = 0,

    expenseWater = '',
    typeWater = 0,
    unitPriceWater = 0,
    totalWater = 0,

    expenseGarbage = '',
    typeGarbage = 0,
    unitPriceGarbage = 0,
    totalGarbage = 0,

    expenseWifi = '',
    typeWifi = 0,
    unitPriceWifi = 0,
    totalWifi = 0,

    expenseOther = '',
    typeOther = 0,
    unitPriceOther = 0,
    totalOther = 0,
  } = billData;
  let tyepTaxAllAction = 0;
  let totalAndTaxAllAction = totalAndTaxAll;
  let toltalRoomAction = totalRoom;
  let unitPriceRoomActionLocal = unitPriceRoomAction;

  let totalElectricityction = totalElectricity;
  let unitPriceElectricityLocal = unitPriceElectricity;

  let totalWaterAction = totalWater;
  let unitPriceWaterLocal = unitPriceWater;

  let totalGarbageAction = totalGarbage;
  let unitPriceGarbageLocal = unitPriceGarbage;

  let totalWifiAction = totalWifi;
  let unitPriceWifiLocal = unitPriceWifi;

  let totalOtherAction = totalOther;
  let unitPriceOtherLocal = unitPriceOther;

  const handleChangeToltalRoom = e => {
    unitPriceRoomActionLocal = toltalRoomAction;
    const typeRoomValue = e.target.value;
    const day = unitPriceRoomAction / 30;
    toltalRoomAction = day * typeRoomValue;
    return day * typeRoomValue;
  };

  const handleChangeElectricity = e => {
    unitPriceElectricityLocal = totalElectricityction;
    const typeElectricity = e.target.value;
    const result = unitPriceElectricity * typeElectricity;
    totalElectricityction = result;
    return result;
  };
  const updateElectricity = value => {
    // Update electric
    unitPriceElectricityLocal = totalElectricityction;
    const typeElectricity = value;
    const result = unitPriceElectricity * typeElectricity;
    totalElectricityction = result;
    // Update total before tax
    // handleTotalAndTaxAllAction(
    //   unitPriceElectricityLocal,
    //   totalElectricityction,
    // );
    return result;
  };

  const handleChangeWater = e => {
    unitPriceWaterLocal = totalWaterAction;
    const typeWater = e.target.value;
    const result = unitPriceWater * typeWater;
    totalWaterAction = result;
    return result;
  };
  const handleChangeGarbage = e => {
    unitPriceGarbageLocal = totalGarbageAction;
    const typeGarbage = e.target.value;
    const result = unitPriceGarbage * typeGarbage;
    totalGarbageAction = result;
    return result;
  };
  const handleChangeWifi = e => {
    unitPriceWifiLocal = totalWifiAction;
    const typeWifi = e.target.value;
    const result = unitPriceWifi * typeWifi;
    totalWifiAction = result;
    return result;
  };
  const handleChangeOther = e => {
    unitPriceOtherLocal = totalOtherAction;
    const typeOther = e.target.value;
    const result = unitPriceOther * typeOther;
    totalOtherAction = result;
    return result;
  };
  const handleChangeToltalTaxAll = e => {
    const tyepTaxAll = e.target.value;
    tyepTaxAllAction = tyepTaxAll;
    const totalAndTaxAllActionLocal = totalAndTaxAllAction;
    return (totalAndTaxAllActionLocal * tyepTaxAll) / 100;
  };
  const handleChangeToltalAll = e => {
    const tyepTaxAll = tyepTaxAllAction;
    const totalAll = (totalAndTaxAll * tyepTaxAll) / 100 + totalAndTaxAll;
    return totalAll;
  };

  const handleTotalAndTaxAllAction = (oldValue, newValue) => {
    totalAndTaxAllAction = totalAndTaxAllAction - oldValue + newValue;
    return totalAndTaxAllAction;
  };

  const handleChangeToltalTaxAllAction = e => {
    const totalAndTaxAllActionLocal = totalAndTaxAllAction;
    return (totalAndTaxAllActionLocal * tyepTaxAllAction) / 100;
  };
  const handleChangeToltalAllAction = e => {
    // đơn vị thuế
    // tính % thuế =  tổng cộng % đơn vi thế
    const totalAndTaxAllActionLocal = totalAndTaxAllAction;
    let totalTax = 0;
    if (totalAndTaxAllActionLocal != 0) {
      totalTax = (totalAndTaxAllActionLocal * tyepTaxAllAction) / 100;
    }
    const total = totalTax + totalAndTaxAllAction;

    return total;
  };

  async function handleGetDataEnergyPerDay(idElectricMetter) {
    const requestUrl = `${urlLink.api.serverUrl +
      urlLink.api.getDataEnergyPerDay +
      idElectricMetter}/${moment().year()}/${moment().month()}`;
    console.log({ requestUrl });
    const response = await axios.get(requestUrl, config);
    console.log({ response });
    if (response.status === 200) {
      setTotalkWhMon(response.data.data.totalkWhMon);
    }
  }

  useEffect(() => {
    if (totalkWhMon > 1) {
      props.handleUpdateTotalElectricity(Math.round(totalkWhMon));
    }
  }, [totalkWhMon]);

  useEffect(() => {
    if (idElectricMetter) {
      handleGetDataEnergyPerDay(idElectricMetter);
    }
  }, [idElectricMetter]);

  const config = {
    headers: {
      'content-type': 'multipart/form-data',
      Authorization: `Bearer ${localStoreService.get('user').token}`,
    },
  };

  const downloadFile = async payload => {
    const requestUrl = urlLink.api.serverUrl + urlLink.api.motelPdf;
    try {
      const response = await axios.post(
        requestUrl,
        payload,
        {
          responseType: 'blob',
        },
        config,
      );

      fileDownload(response.data, 'export.pdf');
      notificationController.success('Xuất Hóa Đơn Thành Công');
    } catch (err) {
      notificationController.error('Chưa Có Tài Khoản Nhận Tiền Liên Hệ Admin');
      // setFlag(!flag);
    }
  };

  return (
    <div className="login-page-wrapper">
      <Helmet>
        <title>RoomBill</title>
        <meta name="description" content="Description of RoomBill" />
      </Helmet>
      <div className="user-profileUpdate">
        <div className="list-motel">
          <PaperWrapper
            className="header-profile-paper"
            style={{ paddingBottom: 0 }}
          >
            <Typography className="header-profile" component="h2" variant="h5">
              Thông Tin Hóa Đơn
            </Typography>
            <Container>
              <div className="title">Dữ liệu Xuất Hóa Đơn</div>
              <Formik
                initialValues={{
                  idBill: getRandomHex2(),
                  dateBill,
                  nameMotel,
                  nameRoom,
                  nameUser,
                  phoneUser,
                  address,
                  imgRoom,
                  emailOwner,
                  totalAll,
                  totalAndTaxAll,
                  totalTaxAll,
                  typeTaxAll,

                  expenseRoom,
                  typeRoom,
                  unitPriceRoom,
                  totalRoom,

                  expenseElectricity,
                  typeElectricity,
                  unitPriceElectricity,
                  totalElectricity,

                  expenseWater,
                  typeWater,
                  unitPriceWater,
                  totalWater,

                  expenseGarbage,
                  typeGarbage,
                  unitPriceGarbage,
                  totalGarbage,

                  expenseWifi,
                  typeWifi,
                  unitPriceWifi,
                  totalWifi,

                  expenseOther,
                  typeOther,
                  unitPriceOther,
                  totalOther,
                }}
                enableReinitialize
                validationSchema={validateForm}
                onSubmit={evt => {
                  downloadFile(evt);
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  setFieldValue,
                }) => (
                  <div>
                    <form onSubmit={handleSubmit}>
                      <Row>
                        <Col>
                          <div className="submit-forgot-password">
                            <Button
                              color="primary"
                              type="submit"
                              className="btn-submit"
                            >
                              Xuất Hóa Đơn
                            </Button>
                          </div>
                        </Col>
                      </Row>

                      <Row className="infor" style={{ paddingTop: '20px' }}>
                        <Col md={3}>
                          {
                            <FormattedMessage {...messages.typeTaxAll}>
                              {msg => (
                                <InputForm
                                  label={
                                    <FormattedMessage
                                      {...messages.typeTaxAll}
                                    />
                                  }
                                  placeholder={msg}
                                  name="typeTaxAll"
                                  icon="fa fa-user"
                                  type="number"
                                  value={values.typeTaxAll}
                                  touched={touched.typeTaxAll}
                                  error={errors.typeTaxAll}
                                  autoComplete="typeTaxAll"
                                  onChange={evt => {
                                    handleChange(evt);
                                    setFieldValue(
                                      'totalTaxAll',
                                      handleChangeToltalTaxAll(evt),
                                    );
                                    setFieldValue(
                                      'totalAll',
                                      handleChangeToltalAll(evt),
                                    );
                                  }}
                                  onBlur={handleBlur}
                                />
                              )}
                            </FormattedMessage>
                          }
                        </Col>
                        <Col md={3}>
                          {
                            <FormattedMessage {...messages.totalTaxAll}>
                              {msg => (
                                <InputForm
                                  label={
                                    <FormattedMessage
                                      {...messages.totalTaxAll}
                                    />
                                  }
                                  placeholder={msg}
                                  disabled
                                  name="totalTaxAll"
                                  icon="fa fa-user"
                                  value={values.totalTaxAll}
                                  touched={touched.totalTaxAll}
                                  error={errors.totalTaxAll}
                                  type="number"
                                  autoComplete="totalTaxAll"
                                  onChange={evt => {
                                    handleChange(evt);
                                  }}
                                  onBlur={handleBlur}
                                />
                              )}
                            </FormattedMessage>
                          }
                        </Col>
                        <Col md={3}>
                          {
                            <FormattedMessage {...messages.totalAndTaxAll}>
                              {msg => (
                                <InputForm
                                  label={
                                    <FormattedMessage
                                      {...messages.totalAndTaxAll}
                                    />
                                  }
                                  placeholder={msg}
                                  disabled
                                  name="totalAndTaxAll"
                                  icon="fa fa-user"
                                  value={values.totalAndTaxAll}
                                  touched={touched.totalAndTaxAll}
                                  error={errors.totalAndTaxAll}
                                  autoComplete="totalAndTaxAll"
                                  onChange={evt => {
                                    handleChange(evt);
                                  }}
                                  onBlur={handleBlur}
                                />
                              )}
                            </FormattedMessage>
                          }
                        </Col>
                        <Col md={3}>
                          {
                            <FormattedMessage {...messages.totalAll}>
                              {msg => (
                                <InputForm
                                  label={
                                    <FormattedMessage {...messages.totalAll} />
                                  }
                                  placeholder={msg}
                                  disabled
                                  name="totalAll"
                                  icon="fa fa-user"
                                  value={values.totalAll}
                                  touched={touched.totalAll}
                                  error={errors.totalAll}
                                  autoComplete="totalAll"
                                  onChange={evt => {
                                    handleChange(evt);
                                  }}
                                  onBlur={handleBlur}
                                />
                              )}
                            </FormattedMessage>
                          }
                        </Col>
                      </Row>

                      <Row className="infor" style={{ paddingTop: '20px' }}>
                        <Col md={3}>
                          {
                            <FormattedMessage {...messages.expenseRoom}>
                              {msg => (
                                <InputForm
                                  label={
                                    <FormattedMessage
                                      {...messages.expenseRoom}
                                    />
                                  }
                                  placeholder={msg}
                                  disabled
                                  name="expenseRoom"
                                  icon="fa fa-user"
                                  value={values.expenseRoom}
                                  touched={touched.expenseRoom}
                                  error={errors.expenseRoom}
                                  autoComplete="expenseRoom"
                                  onChange={evt => {
                                    handleChange(evt);
                                  }}
                                  onBlur={handleBlur}
                                />
                              )}
                            </FormattedMessage>
                          }
                        </Col>
                        <Col md={3}>
                          {
                            <FormattedMessage {...messages.typeRoom}>
                              {msg => (
                                <InputForm
                                  label={
                                    <FormattedMessage {...messages.typeRoom} />
                                  }
                                  placeholder={msg}
                                  name="typeRoom"
                                  icon="fa fa-user"
                                  value={values.typeRoom}
                                  touched={touched.typeRoom}
                                  error={errors.typeRoom}
                                  type="number"
                                  autoComplete="typeRoom"
                                  onChange={evt => {
                                    handleChange(evt);
                                    setFieldValue(
                                      'totalRoom',
                                      handleChangeToltalRoom(evt),
                                    );
                                    setFieldValue(
                                      'totalAndTaxAll',
                                      handleTotalAndTaxAllAction(
                                        unitPriceRoomActionLocal,
                                        toltalRoomAction,
                                      ),
                                    );
                                    setFieldValue(
                                      'totalTaxAll',
                                      handleChangeToltalTaxAllAction(evt),
                                    );
                                    setFieldValue(
                                      'totalAll',
                                      handleChangeToltalAllAction(evt),
                                    );
                                  }}
                                  onBlur={handleBlur}
                                />
                              )}
                            </FormattedMessage>
                          }
                        </Col>
                        <Col md={3}>
                          {
                            <FormattedMessage {...messages.unitPriceRoom}>
                              {msg => (
                                <InputForm
                                  label={
                                    <FormattedMessage
                                      {...messages.unitPriceRoom}
                                    />
                                  }
                                  placeholder={msg}
                                  disabled
                                  name="unitPriceRoom"
                                  icon="fa fa-user"
                                  value={values.unitPriceRoom}
                                  touched={touched.unitPriceRoom}
                                  error={errors.unitPriceRoom}
                                  autoComplete="unitPriceRoom"
                                  onChange={evt => {
                                    handleChange(evt);
                                  }}
                                  onBlur={handleBlur}
                                />
                              )}
                            </FormattedMessage>
                          }
                        </Col>
                        <Col md={3}>
                          {
                            <FormattedMessage {...messages.totalRoom}>
                              {msg => (
                                <InputForm
                                  label={
                                    <FormattedMessage {...messages.totalRoom} />
                                  }
                                  placeholder={msg}
                                  disabled
                                  name="totalRoom"
                                  icon="fa fa-user"
                                  value={values.totalRoom}
                                  touched={touched.totalRoom}
                                  error={errors.totalRoom}
                                  autoComplete="totalRoom"
                                  onChange={evt => {
                                    handleChange(evt);
                                  }}
                                  onBlur={handleBlur}
                                />
                              )}
                            </FormattedMessage>
                          }
                        </Col>
                      </Row>

                      <Row className="infor" style={{ paddingTop: '20px' }}>
                        <Col md={3}>
                          {
                            <FormattedMessage {...messages.expenseElectricity}>
                              {msg => (
                                <InputForm
                                  label={
                                    <FormattedMessage
                                      {...messages.expenseElectricity}
                                    />
                                  }
                                  placeholder={msg}
                                  disabled
                                  name="expenseElectricity"
                                  icon="fa fa-user"
                                  value={values.expenseElectricity}
                                  touched={touched.expenseElectricity}
                                  error={errors.expenseElectricity}
                                  autoComplete="expenseElectricity"
                                  onChange={evt => {
                                    handleChange(evt);
                                  }}
                                  onBlur={handleBlur}
                                />
                              )}
                            </FormattedMessage>
                          }
                        </Col>
                        <Col md={3}>
                          {
                            <FormattedMessage {...messages.typeElectricity}>
                              {msg => (
                                <InputForm
                                  label={
                                    <FormattedMessage
                                      {...messages.typeElectricity}
                                    />
                                  }
                                  placeholder={msg}
                                  name="typeElectricity"
                                  icon="fa fa-user"
                                  type="number"
                                  value={values.typeElectricity}
                                  touched={touched.typeElectricity}
                                  error={errors.typeElectricity}
                                  autoComplete="typeElectricity"
                                  onChange={evt => {
                                    handleChange(evt);
                                    setFieldValue(
                                      'totalElectricity',
                                      handleChangeElectricity(evt),
                                    );
                                    setFieldValue(
                                      'totalAndTaxAll',
                                      handleTotalAndTaxAllAction(
                                        unitPriceElectricityLocal,
                                        totalElectricityction,
                                      ),
                                    );
                                    setFieldValue(
                                      'totalTaxAll',
                                      handleChangeToltalTaxAllAction(evt),
                                    );
                                    setFieldValue(
                                      'totalAll',
                                      handleChangeToltalAllAction(evt),
                                    );
                                  }}
                                  onBlur={handleBlur}
                                  disabled={idElectricMetter !== null}
                                />
                              )}
                            </FormattedMessage>
                          }
                        </Col>
                        <Col md={3}>
                          {
                            <FormattedMessage
                              {...messages.unitPriceElectricity}
                            >
                              {msg => (
                                <InputForm
                                  label={
                                    <FormattedMessage
                                      {...messages.unitPriceElectricity}
                                    />
                                  }
                                  placeholder={msg}
                                  disabled
                                  name="unitPriceElectricity"
                                  icon="fa fa-user"
                                  value={values.unitPriceElectricity}
                                  touched={touched.unitPriceElectricity}
                                  error={errors.unitPriceElectricity}
                                  autoComplete="unitPriceElectricity"
                                  onChange={evt => {
                                    handleChange(evt);
                                  }}
                                  onBlur={handleBlur}
                                />
                              )}
                            </FormattedMessage>
                          }
                        </Col>
                        <Col md={3}>
                          {
                            <FormattedMessage {...messages.totalElectricity}>
                              {msg => (
                                <InputForm
                                  label={
                                    <FormattedMessage
                                      {...messages.totalElectricity}
                                    />
                                  }
                                  placeholder={msg}
                                  disabled
                                  name="totalElectricity"
                                  icon="fa fa-user"
                                  value={values.totalElectricity}
                                  touched={touched.totalElectricity}
                                  error={errors.totalElectricity}
                                  autoComplete="totalElectricity"
                                  onChange={evt => {
                                    handleChange(evt);
                                  }}
                                  onBlur={handleBlur}
                                />
                              )}
                            </FormattedMessage>
                          }
                        </Col>
                      </Row>

                      <Row className="infor" style={{ paddingTop: '20px' }}>
                        <Col md={3}>
                          {
                            <FormattedMessage {...messages.expenseWater}>
                              {msg => (
                                <InputForm
                                  label={
                                    <FormattedMessage
                                      {...messages.expenseWater}
                                    />
                                  }
                                  placeholder={msg}
                                  disabled
                                  name="expenseWater"
                                  icon="fa fa-user"
                                  value={values.expenseWater}
                                  touched={touched.expenseWater}
                                  error={errors.expenseWater}
                                  autoComplete="expenseWater"
                                  onChange={evt => {
                                    handleChange(evt);
                                  }}
                                  onBlur={handleBlur}
                                />
                              )}
                            </FormattedMessage>
                          }
                        </Col>
                        <Col md={3}>
                          {
                            <FormattedMessage {...messages.typeWater}>
                              {msg => (
                                <InputForm
                                  label={
                                    <FormattedMessage {...messages.typeWater} />
                                  }
                                  placeholder={msg}
                                  type="number"
                                  name="typeWater"
                                  icon="fa fa-user"
                                  value={values.typeWater}
                                  touched={touched.typeWater}
                                  error={errors.typeWater}
                                  autoComplete="typeWater"
                                  onChange={evt => {
                                    handleChange(evt);
                                    setFieldValue(
                                      'totalWater',
                                      handleChangeWater(evt),
                                    );
                                    setFieldValue(
                                      'totalAndTaxAll',
                                      handleTotalAndTaxAllAction(
                                        unitPriceWaterLocal,
                                        totalWaterAction,
                                      ),
                                    );

                                    setFieldValue(
                                      'totalTaxAll',
                                      handleChangeToltalTaxAllAction(evt),
                                    );
                                    setFieldValue(
                                      'totalAll',
                                      handleChangeToltalAllAction(evt),
                                    );
                                  }}
                                  onBlur={handleBlur}
                                />
                              )}
                            </FormattedMessage>
                          }
                        </Col>
                        <Col md={3}>
                          {
                            <FormattedMessage {...messages.unitPriceWater}>
                              {msg => (
                                <InputForm
                                  label={
                                    <FormattedMessage
                                      {...messages.unitPriceWater}
                                    />
                                  }
                                  placeholder={msg}
                                  disabled
                                  name="unitPriceWater"
                                  icon="fa fa-user"
                                  value={values.unitPriceWater}
                                  touched={touched.unitPriceWater}
                                  error={errors.unitPriceWater}
                                  autoComplete="unitPriceWater"
                                  onChange={evt => {
                                    handleChange(evt);
                                  }}
                                  onBlur={handleBlur}
                                />
                              )}
                            </FormattedMessage>
                          }
                        </Col>
                        <Col md={3}>
                          {
                            <FormattedMessage {...messages.totalWater}>
                              {msg => (
                                <InputForm
                                  label={
                                    <FormattedMessage
                                      {...messages.totalWater}
                                    />
                                  }
                                  placeholder={msg}
                                  disabled
                                  name="totalWater"
                                  icon="fa fa-user"
                                  value={values.totalWater}
                                  touched={touched.totalWater}
                                  error={errors.totalWater}
                                  autoComplete="totalWater"
                                  onChange={evt => {
                                    handleChange(evt);
                                  }}
                                  onBlur={handleBlur}
                                />
                              )}
                            </FormattedMessage>
                          }
                        </Col>
                      </Row>

                      <Row className="infor" style={{ paddingTop: '20px' }}>
                        <Col md={3}>
                          {
                            <FormattedMessage {...messages.expenseGarbage}>
                              {msg => (
                                <InputForm
                                  label={
                                    <FormattedMessage
                                      {...messages.expenseGarbage}
                                    />
                                  }
                                  placeholder={msg}
                                  disabled
                                  name="expenseGarbage"
                                  icon="fa fa-user"
                                  value={values.expenseGarbage}
                                  touched={touched.expenseGarbage}
                                  error={errors.expenseGarbage}
                                  autoComplete="expenseGarbage"
                                  onChange={evt => {
                                    handleChange(evt);
                                  }}
                                  onBlur={handleBlur}
                                />
                              )}
                            </FormattedMessage>
                          }
                        </Col>
                        <Col md={3}>
                          {
                            <FormattedMessage {...messages.typeGarbage}>
                              {msg => (
                                <InputForm
                                  label={
                                    <FormattedMessage
                                      {...messages.typeGarbage}
                                    />
                                  }
                                  placeholder={msg}
                                  type="number"
                                  name="typeGarbage"
                                  icon="fa fa-user"
                                  value={values.typeGarbage}
                                  touched={touched.typeGarbage}
                                  error={errors.typeGarbage}
                                  autoComplete="typeGarbage"
                                  onChange={evt => {
                                    handleChange(evt);
                                    setFieldValue(
                                      'totalGarbage',
                                      handleChangeGarbage(evt),
                                    );
                                    setFieldValue(
                                      'totalAndTaxAll',
                                      handleTotalAndTaxAllAction(
                                        unitPriceGarbageLocal,
                                        totalGarbageAction,
                                      ),
                                    );

                                    setFieldValue(
                                      'totalTaxAll',
                                      handleChangeToltalTaxAllAction(evt),
                                    );
                                    setFieldValue(
                                      'totalAll',
                                      handleChangeToltalAllAction(evt),
                                    );
                                  }}
                                  onBlur={handleBlur}
                                />
                              )}
                            </FormattedMessage>
                          }
                          i
                        </Col>
                        <Col md={3}>
                          {
                            <FormattedMessage {...messages.unitPriceGarbage}>
                              {msg => (
                                <InputForm
                                  label={
                                    <FormattedMessage
                                      {...messages.unitPriceGarbage}
                                    />
                                  }
                                  placeholder={msg}
                                  disabled
                                  name="unitPriceGarbage"
                                  icon="fa fa-user"
                                  value={values.unitPriceGarbage}
                                  touched={touched.unitPriceGarbage}
                                  error={errors.unitPriceGarbage}
                                  autoComplete="unitPriceGarbage"
                                  onChange={evt => {
                                    handleChange(evt);
                                  }}
                                  onBlur={handleBlur}
                                />
                              )}
                            </FormattedMessage>
                          }
                        </Col>
                        <Col md={3}>
                          {
                            <FormattedMessage {...messages.totalGarbage}>
                              {msg => (
                                <InputForm
                                  label={
                                    <FormattedMessage
                                      {...messages.totalGarbage}
                                    />
                                  }
                                  placeholder={msg}
                                  disabled
                                  name="totalGarbage"
                                  icon="fa fa-user"
                                  value={values.totalGarbage}
                                  touched={touched.totalGarbage}
                                  error={errors.totalGarbage}
                                  autoComplete="totalGarbage"
                                  onChange={evt => {
                                    handleChange(evt);
                                  }}
                                  onBlur={handleBlur}
                                />
                              )}
                            </FormattedMessage>
                          }
                        </Col>
                      </Row>

                      <Row className="infor" style={{ paddingTop: '20px' }}>
                        <Col md={3}>
                          {
                            <FormattedMessage {...messages.expenseWifi}>
                              {msg => (
                                <InputForm
                                  label={
                                    <FormattedMessage
                                      {...messages.expenseWifi}
                                    />
                                  }
                                  placeholder={msg}
                                  disabled
                                  name="expenseWifi"
                                  icon="fa fa-user"
                                  value={values.expenseWifi}
                                  touched={touched.expenseWifi}
                                  error={errors.expenseWifi}
                                  autoComplete="expenseWifi"
                                  onChange={evt => {
                                    handleChange(evt);
                                  }}
                                  onBlur={handleBlur}
                                />
                              )}
                            </FormattedMessage>
                          }
                        </Col>
                        <Col md={3}>
                          {
                            <FormattedMessage {...messages.typeWifi}>
                              {msg => (
                                <InputForm
                                  label={
                                    <FormattedMessage {...messages.typeWifi} />
                                  }
                                  placeholder={msg}
                                  type="number"
                                  name="typeWifi"
                                  icon="fa fa-user"
                                  value={values.typeWifi}
                                  touched={touched.typeWifi}
                                  error={errors.typeWifi}
                                  autoComplete="typeWifi"
                                  onChange={evt => {
                                    handleChange(evt);
                                    setFieldValue(
                                      'totalWifi',
                                      handleChangeWifi(evt),
                                    );
                                    setFieldValue(
                                      'totalAndTaxAll',
                                      handleTotalAndTaxAllAction(
                                        unitPriceWifiLocal,
                                        totalWifiAction,
                                      ),
                                    );

                                    setFieldValue(
                                      'totalTaxAll',
                                      handleChangeToltalTaxAllAction(evt),
                                    );
                                    setFieldValue(
                                      'totalAll',
                                      handleChangeToltalAllAction(evt),
                                    );
                                  }}
                                  onBlur={handleBlur}
                                />
                              )}
                            </FormattedMessage>
                          }
                        </Col>
                        <Col md={3}>
                          {
                            <FormattedMessage {...messages.unitPriceWifi}>
                              {msg => (
                                <InputForm
                                  label={
                                    <FormattedMessage
                                      {...messages.unitPriceWifi}
                                    />
                                  }
                                  placeholder={msg}
                                  disabled
                                  name="unitPriceWifi"
                                  icon="fa fa-user"
                                  value={values.unitPriceWifi}
                                  touched={touched.unitPriceWifi}
                                  error={errors.unitPriceWifi}
                                  autoComplete="unitPriceWifi"
                                  onChange={evt => {
                                    handleChange(evt);
                                  }}
                                  onBlur={handleBlur}
                                />
                              )}
                            </FormattedMessage>
                          }
                        </Col>
                        <Col md={3}>
                          {
                            <FormattedMessage {...messages.totalWifi}>
                              {msg => (
                                <InputForm
                                  label={
                                    <FormattedMessage {...messages.totalWifi} />
                                  }
                                  placeholder={msg}
                                  disabled
                                  name="totalWifi"
                                  icon="fa fa-user"
                                  value={values.totalWifi}
                                  touched={touched.totalWifi}
                                  error={errors.totalWifi}
                                  autoComplete="totalWifi"
                                  onChange={evt => {
                                    handleChange(evt);
                                  }}
                                  onBlur={handleBlur}
                                />
                              )}
                            </FormattedMessage>
                          }
                        </Col>
                      </Row>

                      <Row className="infor" style={{ paddingTop: '20px' }}>
                        <Col md={3}>
                          {
                            <FormattedMessage {...messages.expenseOther}>
                              {msg => (
                                <InputForm
                                  label={
                                    <FormattedMessage
                                      {...messages.expenseOther}
                                    />
                                  }
                                  placeholder={msg}
                                  disabled
                                  name="expenseOther"
                                  icon="fa fa-user"
                                  value={values.expenseOther}
                                  touched={touched.expenseOther}
                                  error={errors.expenseOther}
                                  autoComplete="expenseOther"
                                  onChange={evt => {
                                    handleChange(evt);
                                  }}
                                  onBlur={handleBlur}
                                />
                              )}
                            </FormattedMessage>
                          }
                        </Col>
                        <Col md={3}>
                          {
                            <FormattedMessage {...messages.typeOther}>
                              {msg => (
                                <InputForm
                                  label={
                                    <FormattedMessage {...messages.typeOther} />
                                  }
                                  placeholder={msg}
                                  type="number"
                                  name="typeOther"
                                  icon="fa fa-user"
                                  value={values.typeOther}
                                  touched={touched.typeOther}
                                  error={errors.typeOther}
                                  autoComplete="typeOther"
                                  onChange={evt => {
                                    handleChange(evt);
                                    setFieldValue(
                                      'totalOther',
                                      handleChangeOther(evt),
                                    );
                                    setFieldValue(
                                      'totalAndTaxAll',
                                      handleTotalAndTaxAllAction(
                                        unitPriceOtherLocal,
                                        totalOtherAction,
                                      ),
                                    );
                                    setFieldValue(
                                      'totalTaxAll',
                                      handleChangeToltalTaxAllAction(evt),
                                    );
                                    setFieldValue(
                                      'totalAll',
                                      handleChangeToltalAllAction(evt),
                                    );
                                  }}
                                  onBlur={handleBlur}
                                />
                              )}
                            </FormattedMessage>
                          }
                        </Col>
                        <Col md={3}>
                          {
                            <FormattedMessage {...messages.unitPriceOther}>
                              {msg => (
                                <InputForm
                                  label={
                                    <FormattedMessage
                                      {...messages.unitPriceOther}
                                    />
                                  }
                                  placeholder={msg}
                                  disabled
                                  name="unitPriceOther"
                                  icon="fa fa-user"
                                  value={values.unitPriceOther}
                                  touched={touched.unitPriceOther}
                                  error={errors.unitPriceOther}
                                  autoComplete="unitPriceOther"
                                  onChange={evt => {
                                    handleChange(evt);
                                  }}
                                  onBlur={handleBlur}
                                />
                              )}
                            </FormattedMessage>
                          }
                        </Col>
                        <Col md={3}>
                          {
                            <FormattedMessage {...messages.totalOther}>
                              {msg => (
                                <InputForm
                                  label={
                                    <FormattedMessage
                                      {...messages.totalOther}
                                    />
                                  }
                                  placeholder={msg}
                                  disabled
                                  name="totalOther"
                                  icon="fa fa-user"
                                  value={values.totalOther}
                                  touched={touched.totalOther}
                                  error={errors.totalOther}
                                  autoComplete="totalOther"
                                  onChange={evt => {
                                    handleChange(evt);
                                  }}
                                  onBlur={handleBlur}
                                />
                              )}
                            </FormattedMessage>
                          }
                        </Col>
                      </Row>

                      <Row className="infor" style={{ paddingTop: '20px' }}>
                        <Col md={3}>
                          {
                            <FormattedMessage {...messages.idBill}>
                              {msg => (
                                <InputForm
                                  label={
                                    <FormattedMessage {...messages.idBill} />
                                  }
                                  placeholder={msg}
                                  disabled
                                  name="idBill"
                                  icon="fa fa-user"
                                  value={values.idBill}
                                  touched={touched.idBill}
                                  error={errors.idBill}
                                  autoComplete="idBill"
                                  onChange={evt => {
                                    handleChange(evt);
                                  }}
                                  onBlur={handleBlur}
                                />
                              )}
                            </FormattedMessage>
                          }
                        </Col>
                        <Col md={3}>
                          {
                            <FormattedMessage {...messages.dateBill}>
                              {msg => (
                                <InputForm
                                  label={
                                    <FormattedMessage {...messages.dateBill} />
                                  }
                                  placeholder={msg}
                                  disabled
                                  name="dateBill"
                                  icon="fa fa-user"
                                  value={values.dateBill}
                                  touched={touched.dateBill}
                                  error={errors.dateBill}
                                  autoComplete="dateBill"
                                  onChange={evt => {
                                    handleChange(evt);
                                  }}
                                  onBlur={handleBlur}
                                />
                              )}
                            </FormattedMessage>
                          }
                        </Col>
                        <Col md={3}>
                          {
                            <FormattedMessage {...messages.nameMotel}>
                              {msg => (
                                <InputForm
                                  label={
                                    <FormattedMessage {...messages.nameMotel} />
                                  }
                                  placeholder={msg}
                                  disabled
                                  name="nameMotel"
                                  icon="fa fa-user"
                                  value={values.nameMotel}
                                  touched={touched.nameMotel}
                                  error={errors.nameMotel}
                                  autoComplete="nameMotel"
                                  onChange={evt => {
                                    handleChange(evt);
                                  }}
                                  onBlur={handleBlur}
                                />
                              )}
                            </FormattedMessage>
                          }
                        </Col>
                        <Col md={3}>
                          {
                            <FormattedMessage {...messages.nameRoom}>
                              {msg => (
                                <InputForm
                                  label={
                                    <FormattedMessage {...messages.nameRoom} />
                                  }
                                  placeholder={msg}
                                  disabled
                                  name="nameRoom"
                                  icon="fa fa-user"
                                  value={values.nameRoom}
                                  touched={touched.nameRoom}
                                  error={errors.nameRoom}
                                  autoComplete="nameRoom"
                                  onChange={evt => {
                                    handleChange(evt);
                                  }}
                                  onBlur={handleBlur}
                                />
                              )}
                            </FormattedMessage>
                          }
                        </Col>
                      </Row>

                      <Row className="infor" style={{ paddingTop: '20px' }}>
                        <Col md={3}>
                          {
                            <FormattedMessage {...messages.nameUser}>
                              {msg => (
                                <InputForm
                                  label={
                                    <FormattedMessage {...messages.nameUser} />
                                  }
                                  placeholder={msg}
                                  disabled
                                  name="nameUser"
                                  icon="fa fa-user"
                                  value={values.nameUser}
                                  touched={touched.nameUser}
                                  error={errors.nameUser}
                                  autoComplete="nameUser"
                                  onChange={evt => {
                                    handleChange(evt);
                                  }}
                                  onBlur={handleBlur}
                                />
                              )}
                            </FormattedMessage>
                          }
                        </Col>
                        <Col md={3}>
                          {
                            <FormattedMessage {...messages.phoneUser}>
                              {msg => (
                                <InputForm
                                  label={
                                    <FormattedMessage {...messages.phoneUser} />
                                  }
                                  placeholder={msg}
                                  disabled
                                  name="phoneUser"
                                  icon="fa fa-user"
                                  value={values.phoneUser}
                                  touched={touched.phoneUser}
                                  error={errors.phoneUser}
                                  autoComplete="phoneUser"
                                  onChange={evt => {
                                    handleChange(evt);
                                  }}
                                  onBlur={handleBlur}
                                />
                              )}
                            </FormattedMessage>
                          }
                        </Col>
                        <Col md={3}>
                          {
                            <FormattedMessage {...messages.address}>
                              {msg => (
                                <InputForm
                                  label={
                                    <FormattedMessage {...messages.address} />
                                  }
                                  placeholder={msg}
                                  disabled
                                  name="address"
                                  icon="fa fa-user"
                                  value={values.address}
                                  touched={touched.address}
                                  error={errors.address}
                                  autoComplete="address"
                                  onChange={evt => {
                                    handleChange(evt);
                                  }}
                                  onBlur={handleBlur}
                                />
                              )}
                            </FormattedMessage>
                          }
                        </Col>
                        <Col md={3}>
                          {
                            <FormattedMessage {...messages.imgRoom}>
                              {msg => (
                                <InputForm
                                  label={
                                    <FormattedMessage {...messages.imgRoom} />
                                  }
                                  placeholder={msg}
                                  disabled
                                  name="imgRoom"
                                  icon="fa fa-user"
                                  value={values.imgRoom}
                                  touched={touched.imgRoom}
                                  error={errors.imgRoom}
                                  autoComplete="imgRoom"
                                  onChange={evt => {
                                    handleChange(evt);
                                  }}
                                  onBlur={handleBlur}
                                />
                              )}
                            </FormattedMessage>
                          }
                        </Col>
                      </Row>
                    </form>
                  </div>
                )}
              </Formik>
            </Container>
          </PaperWrapper>
        </div>
      </div>
    </div>
  );
}

RoomBill.propTypes = {
  getListRoomUser: PropTypes.func,
  postExportBill: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  roomBill: makeSelectRoomBill(),
});

function mapDispatchToProps(dispatch) {
  return {
    getListRoomUser: payload => {
      dispatch(getListRoomUser(payload));
    },
    postExportBill: evt => {
      dispatch(postExportBill(evt));
    },
    handleUpdateTotalElectricity: value => {
      dispatch(updateTotalElectricity(value));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(RoomBill);
