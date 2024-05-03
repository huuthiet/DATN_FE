/**
 *
 * SignUp
 *
 */

import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import ClassNames from 'classnames';
import { Formik } from 'formik';
import { Link, useHistory } from 'react-router-dom';
import { Alert, Button, Col, Container, Row } from 'reactstrap';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import * as Yup from 'yup';
import './style.scss';

import { FormattedMessage } from 'react-intl';
import InputForm from '../../components/InputForm';
import {
  changeStoreData,
  getResendOTP,
  postConfirmOTP,
  postSignUp,
} from './actions';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import makeSelectSignUp from './selectors';

const REGEX_PASSWORD = /\S.*\S/;
const validateForm = Yup.object().shape({
  firstName: Yup.string().required(
    <FormattedMessage {...messages.firstName} />,
  ),
  lastName: Yup.string().required(<FormattedMessage {...messages.lastName} />),
  phoneNumber: Yup.string().required(
    <FormattedMessage {...messages.phoneNumber} />,
  ),
  email: Yup.string().required(<FormattedMessage {...messages.email} />),
  password: Yup.string()
    .min(6, <FormattedMessage {...messages.password} />)
    .required(<FormattedMessage {...messages.requiredPassword} />)
    .matches(
      REGEX_PASSWORD,
      <FormattedMessage {...messages.matchesPassword} />,
    ),
  confirmPassword: Yup.string()
    .min(6, <FormattedMessage {...messages.password} />)
    .oneOf([Yup.ref('password'), null], 'Mật khẩu không trùng khớp')
    .required(<FormattedMessage {...messages.requiredPassword} />)
    .matches(
      REGEX_PASSWORD,
      <FormattedMessage {...messages.matchesPassword} />,
    ),
});

export function SignUp(props) {
  useInjectReducer({ key: 'signUp', reducer });
  useInjectSaga({ key: 'signUp', saga });
  const [role, setRole] = useState('customer');
  const { user, error, modal, otpError, action } = props.signUp;
  const toggle = () => props.changeStoreData('modal', !modal);
  const handleSubmitOTP = () => {
    props.getResendOTP();
  };
  const history = useHistory();

  return (
    <div className="sign-up-page-wrapper">
      <Helmet>
        <title>SignUp</title>
        <meta name="description" content="Description of SignUp" />
      </Helmet>
      <div className="sign-up-page">
        <Container>
          <div className="title">
            <FormattedMessage {...messages.Chooseaccount} />
          </div>
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              phoneNumber: '',
              email: '',
              password: '',
              confirmPassword: '',
              role,
            }}
            enableReinitialize
            validationSchema={validateForm}
            onSubmit={evt => {
              props.postSignUp(evt);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <div>
                <form onSubmit={handleSubmit}>
                  <Container>
                    <Row className="role">
                      <Col xs={6} className='role-container'>
                        <div
                          className={ClassNames('role-item host', {
                            'border-blue': role === 'host',
                          })}
                          onClick={() => {
                            role === 'customer' && setRole('host');
                          }}
                        >
                          {role === 'host' && (
                            <div className="checked">
                              <img src="/checked.png" />
                            </div>
                          )}
                          <div className="role-name">
                            <FormattedMessage {...messages.host} />
                          </div>
                        </div>
                      </Col>
                      <Col xs={6}>
                        <div
                          className={ClassNames('role-item customer', {
                            'border-blue': role === 'customer',
                          })}
                          onClick={() => {
                            role === 'host' && setRole('customer');
                          }}
                        >
                          {role === 'customer' && (
                            <div className="checked">
                              <img src="/checked.png" />
                            </div>
                          )}
                          <div className="role-name">
                            <FormattedMessage {...messages.findroom} />
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Container>
                  <Container className="content">
                  </Container>

                  {error.length > 0 && (
                    <Container>
                      <Alert color="danger">
                        <FormattedMessage {...messages.emailphoneError} />
                      </Alert>
                    </Container>
                  )}

                  <Row className="infor">
                    <Col xs={7}>
                      {
                        <FormattedMessage {...messages.firstNameenter}>
                          {msg => (
                            <InputForm
                              placeholder={msg}
                              name="lastName"
                              icon="fa fa-user"
                              className="form"
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
                    <Col xs={5}>
                      {
                        <FormattedMessage {...messages.lastNameenter}>
                          {msg => (
                            <InputForm
                              placeholder={msg}
                              name="firstName"
                              icon="fa fa-user"
                              className="form"
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
                    <Col xs={12}>
                      {
                        <FormattedMessage {...messages.phoneNumberenter}>
                          {msg => (
                            <InputForm
                              placeholder={msg}
                              name="phoneNumber"
                              icon="fa fa-phone"
                              className="form"
                              touched={touched.phoneNumber}
                              error={errors.phoneNumber}
                              autoComplete="phoneNumber"
                              onChange={evt => {
                                handleChange(evt);
                              }}
                              onBlur={handleBlur}
                            />
                          )}
                        </FormattedMessage>
                      }
                    </Col>
                    <Col xs={12}>
                      {
                        <FormattedMessage {...messages.emailenter}>
                          {msg => (
                            <InputForm
                              placeholder={msg}
                              name="email"
                              icon="fa fa-envelope"
                              className="form"
                              touched={touched.email}
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
                    <Col xs={12}>
                      {
                        <FormattedMessage {...messages.passwordenter}>
                          {msg => (
                            <InputForm
                              placeholder={msg}
                              name="password"
                              icon="fa fa-lock"
                              className="form"
                              type="password"
                              value={values.password}
                              touched={touched.password}
                              error={errors.password}
                              autoComplete="new-password"
                              onChange={evt => {
                                handleChange(evt);
                              }}
                              onBlur={handleBlur}
                            />
                          )}
                        </FormattedMessage>
                      }
                    </Col>
                    <Col xs={12}>
                      {
                        <FormattedMessage {...messages.requiredPasswordenter}>
                          {msg => (
                            <InputForm
                              placeholder={msg}
                              name="confirmPassword"
                              icon="fa fa-lock"
                              className="form"
                              type="password"
                              value={values.confirmPassword}
                              touched={touched.confirmPassword}
                              error={errors.confirmPassword}
                              autoComplete="new-password"
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
                  <div className="login">
                    <FormattedMessage {...messages.Haveaccount} />{' '}
                    <Link to="/auth/login" className="link">
                      <FormattedMessage {...messages.login} />
                    </Link>
                    <Button
                      color="primary"
                      type="submit"
                      className="btn-submit"
                    >
                      <FormattedMessage {...messages.CreateAccount} />
                    </Button>
                  </div>
                </form>
                {/* {
									// Chuyển trang kích hoạt toài khoản
									action == 1 && (
										<div className="link">
											{props.changeStoreData('action', 0)}
											{history.push(`/auth/active_user/${user.email}`)}
										</div>
									)
								} */}
              </div>
            )}
          </Formik>
        </Container>
      </div>
    </div>
  );
}

SignUp.propTypes = {
  dispatch: PropTypes.func,
  postSignUp: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  signUp: makeSelectSignUp(),
});

function mapDispatchToProps(dispatch) {
  return {
    postSignUp: evt => {
      dispatch(postSignUp(evt));
    },
    getResendOTP: () => {
      dispatch(getResendOTP());
    },
    postConfirmOTP: code => {
      dispatch(postConfirmOTP(code));
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

export default compose(withConnect)(SignUp);
