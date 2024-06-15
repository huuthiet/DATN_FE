/**
 *
 * MoneyInformationDetail
 *
 */

import axios from 'axios';
import localStoreService from 'local-storage';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { useParams } from 'react-router';
import Select from 'react-select';
import { Button, Col, Container, Row } from 'reactstrap';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import InputForm from '../../components/InputForm';
import { urlLink } from '../../helper/route';
import {
  addBank,
  changeStoreData,
  editBank,
  getDetailBank,
  getMasterDataBank,
} from './actions';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import makeSelectMoneyInformationDetail from './selectors';
import './style.scss';
import * as Yup from 'yup';
import { Formik } from 'formik';

const validateForm = Yup.object().shape({
  stkField: Yup.string().required('Số tài khoản là bắt buộc'),
  nameTkField: Yup.string().required('Tên tài khoản là bắt buộc'),
  bankField: Yup.string().required('Ngân hàng là bắt buộc'),
  branchField: Yup.string().required('Chi nhánh là bắt buộc'),
  nameTkLableField: Yup.string().required('Tên ngân hàng là bắt buộc'),
});

export function MoneyInformationDetail(props) {
  useInjectReducer({ key: 'moneyInformationDetail', reducer });
  useInjectSaga({ key: 'moneyInformationDetail', saga });

  const { id = '' } = useParams();
  const [flagAddAndEdit, setFlagAddAndEdit] = useState(false);
  const {
    moneyInformationDetail = {},
    options = [],
  } = props.moneyInformationDetail;

  const [submitAction, setSubmitAction] = useState(false);
  const TenMegaBytes = 10 * 1024 * 1024;
  const [loading, setLoading] = useState(false);
  const [urlImgCloud, setUrlImgCloud] = useState('');

  const apiPostImg = async payload => {
    const { id, formData } = payload;
    const requestUrl = `${urlLink.api.serverUrl}/v1/uploading` + `/img/${id}`;
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
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleFileInputChange = e => {
    setSubmitAction(true);
    const abcfile = e.target.files[0];
    // check mb file size
    if (abcfile.size <= TenMegaBytes) {
      setSubmitAction(false);
      const formData = new FormData();
      formData.append('file', abcfile);
      setLoading(true);
      try {
        const data = {
          id,
          formData,
        };
        apiPostImg(data);
      } catch (error) { }
    }
  };

  useEffect(() => {
    props.getMasterDataBank();
  }, []);

  const {
    stk = '',
    nameTk = '',
    bank = '',
    branch = '',
    nameTkLable = '',
    imgView = '',
    images = [],
  } = moneyInformationDetail;

  console.log({ moneyInformationDetail });

  useEffect(() => {
    if (id === 'add') {
      console.log('options in add', options);
      // no call
      setFlagAddAndEdit(true);
      moneyInformationDetail.stk = '';
      moneyInformationDetail.nameTk = '';
      //Cố định 1 ngân hàng mặc định
      moneyInformationDetail.bank = 'BIDV';
      moneyInformationDetail.nameTkLable =
        'Ngân hàng Đầu tư và Phát triển Việt Nam (BIDV)';

      moneyInformationDetail.branch = '';
      moneyInformationDetail.images = [];
    } else {
      setFlagAddAndEdit(false);
      // call detail
      props.getDetailBank(id);
      // eslint-disable-next-line func-names
    }
  }, []);

  return (
    <div className="motel-detail-wrapper">
      <Helmet>
        <title>MoneyInformationDetail</title>
        <meta
          name="description"
          content="Description of MoneyInformationDetail"
        />
      </Helmet>

      <Container>

        <Formik
          initialValues={{
            stkField: stk,
            nameTkField: nameTk,
            bankField: bank,
            branchField: branch,
            nameTkLableField: nameTkLable,
          }}
          enableReinitialize
          validationSchema={validateForm}
          onSubmit={evt => {
            // props.postSignIn(evt);
            const requestData = {
              bank: evt.bankField,
              branch: evt.branchField,
              nameTk: evt.nameTkField,
              nameTkLable: evt.nameTkLableField,
              stk: evt.stkField,
              id,
              urlImgCloud,
              images,
              imgView,
            };
            console.log({ requestData });
            // eslint-disable-next-line no-unused-expressions
            flagAddAndEdit
              ? props.addBank(requestData)
              : props.editBank(requestData);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            setValues,
          }) => (
            <form onSubmit={handleSubmit} className='form-content'>
              <div className="title mb-3">
                <h3>
                  {flagAddAndEdit ? (
                    <FormattedMessage {...messages.addBank} />
                  ) : (
                    <FormattedMessage {...messages.updateBank} />
                  )}
                </h3>
              </div>
              <Row className="infor">
                <Col xs={6}>
                  {
                    <FormattedMessage {...messages.stk}>
                      {msg => (
                        <InputForm
                          label={<FormattedMessage {...messages.stk} />}
                          placeholder={msg}
                          name="stkField"
                          autoComplete="stkField"
                          icon="fa fa-user"
                          touched={touched.stkField}
                          error={errors.stkField}
                          onChange={evt => {
                            handleChange(evt);
                          }}
                          onBlur={handleBlur}
                          value={values.stkField}
                        />
                      )}
                    </FormattedMessage>
                  }
                </Col>
                <Col xs={6}>
                  {
                    <FormattedMessage {...messages.nameTk}>
                      {msg => (
                        <InputForm
                          label={<FormattedMessage {...messages.nameTk} />}
                          placeholder={msg}
                          name="nameTkField"
                          icon="fa fa-user"
                          autoComplete="nameTkField"
                          touched={touched.nameTkField}
                          error={errors.nameTkField}
                          onChange={evt => {
                            handleChange(evt);
                          }}
                          onBlur={handleBlur}
                          value={values.nameTkField}
                        />
                      )}
                    </FormattedMessage>
                  }
                </Col>
                <Col xs={6}>
                  {
                    <FormattedMessage {...messages.bank}>
                      {msg => (
                        <div>
                          <label style={{ fontSize: '15px', fontWeight: 700 }}>
                            <FormattedMessage {...messages.bank} />
                          </label>
                          <Select
                            key={options}
                            placeholder={nameTkLable}
                            // value={values.nameTkLableField}
                            options={options}
                            className="mb-3"
                            onChange={evt => {
                              console.log({ evt });
                              setValues({
                                ...values,
                                nameTkLableField: evt.label,
                                bankField: evt.value,
                              });
                            }}
                            onBlur={handleBlur}
                            touched={touched.nameTkLable}
                            defaultValue={values.nameTkLableField}
                          />
                          <div style={{ color: 'red', fontSize: '10px' }}>
                            {errors.nameTkLable}
                          </div>
                        </div>
                      )}
                    </FormattedMessage>
                  }
                </Col>
                <Col xs={6}>
                  {
                    <FormattedMessage {...messages.branch}>
                      {msg => (
                        <InputForm
                          label={<FormattedMessage {...messages.branch} />}
                          placeholder={msg}
                          name="branchField"
                          icon="fa fa-user"
                          autoComplete="branchField"
                          onChange={evt => {
                            handleChange(evt);
                          }}
                          onBlur={handleBlur}
                          touched={touched.branchField}
                          error={errors.branchField}
                          value={values.branchField}
                        />
                      )}
                    </FormattedMessage>
                  }
                </Col>

                <Col xs={6}>
                  <Button
                    color="primary"
                    className="btn-block mt-2"
                    type="submit"
                  // onClick={() => {
                  //   const temp = {
                  //     ...moneyInformationDetail,
                  //     id,
                  //     urlImgCloud,
                  //   };
                  //   // eslint-disable-next-line no-unused-expressions
                  //   flagAddAndEdit
                  //     ? props.addBank(temp)
                  //     : props.editBank(temp);
                  // }}
                  >
                    {flagAddAndEdit ? (
                      <FormattedMessage {...messages.addBank} />
                    ) : (
                      <FormattedMessage {...messages.updateBank} />
                    )}
                  </Button>
                </Col>
              </Row>
            </form>
          )}
        </Formik>
      </Container>
    </div>
  );
}

MoneyInformationDetail.propTypes = {
  dispatch: PropTypes.func,
  addBank: PropTypes.func,
  getMasterDataBank: PropTypes.func,
  editBank: PropTypes.func,
  changeStoreData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  moneyInformationDetail: makeSelectMoneyInformationDetail(),
});

function mapDispatchToProps(dispatch) {
  return {
    changeStoreData: (key, value) => {
      dispatch(changeStoreData(key, value));
    },
    addBank: data => {
      dispatch(addBank(data));
    },
    getMasterDataBank: data => {
      dispatch(getMasterDataBank(data));
    },
    editBank: data => {
      dispatch(editBank(data));
    },
    getDetailBank: data => {
      dispatch(getDetailBank(data));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(MoneyInformationDetail);
