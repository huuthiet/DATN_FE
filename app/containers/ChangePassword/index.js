/**
 *
 * ChangePasswordPage
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
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Button, Container, Row, Col, Alert } from 'reactstrap';
import _ from 'lodash';
import makeSelectChangePasswordPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import InputForm from '../../components/InputForm';
import { postChangePassword } from './actions';
import './style.scss';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import localStore from 'local-storage';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const REGEX_PASSWORD = /\S.*\S/;
const validateForm = Yup.object().shape({
  passwordOld: Yup.string().required(
    <FormattedMessage {...messages.enterPWold} />,
  ),
  password: Yup.string()
    .min(6, <FormattedMessage {...messages.password} />)
    .required(<FormattedMessage {...messages.requiredPassword} />)
    .matches(
      REGEX_PASSWORD,
      <FormattedMessage {...messages.matchesPassword} />,
    ),
  confirmPassword: Yup.string()
    .min(6, <FormattedMessage {...messages.password} />)
    .oneOf(
      [Yup.ref('password'), null],
      <FormattedMessage {...messages.doesNotPassWord} />,
    )
    .required(<FormattedMessage {...messages.requiredPassword} />)
    .matches(
      REGEX_PASSWORD,
      <FormattedMessage {...messages.matchesPassword} />,
    ),
});

export function ChangePasswordPage(props) {
  useInjectReducer({ key: 'changePasswordPage', reducer });
  useInjectSaga({ key: 'changePasswordPage', saga });
  const history = useHistory();
  const { linkurl, error } = props.changePasswordPage;
  const currentUser = localStore.get('user') || {};
  const { _id } = currentUser;
  return (
    <div className="login-page-wrapper">
      <Helmet>
        <title>ChangePasswordPage</title>
        <meta name="description" content="Description of ChangePasswordPage" />
      </Helmet>
      <Container>

        <Formik
          initialValues={{
            passwordOld: '',
            password: '',
            confirmPassword: '',
          }}
          enableReinitialize
          validationSchema={validateForm}
          onSubmit={evt => {
            const temp = { ...evt, _id };
            props.postChangePassword(temp);
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
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <form onSubmit={handleSubmit} className='form-container'>
                <div className="title">
                  <FormattedMessage {...messages.changePassword} />
                </div>
                <Row>
                  <Col xs={12}>
                    {
                      <FormattedMessage {...messages.enterPWold}>
                        {msg => (
                          <InputForm
                            label={msg}
                            placeholder={msg}
                            name="passwordOld"
                            icon="fa fa-unlock"
                            value={values.passwordOld}
                            touched={touched.passwordOld}
                            error={errors.passwordOld}
                            autoComplete="passwordOld"
                            type="password"
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
                      <FormattedMessage {...messages.enterPWoldNew}>
                        {msg => (
                          <InputForm
                            label={msg}
                            placeholder={msg}
                            name="password"
                            icon="fa fa-lock"
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
                      <FormattedMessage {...messages.requiredPassword}>
                        {msg => (
                          <InputForm
                            label={msg}
                            placeholder={msg}
                            name="confirmPassword"
                            icon="fa fa-lock"
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
                {error.length > 0 && (
                  <Container>
                    <Alert color="danger">
                      <FormattedMessage {...messages.IncorrectOldPassword} />
                    </Alert>
                  </Container>
                )}
                {/* {linkurl == 1 && (
                    <Container>
                      <Alert color="success">Thành Công!</Alert>
                    </Container>
                  ) &&
                  history.push(`/`)} */}
                <div style={{ width: '100%', marginTop: '20px' }}>
                  <Button color="primary" type="submit" className="btn-submit">
                    <FormattedMessage {...messages.send} />
                  </Button>
                </div>
              </form>
            </div>
          )}
        </Formik>
      </Container>
    </div>
  );
}

ChangePasswordPage.propTypes = {
  dispatch: PropTypes.func,
  postChangePassword: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  changePasswordPage: makeSelectChangePasswordPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    postChangePassword: evt => {
      dispatch(postChangePassword(evt));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ChangePasswordPage);
