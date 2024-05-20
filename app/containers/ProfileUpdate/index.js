/**
 *
 * ProfileUpdate
 *
 */
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import PhoneIcon from '@material-ui/icons/Phone';
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
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@material-ui/core';
import { Formik } from 'formik';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams } from 'react-router';
import Select from 'react-select';
import { Alert, Button, Col, Container, Row } from 'reactstrap';
import * as Yup from 'yup';
import PaperWrapper from '../../components/PaperWrapper/Loadable';
import InputForm from '../../components/InputForm';
import {
  changeStoreData,
  getProfileUpdate,
  postUpdateProfile,
} from './actions';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import makeSelectProfileUpdate from './selectors';
import './style.scss';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const REGEX_PASSWORD = /\S.*\S/;
const validateForm = Yup.object().shape({
  firstName: Yup.string().required(
    <FormattedMessage {...messages.firstName} />,
  ),
  // gender: Yup.string().required(<FormattedMessage {...messages.gender} />),
  lastName: Yup.string().required(<FormattedMessage {...messages.lastName} />),
  phoneNumber: Yup.string().required(
    <FormattedMessage {...messages.phoneNumber} />,
  ),
  email: Yup.string().required(<FormattedMessage {...messages.email} />),
  address: Yup.string().required(<FormattedMessage {...messages.address} />),
  nationalId: Yup.string()
    .min(9, <FormattedMessage {...messages.nationalId} />)
    .required(<FormattedMessage {...messages.nationalId} />)
    .matches(REGEX_PASSWORD, <FormattedMessage {...messages.nationalId} />),
});

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
export function ProfileUpdate(props) {
  const classes = useStyles();

  useInjectReducer({ key: 'profileUpdate', reducer });
  useInjectSaga({ key: 'profileUpdate', saga });
  const { id = '' } = useParams();
  const { profile = {}, error } = props.profileUpdate;
  useEffect(() => {
    props.getProfileUpdate(id);
  }, []);

  const { dob = '01/01/1990', nationalId = '', address = '' } = profile;

  // Not form
  const [gender, setGender] = useState({
    key: profile.gender,
    value: profile.gender,
    label:
      // eslint-disable-next-line no-nested-ternary
      profile.gender === 'female' ? (
        <FormattedMessage {...messages.female} />
      ) : profile.gender === 'male' ? (
        <FormattedMessage {...messages.male} />
      ) : (
        <FormattedMessage {...messages.Other} />
      ),
  });

  const [avatarFile, setAvatarFile] = useState('');
  const [avatarAction, setAvatarAction] = useState('');

  const [frontIdFile, setFrontIdFile] = useState('');
  const [frontIdAction, setFrontIdAction] = useState('');

  const [backIdFile, setBackIdFile] = useState('');
  const [backIdAction, setBackIdAction] = useState('');

  const [dobAction, setDobAction] = useState('01/01/1990');

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
          id: profile._id,
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
          id: profile._id,
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
          id: profile._id,
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
        setGender(item);
      }
    }
  };

  return (
    <div className="user-profileUpdate-wrapper container">
      <Helmet>
        <title>Profile Update</title>
        <meta name="description" content="Description of ProfileUpdate" />
      </Helmet>
      <div className="user-profileUpdate">
        <div className="list-motel">
          {/* Thông Tin  */}
          <Formik
            initialValues={{
              firstName: profile.firstName,
              lastName: profile.lastName,
              phoneNumber: {
                countryCode: '+84',
                number: profile.phoneNumber ? profile.phoneNumber.number : '', // Sửa thành 'phoneNumber.number'
              },

              email: profile.email,
              nationalId: profile.nationalId ? profile.nationalId : '',
              address: profile.address ? profile.address : '',
              dobAction: profile.dob,
              gender: {
                key: profile.gender,
                value: profile.gender,
                label:
                  // eslint-disable-next-line no-nested-ternary
                  profile.gender === 'female' ? (
                    <FormattedMessage {...messages.female} />
                  ) : profile.gender === 'male' ? (
                    <FormattedMessage {...messages.male} />
                  ) : (
                    <FormattedMessage {...messages.Other} />
                  ),
              },
            }}
            enableReinitialize
            validationSchema={validateForm}
            onSubmit={evt => {
              try {
                const body = {
                  ...evt,
                  gender,
                  avatarAction,
                  frontIdAction,
                  backIdAction,
                  dobAction,
                  _id: id,
                };

                // submit
                props.postUpdateProfile(body);

                // Chạy toast
                toast.success('Đã cập nhật thành công! Hãy đợi để về trang Login', {
                  position: 'top-right',
                  autoClose: 2000,
                  hideProgressBar: false,
                  onClose: () => {
                    // Clear local storage sau khi toast đã hoàn thành
                    localStorage.removeItem('user');
                    localStorage.removeItem('token');

                    // Redirect
                    window.location.href = '/auth/login';
                  }
                });
              } catch (error) {
                // Nếu có lỗi, hiển thị toast lỗi
                toast.error('Update Fail', {
                  position: 'top-right',
                  autoClose: 2000,
                  hideProgressBar: false,
                });
              }
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
              <div className='profile-update-container'>
                <form onSubmit={handleSubmit}>
                  <span className='profile-title'>Thông tin cá nhân</span>
                  <Row className="infor">
                    {/* <Col md={12}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <PhoneIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            profile.phoneNumber != null &&
                            `${profile.phoneNumber.countryCode} ${profile.phoneNumber.number
                            }`
                          }
                        />
                      </ListItem>
                    </Col> */}

                    <Col md={4} className="information">
                      <span className="infor-title">
                        <FormattedMessage {...messages.phoneNumberenter} />
                      </span>
                      {
                        <>
                          <FormattedMessage {...messages.phoneNumberenter} >
                            {msg => (
                              <InputForm
                                placeholder={msg}
                                name="phoneNumber.number" // Đặt tên là "phoneNumber.number" thay vì "number"
                                icon="fa fa-user"
                                value={`${values.phoneNumber.number}`}
                                touched={touched.phoneNumber && touched.phoneNumber.number} // Thêm && để kiểm tra cả số điện thoại
                                error={errors.phoneNumber && errors.phoneNumber.number} // Thêm && để kiểm tra cả số điện thoại
                                autoComplete="phoneNumber"
                                onChange={evt => {
                                  setFieldValue("phoneNumber.number", evt.target.value); // Sử dụng setFieldValue để cập nhật giá trị của số điện thoại
                                }}
                                onBlur={handleBlur}
                              />
                            )}
                          </FormattedMessage>
                        </>

                      }
                    </Col>

                    <Col md={4} className="information">
                      <span className="infor-title">
                        <FormattedMessage
                          {...messages.firstNameenter}
                        />
                      </span>
                      {
                        <FormattedMessage {...messages.firstNameenter}>
                          {msg => (
                            <InputForm
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
                    <Col md={4} className="information">
                      <span className="infor-title">
                        <FormattedMessage {...messages.lastNameenter} />
                      </span>
                      {
                        <FormattedMessage {...messages.lastNameenter}>
                          {msg => (
                            <InputForm
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
                    <Col md={4} className="information">
                      <span className="infor-title">
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
                              onChange={evt => {
                                setFieldValue(
                                  'gender',
                                  handleChangeGender(evt),
                                );
                              }}
                            />
                          )}
                        </FormattedMessage>
                      }
                    </Col>
                    <Col md={4} className="information">
                      <span className="infor-title">
                        <FormattedMessage {...messages.nationalId} />
                      </span>
                      {
                        <FormattedMessage {...messages.nationalId}>
                          {msg => (
                            <InputForm
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
                    <Col md={4} className="information">
                      <span className="infor-title">
                        {<FormattedMessage {...messages.dob} />}
                      </span>
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
                              icon="fa fa-calendar"
                            />
                          }
                        />
                      }
                    </Col>
                    <Col md={5} className="information">
                      <span className="infor-title">
                        <FormattedMessage {...messages.emailenter} />
                      </span>
                      {
                        <FormattedMessage {...messages.emailenter}>
                          {msg => (
                            <InputForm
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

                    <Col md={7} className="information">
                      <span className="infor-title">
                        <FormattedMessage {...messages.address} />
                      </span>
                      {
                        <FormattedMessage {...messages.address}>
                          {msg => (
                            <InputForm
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
                    <Col md={4} className="information">
                      <span className="infor-title">
                        <FormattedMessage {...messages.uploadAvata} />
                      </span>
                      {
                        <FormattedMessage {...messages.uploadAvata}>
                          {msg => (
                            <InputForm
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
                    <Col md={4} className="information">
                      <span className="infor-title">
                        <FormattedMessage {...messages.frontId} />
                      </span>
                      {
                        <FormattedMessage {...messages.frontId}>
                          {msg => (
                            <InputForm
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
                    <Col md={4} className="information">
                      <span className="infor-title">
                        <FormattedMessage {...messages.backId} />
                      </span>
                      {
                        <FormattedMessage {...messages.backId}>
                          {msg => (
                            <InputForm
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
                    <Col md={4} className="information">
                      {avatarFile ? (
                        <Avatar
                          style={{
                            width: '100%',
                            height: '160px',
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
                            height: '160px',
                            margin: '10px auto',
                          }}
                          variant="square"
                          alt="Avatar"
                          src={profile.avatar}
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
                            height: '160px',
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
                            height: '160px',
                            margin: '10px auto',
                            borderRadius: '4px',
                          }}
                          variant="square"
                          alt="Avatar"
                          src={profile.frontId}
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
                            height: '160px',
                            margin: '10px auto',
                            borderRadius: '4px',
                          }}
                          variant="square"
                          alt="Avatar"
                          src={backIdFile}
                        />
                      ) : (
                        <Avatar
                          style={{
                            width: '100%',
                            height: '160px',
                            margin: '10px auto',
                            borderRadius: '4px',
                          }}
                          variant="square"
                          alt="Avatar"
                          src={profile.backId}
                        >
                          N
                        </Avatar>
                      )}
                    </Col>
                  </Row>
                  {error.length > 0 && (
                    <Container>
                      <Alert color="danger">
                        <FormattedMessage {...messages.dobMax} />
                      </Alert>
                    </Container>
                  )}
                  <div className="login">
                    <Button
                      className="button-class"
                      color="primary"
                      type="submit"
                    >
                      <FormattedMessage {...messages.update} />
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </Formik>

        </div>
      </div >
    </div >
  );
}

ProfileUpdate.propTypes = {
  dispatch: PropTypes.func,
  changeStoreData: PropTypes.func,
  postUpdateProfile: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  profileUpdate: makeSelectProfileUpdate(),
});

function mapDispatchToProps(dispatch) {
  return {
    changeStoreData: (key, value) => {
      dispatch(changeStoreData(key, value));
    },

    getProfileUpdate: id => {
      dispatch(getProfileUpdate(id));
    },
    postUpdateProfile: data => {
      dispatch(postUpdateProfile(data));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ProfileUpdate);
