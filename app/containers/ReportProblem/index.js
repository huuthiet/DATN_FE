/**
 *
 * ReportProblem
 *
 */
import { Avatar, Typography } from '@material-ui/core';
import axios from 'axios';
import { Formik } from 'formik';
import localStoreService from 'local-storage';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { Button, Col, Container, Row } from 'reactstrap';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import * as Yup from 'yup';
import InputForm from '../../components/InputForm';
import PaperWrapper from '../../components/PaperWrapper/Loadable';
import { urlLink } from '../../helper/route';
import { getJobDetail } from './actions';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import makeSelectReportProblem from './selectors';
import './style.scss';
export function ReportProblem(props) {
  const history = useHistory();
  const { id } = useParams();
  useInjectReducer({ key: 'reportProblem', reducer });
  useInjectSaga({ key: 'reportProblem', saga });
  const [flag, setFlag] = useState(false);
  const [idReportProblemAction, setIdReportProblemAction] = useState('');

  const [frontIdFile, setFrontIdFile] = useState('');
  const [frontIdAction, setFrontIdAction] = useState('');

  useEffect(() => {
    const payload = {
      id,
    };
    props.getJobDetail(payload);
  }, [flag]);

  const { reportProblemData = {}, fileSuccess = {} } = props.reportProblem;
  const validateForm = Yup.object().shape({
    description: Yup.string().required('Vui lòng nhập nội dung'),
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
      '0123456789QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm';
    const ma = `${getRandomString(12, baseString)}`;
    return ma;
  };

  const dateNow = new Date();
  const {
    idReportProblem = '',
    motelRoom = '',
    user = '',
    room = '',
    status = 'Chờ tiếp nhận',
    description = '',
    image = '',
    dateReportProblem = moment(dateNow).format('DD/MM/YYYY'),
    IdUser = '',
    IdRoom = '',
    IdMotelRoom = '',
  } = reportProblemData;

  const config = {
    headers: {
      Authorization: `Bearer ${localStoreService.get('user').token}`,
    },
  };

  const downloadFile = async payload => {
    const requestUrl = urlLink.api.serverUrl + urlLink.api.reportProblem;
    try {
      const response = await axios.post(requestUrl, payload, config);
      setIdReportProblemAction(response.data.data._id);
      if (frontIdAction) {
        frontIdAction.id = response.data.data._id;
        // call image
        const { id, formData } = frontIdAction;

        const requestUrl =
          urlLink.api.serverUrl + urlLink.api.reportProblem + 'img/' + id;
        const config = {
          headers: {
            'content-type': 'multipart/form-data',
            Authorization: `Bearer ${localStoreService.get('user').token}`,
          },
        };
        try {
          const response = await axios.post(requestUrl, formData, config);
          if (response.data.data.images) {
            history.push('/profile');
          }
        } catch (err) {
          console.error(err);
        }
      } else {
        history.push('/profile');
      }
    } catch (err) {
      setFlag(!flag);
    }
  };

  const handleFileInputChangeFront = e => {
    const TenMegaBytes = 10 * 1024 * 1024;
    const abcfile = e.target.files[0];
    // check mb file size
    if (abcfile.size <= TenMegaBytes) {
      const formData = new FormData();
      formData.append('file', abcfile);
      try {
        const data = {
          // eslint-disable-next-line no-underscore-dangle
          id: idReportProblemAction,
          formData,
        };
        setFrontIdAction(data);
        setFrontIdFile(URL.createObjectURL(abcfile));
        // eslint-disable-next-line no-empty
      } catch (error) { }
    }
  };

  return (
    <div className="login-page-wrapper">
      <Helmet>
        <title>Report Problem</title>
        <meta name="description" content="Description of ReportProblem" />
      </Helmet>
      <div className="user-profileUpdate">
        <div
          className="header-profile-paper"
          style={{ paddingBottom: 0 }}
        >
          <div className='report-title'>
            Thông tin báo cáo sự cố
          </div>
          <Container>

            <Formik
              initialValues={{
                idReportProblem: getRandomHex2(),
                dateReportProblem,
                motelRoom,
                user,
                room,
                status,
                description,
                image,
              }}
              enableReinitialize
              validationSchema={validateForm}
              onSubmit={evt => {
                const data = { ...evt, IdMotelRoom, IdRoom, IdUser };
                console.log({data});
                downloadFile(data);
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


                    <Row className="infor" style={{ paddingTop: '20px' }}>
                      <Col md={3}>
                        {
                          <FormattedMessage {...messages.idReportProblem}>
                            {msg => (
                              <InputForm
                                label={
                                  <FormattedMessage
                                    {...messages.idReportProblem}
                                  />
                                }
                                placeholder={msg}
                                disabled
                                name="idReportProblem"
                                icon="fa fa-user"
                                value={values.idReportProblem}
                                touched={touched.idReportProblem}
                                error={errors.idReportProblem}
                                autoComplete="idReportProblem"
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
                          <FormattedMessage {...messages.dateReportProblem}>
                            {msg => (
                              <InputForm
                                label={
                                  <FormattedMessage
                                    {...messages.dateReportProblem}
                                  />
                                }
                                placeholder={msg}
                                disabled
                                name="dateReportProblem"
                                icon="fa fa-user"
                                value={values.dateReportProblem}
                                touched={touched.dateReportProblem}
                                error={errors.dateReportProblem}
                                autoComplete="dateReportProblem"
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
                          <FormattedMessage {...messages.motelRoom}>
                            {msg => (
                              <InputForm
                                label={
                                  <FormattedMessage {...messages.motelRoom} />
                                }
                                placeholder={msg}
                                disabled
                                name="motelRoom"
                                icon="fa fa-user"
                                value={values.motelRoom}
                                touched={touched.motelRoom}
                                error={errors.motelRoom}
                                autoComplete="motelRoom"
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
                          <FormattedMessage {...messages.user}>
                            {msg => (
                              <InputForm
                                label={
                                  <FormattedMessage {...messages.user} />
                                }
                                placeholder={msg}
                                disabled
                                name="user"
                                icon="fa fa-user"
                                value={values.user}
                                touched={touched.user}
                                error={errors.user}
                                autoComplete="user"
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
                          <FormattedMessage {...messages.room}>
                            {msg => (
                              <InputForm
                                label={
                                  <FormattedMessage {...messages.room} />
                                }
                                placeholder={msg}
                                disabled
                                name="room"
                                icon="fa fa-user"
                                value={values.room}
                                touched={touched.room}
                                error={errors.room}
                                autoComplete="room"
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
                          <FormattedMessage {...messages.status}>
                            {msg => (
                              <InputForm
                                label={
                                  <FormattedMessage {...messages.status} />
                                }
                                placeholder={msg}
                                disabled
                                name="status"
                                icon="fa fa-user"
                                value={values.status}
                                touched={touched.status}
                                error={errors.status}
                                autoComplete="status"
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
                          <FormattedMessage {...messages.description}>
                            {msg => (
                              <InputForm
                                label={
                                  <FormattedMessage
                                    {...messages.description}
                                  />
                                }
                                placeholder={msg}
                                name="description"
                                icon="fa fa-user"
                                value={values.description}
                                touched={touched.description}
                                error={errors.description}
                                autoComplete="description"
                                onChange={evt => {
                                  handleChange(evt);
                                }}
                                onBlur={handleBlur}
                              />
                            )}
                          </FormattedMessage>
                        }
                      </Col>
                      <Col md={3} />
                    </Row>
                    <Row>
                      <Col md={6}>
                        {
                          <FormattedMessage {...messages.image}>
                            {msg => (
                              <InputForm
                                label={<FormattedMessage {...messages.image} />}
                                placeholder={msg}
                                name="image"
                                accept=".png, .jpg"
                                type="file"
                                autoComplete="image"
                                onChange={evt => {
                                  handleFileInputChangeFront(evt);
                                }}
                              />
                            )}
                          </FormattedMessage>
                        }
                      </Col>
                      <Col md={6}>
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
                              width: '200px',
                              height: '100px',
                              margin: '10px auto',
                            }}
                            variant="square"
                            alt="Avatar"
                            src={image}
                          >
                            Image
                          </Avatar>
                        )}
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <div className="submit-forgot-password">
                          <Button
                            color="primary"
                            type="submit"
                            className="btn-submit"
                          >
                            Gửi Báo Cáo
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </form>
                </div>
              )}
            </Formik>

          </Container>
        </div>
      </div>
    </div>
  );
}

ReportProblem.propTypes = {
  getJobDetail: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  reportProblem: makeSelectReportProblem(),
});

function mapDispatchToProps(dispatch) {
  return {
    getJobDetail: payload => {
      dispatch(getJobDetail(payload));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ReportProblem);
