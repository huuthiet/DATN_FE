/**
 *
 * ActiveUser
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Button, Container, Alert } from 'reactstrap';
import _ from 'lodash';
import makeSelectActiveUser from './selectors';
import reducer from './reducer';
import saga from './saga';
import InputForm from '../../components/InputForm';
import { postActiveUser, getUser, changeStoreData } from './actions';
import './style.scss';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';

const validateForm = Yup.object().shape({
  barcode: Yup.string().required('Vui lòng nhập mã xác nhận'),
});

export function ActiveUser(props) {
  useInjectReducer({ key: 'activeUser', reducer });
  useInjectSaga({ key: 'activeUser', saga });
  const { email } = useParams();
  useEffect(() => {}, []);
  const { error, actives } = props.activeUser;

  const [textdata, setTextdata] = useState(actives);

  const history = useHistory();

  return (
    <div className="login-page-wrapper">
      <Helmet>
        <title>ActiveUser</title>
        <meta name="description" content="Description of ActiveUser" />
      </Helmet>
      <Container>
        <div className="title">Kích hoạt tài khoản</div>
        <Formik
          initialValues={{
            barcode: '',
          }}
          enableReinitialize
          validationSchema={validateForm}
          onSubmit={evt => {
            const temp = { ...evt, email };
            props.postActiveUser(temp);
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
                <InputForm
                  label="Nhập mã xác nhận"
                  placeholder="Nhập nhận mã nhận"
                  name="barcode"
                  autoComplete="barcode"
                  icon="fa fa-barcode"
                  touched={touched.barcode}
                  error={errors.barcode}
                  onChange={evt => {
                    handleChange(evt);
                  }}
                  onBlur={handleBlur}
                />
                {error.length > 0 && (
                  <Container>
                    <Alert color="danger">Mã Xác Nhận Không Đúng!</Alert>
                  </Container>
                )}
                {actives == 1
                  ? props.changeStoreData('actives', 1)
                  : setTextdata(0)}
                {actives == 1 && (
                  <div className="link">
                    {props.changeStoreData('actives', 0)}
                    {history.push(`/auth/login`)}
                  </div>
                )}
                <div className="submit-forgot-password">
                  <Button color="primary" type="submit" className="btn-submit">
                    Gửi
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

ActiveUser.propTypes = {
  dispatch: PropTypes.func,
  postActiveUser: PropTypes.func,
  changeStoreData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  activeUser: makeSelectActiveUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    getUser: () => {
      dispatch(getUser());
    },
    postActiveUser: evt => {
      dispatch(postActiveUser(evt));
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

export default compose(withConnect)(ActiveUser);
