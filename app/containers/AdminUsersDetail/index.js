/**
 *
 * AdminUsersDetail
 *
 */

import { Avatar } from '@material-ui/core';
import { Formik } from 'formik';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import Select from 'react-select';
import { Button, Col, Container, Row, Alert } from 'reactstrap';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import * as Yup from 'yup';
import InputForm from '../../components/InputForm';
import { changeStoreData, getAdminUserDetail, putProfile } from './actions';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import makeSelectAdminUsersDetail from './selectors';
import './style.scss';


const options = [
  {
    key: 'female',
    value: 'female',
    label: <FormattedMessage {...messages.female} />,
  },
  {
    key: 'male',
    value: 'male',
    label: <FormattedMessage {...messages.male} />,
  },
  {
    key: 'n/a',
    value: 'n/a',
    label: <FormattedMessage {...messages.Other} />,
  },
];

const REGEX_PASSWORD = /\S.*\S/;
const validateForm = Yup.object().shape({
  firstName: Yup.string().required(
    <FormattedMessage {...messages.firstName} />,
  ),
  phoneNumberFull: Yup.string().required(
    <FormattedMessage {...messages.phoneNumberenter} />,
  ),
  lastName: Yup.string().required(<FormattedMessage {...messages.lastName} />),
  email: Yup.string().required(<FormattedMessage {...messages.email} />),
  address: Yup.string().required(<FormattedMessage {...messages.address} />),
  nationalId: Yup.string()
    .min(9, <FormattedMessage {...messages.nationalId} />)
    .required(<FormattedMessage {...messages.nationalId} />)
    .matches(REGEX_PASSWORD, <FormattedMessage {...messages.nationalId} />),
});

export function AdminUsersDetail(props) {
  useInjectReducer({ key: 'adminUsersDetail', reducer });
  useInjectSaga({ key: 'adminUsersDetail', saga });
  const { id = '' } = useParams();
  const { adminUsersDetail = {}, error = [] } = props.adminUsersDetail;
  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    props.getAdminUserDetail(id);
  }, []);

  console.log({adminUsersDetail});

  const {
    firstName = '',
    nationalId = '',
    address = '',
    gender = '',
    dob,
    avatar = '',
    frontId = '',
    backId = '',
    phoneNumberFull = '',
    idDevice = '',
    phoneNumber = {
      countryCode: '',
      number: '',
    },
    email = '',
    lastName = '',
  } = adminUsersDetail;

  const [dobAction, setDobAction] = useState('01/01/1990');

  const [avatarFile, setAvatarFile] = useState('');
  const [avatarAction, setAvatarAction] = useState('');

  const [frontIdFile, setFrontIdFile] = useState('');
  const [frontIdAction, setFrontIdAction] = useState('');

  const [backIdFile, setBackIdFile] = useState('');
  const [backIdAction, setBackIdAction] = useState('');

  const TenMegaBytes = 10 * 1024 * 1024;

  const handleFileInputChange = e => {
    const abcfile = e.target.files[0];
    // check mb file size
    if (abcfile.size <= TenMegaBytes) {
      const formData = new FormData();
      formData.append('file', abcfile);
      try {
        const data = {
          // eslint-disable-next-line no-underscore-dangle
          id: id,
          formData,
        };
        setAvatarAction(data);
        setAvatarFile(URL.createObjectURL(abcfile));
        // eslint-disable-next-line no-empty
      } catch (error) { }
    }
  };

  const handleFileInputChangeFront = e => {
    const abcfile = e.target.files[0];
    // check mb file size
    if (abcfile.size <= TenMegaBytes) {
      const formData = new FormData();
      formData.append('file', abcfile);
      try {
        const data = {
          // eslint-disable-next-line no-underscore-dangle
          id: id,
          formData,
        };
        setFrontIdAction(data);
        setFrontIdFile(URL.createObjectURL(abcfile));
        // eslint-disable-next-line no-empty
      } catch (error) { }
    }
  };

  const handleFileInputChangeBack = e => {
    const abcfile = e.target.files[0];
    // check mb file size
    if (abcfile.size <= TenMegaBytes) {
      const formData = new FormData();
      formData.append('file', abcfile);
      try {
        const data = {
          // eslint-disable-next-line no-underscore-dangle
          id: id,
          formData,
        };
        setBackIdAction(data);
        setBackIdFile(URL.createObjectURL(abcfile));
        // eslint-disable-next-line no-empty
      } catch (error) { }
    }
  };

  const handleChangeGender = e => {
    const bankValue = e.value;
    // eslint-disable-next-line no-plusplus
    for (let k = 0; k < options.length; k++) {
      const item = options[k];
      if (item.value === bankValue) {
        return item;
      }
    }
  };
  return (
    <div className="motel-detail-wrapper">
      <Helmet>
        <title>AdminUsersDetail</title>
        <meta name="description" content="Description of AdminUsersDetail" />
      </Helmet>

      <Container>
        <div className="title mb-3">
          <h3>
            {' '}
          </h3>
        </div>
        <Formik
          initialValues={{
            firstName,
            phoneNumberFull,
            lastName,
            email,
            nationalId,
            address,
            idDevice,
            dobAction: dob,
            gender: {
              key: gender,
              value: gender,
              label:
                // eslint-disable-next-line no-nested-ternary
                gender === 'female' ? (
                  <FormattedMessage {...messages.female} />
                ) : gender === 'male' ? (
                  <FormattedMessage {...messages.male} />
                ) : (
                  <FormattedMessage {...messages.Other} />
                ),
            },
          }}
          enableReinitialize
          validationSchema={validateForm}
          onSubmit={evt => {
            const body = {
              ...evt,
              dobAction,
              avatarAction,
              frontIdAction,
              backIdAction,
              _id: id,
            };
            // submit
            props.putProfile(body);

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

                <Row className="infor" style={{ paddingTop: '20px' }}>
                  <Col md={12}>
                    <div className='title'>
                      <FormattedMessage {...messages.UpdateProfile} />
                    </div>
                  </Col>
                  <Col md={4}>
                    {
                      <FormattedMessage {...messages.firstName}>
                        {msg => (
                          <InputForm
                            label={<FormattedMessage {...messages.firstName} />}
                            placeholder={msg}
                            name="firstName"
                            icon="fa fa-user"
                            value={values.firstName}
                            touched={touched.firstName}
                            error={errors.firstName}
                            autoComplete="firstName"
                            onChange={evt => {
                              handleChange(evt);
                            }}
                            onBlur={handleBlur}
                          />
                        )}
                      </FormattedMessage>
                    }
                  </Col>
                  <Col md={4}>
                    {
                      <FormattedMessage {...messages.lastName}>
                        {msg => (
                          <InputForm
                            label={<FormattedMessage {...messages.lastName} />}
                            placeholder={msg}
                            name="lastName"
                            icon="fa fa-user"
                            value={values.lastName}
                            touched={touched.lastName}
                            error={errors.lastName}
                            autoComplete="lastName"
                            onChange={evt => {
                              handleChange(evt);
                            }}
                            onBlur={handleBlur}
                          />
                        )}
                      </FormattedMessage>
                    }
                  </Col>
                  <Col md={4}>
                    <span style={{ fontWeight: 'bold' }}>
                      <FormattedMessage {...messages.gender} />
                    </span>
                    {
                      <FormattedMessage {...messages.gender}>
                        {msg => (
                          <Select
                            key={options}
                            placeholder={msg}
                            value={values.gender}
                            options={options}
                            className="mb-3"
                            onChange={evt => {
                              setFieldValue('gender', handleChangeGender(evt));
                            }}
                          />
                        )}
                      </FormattedMessage>
                    }
                  </Col>
                  <Col md={8}>
                    {
                      <FormattedMessage {...messages.email}>
                        {msg => (
                          <InputForm
                            label={<FormattedMessage {...messages.email} />}
                            placeholder={msg}
                            name="email"
                            icon="fa fa-envelope"
                            touched={touched.email}
                            value={values.email}
                            error={errors.email}
                            autoComplete="email"
                            onChange={evt => {
                              handleChange(evt);
                            }}
                            onBlur={handleBlur}
                            type="email"
                          />
                        )}
                      </FormattedMessage>
                    }
                  </Col>
                  <Col md={4}>
                    {/* {
                      <FormattedMessage {...messages.idDevice}>
                        {msg => (
                          <InputForm
                            label={<FormattedMessage {...messages.idDevice} />}
                            placeholder={msg}
                            name="idDevice"
                            icon="fa fa-envelope"
                            touched={touched.idDevice}
                            value={values.idDevice}
                            error={errors.idDevice}
                            autoComplete="idDevice"
                            onChange={evt => {
                              handleChange(evt);
                            }}
                            onBlur={handleBlur}
                            type="text"
                          />
                        )}
                      </FormattedMessage>
                    } */}
                  </Col>
                  <Col md={6}>
                    {
                      <FormattedMessage {...messages.nationalId}>
                        {msg => (
                          <InputForm
                            label={
                              <FormattedMessage {...messages.nationalId} />
                            }
                            placeholder={msg}
                            name="nationalId"
                            icon="fa fa-lock"
                            value={values.nationalId}
                            touched={touched.nationalId}
                            error={errors.nationalId}
                            autoComplete="nationalId"
                            onChange={evt => {
                              handleChange(evt);
                            }}
                            onBlur={handleBlur}
                          />
                        )}
                      </FormattedMessage>
                    }
                  </Col>
                  <Col md={6}>
                    {
                      <DatePicker
                        dateFormat="dd/MM/yyyy"
                        showMonthDropdown
                        showYearDropdown
                        selected={moment(values.dobAction).toDate()}
                        onChange={date => {
                          setDobAction(moment(date).format('DD/MM/YYYY'));
                          setFieldValue('dobAction', date);
                        }}
                        customInput={
                          <InputForm
                            label={<FormattedMessage {...messages.dob} />}
                            icon="fa fa-calendar"
                          />
                        }
                      />
                    }
                  </Col>
                  <Col md={6}>
                    {
                      <FormattedMessage {...messages.address}>
                        {msg => (
                          <InputForm
                            label={<FormattedMessage {...messages.address} />}
                            placeholder={msg}
                            name="address"
                            icon="fa fa-home"
                            type="address"
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
                  <Col md={6}>
                    {
                      <FormattedMessage {...messages.phoneNumberenter}>
                        {msg => (
                          <InputForm
                            label={
                              <FormattedMessage
                                {...messages.phoneNumberenter}
                              />
                            }
                            placeholder={msg}
                            name="phoneNumberFull"
                            icon="fa fa-phone"
                            value={values.phoneNumberFull}
                            touched={touched.phoneNumberFull}
                            error={errors.phoneNumberFull}
                            autoComplete="phoneNumberFull"
                            onChange={evt => {
                              handleChange(evt);
                            }}
                            onBlur={handleBlur}
                          />
                        )}
                      </FormattedMessage>
                    }
                  </Col>
                  <Col md={4}>
                    {
                      <FormattedMessage {...messages.uploadAvata}>
                        {msg => (
                          <InputForm
                            label={
                              <FormattedMessage {...messages.uploadAvata} />
                            }
                            placeholder={msg}
                            name="uploadAvata"
                            accept=".png, .jpg"
                            type="file"
                            onChange={evt => {
                              handleFileInputChange(evt);
                            }}
                            onBlur={handleBlur}
                          />
                        )}
                      </FormattedMessage>
                    }
                  </Col>
                  <Col md={4}>
                    {
                      <FormattedMessage {...messages.frontId}>
                        {msg => (
                          <InputForm
                            label={<FormattedMessage {...messages.frontId} />}
                            placeholder={msg}
                            name="frontId"
                            accept=".png, .jpg"
                            type="file"
                            autoComplete="frontId"
                            onChange={evt => {
                              handleFileInputChangeFront(evt);
                            }}
                            onBlur={handleBlur}
                          />
                        )}
                      </FormattedMessage>
                    }
                  </Col>
                  <Col md={4}>
                    {
                      <FormattedMessage {...messages.backId}>
                        {msg => (
                          <InputForm
                            label={<FormattedMessage {...messages.backId} />}
                            placeholder={msg}
                            name="backId"
                            accept=".png, .jpg"
                            type="file"
                            autoComplete="backId"
                            onChange={evt => {
                              handleFileInputChangeBack(evt);
                            }}
                            onBlur={handleBlur}
                          />
                        )}
                      </FormattedMessage>
                    }
                  </Col>
                  {/* Image */}
                  <Col md={4}>
                    {avatarFile ? (
                      <Avatar
                        style={{
                          width: '100%',
                          height: '200px',
                          margin: '10px auto',
                        }}
                        variant="square"
                        alt="Avatar"
                        src={avatarFile}
                      />
                    ) : (
                      <Avatar
                        style={{
                          width: '100%',
                          height: '200px',
                          margin: '10px auto',
                        }}
                        variant="square"
                        alt="Avatar"
                        src={avatar}
                      >
                        N
                      </Avatar>
                    )}
                  </Col>
                  <Col md={4}>
                    {frontIdFile ? (
                      <Avatar
                        style={{
                          width: '100%',
                          height: '200px',
                          margin: '10px auto',
                        }}
                        variant="square"
                        alt="Avatar"
                        src={frontIdFile}
                      />
                    ) : (
                      <Avatar
                        style={{
                          width: '100%',
                          height: '200px',
                          margin: '10px auto',
                        }}
                        variant="square"
                        alt="Avatar"
                        src={frontId}
                      >
                        N
                      </Avatar>
                    )}
                  </Col>
                  <Col md={4}>
                    {backIdFile ? (
                      <Avatar
                        style={{
                          width: '100%',
                          height: '200px',
                          margin: '10px auto',
                        }}
                        variant="square"
                        alt="Avatar"
                        src={backIdFile}
                      />
                    ) : (
                      <Avatar
                        style={{
                          width: '100%',
                          height: '200px',
                          margin: '10px auto',
                        }}
                        variant="square"
                        alt="Avatar"
                        src={backId}
                      >
                        N
                      </Avatar>
                    )}
                  </Col>
                  <Col md={4}>
                    <Button
                      color="primary"
                      type="submit"
                    >
                      <FormattedMessage {...messages.UpdateProfile} />
                    </Button>
                  </Col>
                </Row>

              </form>
            </div>
          )}
        </Formik>
      </Container>
    </div>
  );
}

AdminUsersDetail.propTypes = {
  dispatch: PropTypes.func,
  changeStoreData: PropTypes.func,
  putProfile: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  adminUsersDetail: makeSelectAdminUsersDetail(),
});

function mapDispatchToProps(dispatch) {
  return {
    putProfile: data => {
      dispatch(putProfile(data));
    },
    getAdminUserDetail: id => {
      dispatch(getAdminUserDetail(id));
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

export default compose(withConnect)(AdminUsersDetail);
