/**
 *
 * UpdateRoom
 *
 */

import React, { useEffect, useState } from 'react';
import uuid from 'react-uuid';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useParams } from 'react-router';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Container, Row, Col, Button } from 'reactstrap';
import * as Yup from 'yup';
import { Formik } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import makeSelectUpdateRoom from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getRoom } from '../RoomDetail/actions';
import InputForm from '../../components/InputForm';
import RadioButton from '../../components/RadioButton';
import CheckBox from '../../components/CheckBox';
import ImageView from '../../components/ImageView';
import './style.scss';

import { changeStoreData, deleteRoom, removeImage } from './actions';
import SuccessPopup from '../../components/SuccessPopup';
import WarningPopup from '../../components/WarningPopup';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

const validateForm = Yup.object().shape({
  name: Yup.string().required('Vui lòng nhập tên'),
  acreage: Yup.string().required('Vui lòng nhập diện tích'),
  price: Yup.string().required('Vui lòng nhập giá phòng'),
  waterPrice: Yup.string().required('Vui lòng nhập giá mước'),
  electricityPrice: Yup.string().required('Vui lòng nhập giá điện'),
});

export function UpdateRoom(props) {
  const { id } = useParams();
  useInjectReducer({ key: 'updateRoom', reducer });
  useInjectSaga({ key: 'updateRoom', saga });
  useEffect(() => {
    props.getRoom(id);
  }, []);
  const {
    room = {},
    showSuccessPopup,
    showDelete,
    content,
    images,
  } = props.updateRoom;
  const {
    availableDate = new Date(),
    unavailableDate = new Date(),
    utilities = [],
    name = '',
    price = '',
    electricityPrice = '',
    waterPrice = '',
    acreage = '',
    status = '',
  } = room;
  const [utilitie, setUtilitie] = useState([]);
  useEffect(() => {
    setUtilitie(utilities);
  }, [utilities]);
  const onImageChange = e => {
    e.preventDefault();
  };
  return (
    <div className="update-room-wrapper">
      <Helmet>
        <title>UpdateRoom</title>
        <meta name="description" content="Description of UpdateRoom" />
      </Helmet>
      <Formik
        initialValues={{
          availableDate: moment(availableDate).toDate(),
          unavailableDate: moment(unavailableDate).toDate(),
          name,
          price,
          electricityPrice,
          waterPrice,
          acreage,
          id,
          status,
        }}
        enableReinitialize
        validationSchema={validateForm}
        onSubmit={() => { }}
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
                <div className="room-detail">
                  <Row>
                    <Col xs={5}>
                      <InputForm
                        label="Phòng số"
                        name="name"
                        value={values.name}
                        touched={touched.name}
                        error={errors.name}
                        onChange={evt => {
                          handleChange(evt);
                        }}
                        onBlur={handleBlur}
                      />
                    </Col>
                    <Col xs={5}>
                      <InputForm
                        label="Diện tích"
                        name="acreage"
                        type="number"
                        value={values.acreage}
                        touched={touched.acreage}
                        error={errors.acreage}
                        onChange={evt => {
                          handleChange(evt);
                        }}
                        onBlur={handleBlur}
                      />
                    </Col>
                    <Col xs={2}>
                      <Button
                        className="btn-delete"
                        color="warning"
                        onClick={() => {
                          props.changeStoreData(
                            'content',
                            'Bạn thực sự muốn xóa?',
                          );
                          props.changeStoreData('showDelete', true);
                        }}
                      >
                        <i className="fa fa-trash" />
                      </Button>
                    </Col>
                    <Col xs={6}>
                      <InputForm
                        label="Thêm ảnh"
                        type="file"
                        accept=".png, .jpg"
                        multiple="true"
                        onChange={e => {
                          onImageChange(e);
                        }}
                      />
                    </Col>
                    <Col xs={6}>
                      <InputForm
                        label="Giá phòng"
                        name="price"
                        type="number"
                        value={values.price}
                        touched={touched.price}
                        error={errors.price}
                        onChange={evt => {
                          handleChange(evt);
                        }}
                        onBlur={handleBlur}
                      />
                    </Col>
                    {images.map(item => (
                      <ImageView
                        removeImage={() => {
                          props.removeImage(item);
                        }}
                        key={uuid()}
                        src={item}
                      />
                    ))}
                    <Col xs={12}>
                      <InputForm label="Mã khóa (nếu có)" />
                    </Col>
                    <Col xs={6}>
                      <InputForm
                        name="electricityPrice"
                        label="Giá điện"
                        type="number"
                        value={values.electricityPrice}
                        touched={touched.electricityPrice}
                        error={errors.electricityPrice}
                        onChange={evt => {
                          handleChange(evt);
                        }}
                        onBlur={handleBlur}
                      />
                    </Col>
                    <Col xs={6}>
                      <InputForm
                        name="waterPrice"
                        label="Giá nước"
                        type="number"
                        value={values.waterPrice}
                        touched={touched.waterPrice}
                        error={errors.waterPrice}
                        onChange={evt => {
                          handleChange(evt);
                        }}
                        onBlur={handleBlur}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={4}>
                      <RadioButton
                        label="Còn trống"
                        name="status"
                        value="available"
                        checked={status === 'available' || status === 'unknown'}
                        onChange={evt => {
                          props.changeStoreData(
                            ['room', 'status'],
                            evt.target.value,
                          );
                        }}
                      />
                    </Col>
                    {status === 'available' && (
                      <Col xs={4}>
                        <DatePicker
                          dateFormat="dd/MM/yyyy"
                          selected={values.availableDate}
                          onChange={date => {
                            props.changeStoreData(
                              ['room', 'availableDate'],
                              date,
                            );
                          }}
                          customInput={<InputForm />}
                        />
                      </Col>
                    )}
                  </Row>
                  <Row>
                    <Col xs={4}>
                      <RadioButton
                        label="Đặt cọc"
                        name="status"
                        value="deposited"
                        checked={status === 'deposited'}
                        onChange={evt => {
                          props.changeStoreData(
                            ['room', 'status'],
                            evt.target.value,
                          );
                        }}
                      />
                    </Col>
                    {status === 'deposited' && (
                      <Col xs={4}>
                        <DatePicker
                          dateFormat="dd/MM/yyyy"
                          selected={values.availableDate}
                          onChange={date => {
                            props.changeStoreData(
                              ['room', 'availableDate'],
                              date,
                            );
                          }}
                          customInput={<InputForm />}
                        />
                      </Col>
                    )}
                    {status === 'deposited' && (
                      <Col xs={4}>
                        <DatePicker
                          dateFormat="dd/MM/yyyy"
                          selected={values.unavailableDate}
                          onChange={date => {
                            props.changeStoreData(
                              ['room', 'unavailableDate'],
                              date,
                            );
                          }}
                          customInput={<InputForm />}
                        />
                      </Col>
                    )}
                  </Row>
                  <Row>
                    <Col xs={4}>
                      <RadioButton
                        label="Đã thuê"
                        name="status"
                        value="rented"
                        checked={status === 'rented'}
                        onChange={evt => {
                          props.changeStoreData(
                            ['room', 'status'],
                            evt.target.value,
                          );
                        }}
                      />
                    </Col>
                    {status === 'rented' && (
                      <Col xs={4}>
                        <DatePicker
                          dateFormat="dd/MM/yyyy"
                          selected={values.availableDate}
                          onChange={date => {
                            props.changeStoreData(
                              ['room', 'availableDate'],
                              date,
                            );
                          }}
                          customInput={<InputForm />}
                        />
                      </Col>
                    )}
                    {status === 'rented' && (
                      <Col xs={4}>
                        <DatePicker
                          dateFormat="dd/MM/yyyy"
                          selected={values.unavailableDate}
                          onChange={date => {
                            props.changeStoreData(
                              ['room', 'unavailableDate'],
                              date,
                            );
                          }}
                          customInput={<InputForm />}
                        />
                      </Col>
                    )}
                  </Row>
                  <div>Thông tin tiện ích</div>
                  <Row>
                    <Col xs={4}>
                      <CheckBox
                        label="Internet"
                        checked={utilitie.indexOf('wifi') !== -1}
                        onChange={e => {
                          const index = utilitie.indexOf('wifi');
                          if (e.target.checked) {
                            if (index === -1) {
                              const newArr = [...utilitie];
                              newArr.push('wifi');
                              setUtilitie(newArr);
                            }
                          } else if (index !== -1) {
                            const newArr = [...utilitie];
                            newArr.splice(index, 1);
                            setUtilitie(newArr);
                          }
                        }}
                      />
                    </Col>
                    <Col xs={4}>
                      <CheckBox
                        label="Giặt sấy"
                        checked={utilitie.indexOf('giat_ui') !== -1}
                        onChange={e => {
                          const index = utilitie.indexOf('giat_ui');
                          if (e.target.checked) {
                            if (index === -1) {
                              const newArr = [...utilitie];
                              newArr.push('giat_ui');
                              setUtilitie(newArr);
                            }
                          } else if (index !== -1) {
                            const newArr = [...utilitie];
                            newArr.splice(index, 1);
                            setUtilitie(newArr);
                          }
                        }}
                      />
                    </Col>
                    <Col xs={4}>
                      <CheckBox
                        label="Giữ xe"
                        checked={utilitie.indexOf('giu_xe') !== -1}
                        onChange={e => {
                          const index = utilitie.indexOf('giu_xe');
                          if (e.target.checked) {
                            if (index === -1) {
                              const newArr = [...utilitie];
                              newArr.push('giu_xe');
                              setUtilitie(newArr);
                            }
                          } else if (index !== -1) {
                            const newArr = [...utilitie];
                            newArr.splice(index, 1);
                            setUtilitie(newArr);
                          }
                        }}
                      />
                    </Col>
                    <Col xs={4}>
                      <CheckBox
                        label="Truyền hình"
                        checked={utilitie.indexOf('truyen_hinh') !== -1}
                        onChange={e => {
                          const index = utilitie.indexOf('truyen_hinh');
                          if (e.target.checked) {
                            if (index === -1) {
                              const newArr = [...utilitie];
                              newArr.push('truyen_hinh');
                              setUtilitie(newArr);
                            }
                          } else if (index !== -1) {
                            const newArr = [...utilitie];
                            newArr.splice(index, 1);
                            setUtilitie(newArr);
                          }
                        }}
                      />
                    </Col>
                    <Col xs={4}>
                      <CheckBox
                        label="Điều hòa"
                        checked={utilitie.indexOf('dieu_hoa') !== -1}
                        onChange={e => {
                          const index = utilitie.indexOf('dieu_hoa');
                          if (e.target.checked) {
                            if (index === -1) {
                              const newArr = [...utilitie];
                              newArr.push('dieu_hoa');
                              setUtilitie(newArr);
                            }
                          } else if (index !== -1) {
                            const newArr = [...utilitie];
                            newArr.splice(index, 1);
                            setUtilitie(newArr);
                          }
                        }}
                      />
                    </Col>
                    <Col xs={4}>
                      <CheckBox
                        label="Bồn cầu"
                        checked={utilitie.indexOf('bon_cau') !== -1}
                        onChange={e => {
                          const index = utilitie.indexOf('bon_cau');
                          if (e.target.checked) {
                            if (index === -1) {
                              const newArr = [...utilitie];
                              newArr.push('bon_cau');
                              setUtilitie(newArr);
                            }
                          } else if (index !== -1) {
                            const newArr = [...utilitie];
                            newArr.splice(index, 1);
                            setUtilitie(newArr);
                          }
                        }}
                      />
                    </Col>
                    <Col xs={4}>
                      <CheckBox
                        label="Gác lững"
                        checked={utilitie.indexOf('gac_lung') !== -1}
                        onChange={e => {
                          const index = utilitie.indexOf('gac_lung');
                          if (e.target.checked) {
                            if (index === -1) {
                              const newArr = [...utilitie];
                              newArr.push('gac_lung');
                              setUtilitie(newArr);
                            }
                          } else if (index !== -1) {
                            const newArr = [...utilitie];
                            newArr.splice(index, 1);
                            setUtilitie(newArr);
                          }
                        }}
                      />
                    </Col>
                    <Col xs={4}>
                      <CheckBox
                        label="Bồn rữa mặt"
                        checked={utilitie.indexOf('bon_rua_mat') !== -1}
                        onChange={e => {
                          const index = utilitie.indexOf('bon_rua_mat');
                          if (e.target.checked) {
                            if (index === -1) {
                              const newArr = [...utilitie];
                              newArr.push('bon_rua_mat');
                              setUtilitie(newArr);
                            }
                          } else if (index !== -1) {
                            const newArr = [...utilitie];
                            newArr.splice(index, 1);
                            setUtilitie(newArr);
                          }
                        }}
                      />
                    </Col>
                    <Col xs={4}>
                      <CheckBox
                        label="Dọn phòng"
                        checked={utilitie.indexOf('don_phong') !== -1}
                        onChange={e => {
                          const index = utilitie.indexOf('don_phong');
                          if (e.target.checked) {
                            if (index === -1) {
                              const newArr = [...utilitie];
                              newArr.push('don_phong');
                              setUtilitie(newArr);
                            }
                          } else if (index !== -1) {
                            const newArr = [...utilitie];
                            newArr.splice(index, 1);
                            setUtilitie(newArr);
                          }
                        }}
                      />
                    </Col>
                    <Col xs={4}>
                      <CheckBox
                        label="Sàn gỗ"
                        checked={utilitie.indexOf('san_go') !== -1}
                        onChange={e => {
                          const index = utilitie.indexOf('san_go');
                          if (e.target.checked) {
                            if (index === -1) {
                              const newArr = [...utilitie];
                              newArr.push('san_go');
                              setUtilitie(newArr);
                            }
                          } else if (index !== -1) {
                            const newArr = [...utilitie];
                            newArr.splice(index, 1);
                            setUtilitie(newArr);
                          }
                        }}
                      />
                    </Col>
                    <Col xs={4}>
                      <CheckBox
                        label="Tủ quần áo"
                        checked={utilitie.indexOf('tu_quan_ao') !== -1}
                        onChange={e => {
                          const index = utilitie.indexOf('tu_quan_ao');
                          if (e.target.checked) {
                            if (index === -1) {
                              const newArr = [...utilitie];
                              newArr.push('tu_quan_ao');
                              setUtilitie(newArr);
                            }
                          } else if (index !== -1) {
                            const newArr = [...utilitie];
                            newArr.splice(index, 1);
                            setUtilitie(newArr);
                          }
                        }}
                      />
                    </Col>
                    <Col xs={4}>
                      <CheckBox
                        label={<FormattedMessage {...messages.shower} />}
                        checked={utilitie.indexOf('voi_hoa_sen') !== -1}
                        onChange={e => {
                          const index = utilitie.indexOf('voi_hoa_sen');
                          if (e.target.checked) {
                            if (index === -1) {
                              const newArr = [...utilitie];
                              newArr.push('voi_hoa_sen');
                              setUtilitie(newArr);
                            }
                          } else if (index !== -1) {
                            const newArr = [...utilitie];
                            newArr.splice(index, 1);
                            setUtilitie(newArr);
                          }
                        }}
                      />
                    </Col>
                    <Col xs={4}>
                      <CheckBox
                        label={<FormattedMessage {...messages.FreeTime} />}
                        checked={utilitie.indexOf('gio_giac_tu_do') !== -1}
                        onChange={e => {
                          const index = utilitie.indexOf('gio_giac_tu_do');
                          if (e.target.checked) {
                            if (index === -1) {
                              const newArr = [...utilitie];
                              newArr.push('gio_giac_tu_do');
                              setUtilitie(newArr);
                            }
                          } else if (index !== -1) {
                            const newArr = [...utilitie];
                            newArr.splice(index, 1);
                            setUtilitie(newArr);
                          }
                        }}
                      />
                    </Col>
                    <Col xs={4}>
                      <CheckBox
                        label={<FormattedMessage {...messages.PrivateEntrance} />}
                        checked={utilitie.indexOf('loi_di_rieng') !== -1}
                        onChange={e => {
                          const index = utilitie.indexOf('loi_di_rieng');
                          if (e.target.checked) {
                            if (index === -1) {
                              const newArr = [...utilitie];
                              newArr.push('loi_di_rieng');
                              setUtilitie(newArr);
                            }
                          } else if (index !== -1) {
                            const newArr = [...utilitie];
                            newArr.splice(index, 1);
                            setUtilitie(newArr);
                          }
                        }}
                      />
                    </Col>
                  </Row>
                  <Button color="primary" className="btn-block" type="submit">
                    <FormattedMessage {...messages.UpdateRoom} />
                  </Button>
                </div>
              </Container>
            </form>
          </div>
        )}
      </Formik>
      <SuccessPopup
        content={content}
        visible={showSuccessPopup}
        toggle={() => {
          props.changeStoreData('showSuccessPopup', !showSuccessPopup);
        }}
      />
      <WarningPopup
        visible={showDelete}
        content={content}
        callBack={() => props.deleteRoom(id)}
        toggle={() => {
          props.changeStoreData('showDelete', false);
        }}
      />
    </div>
  );
}

UpdateRoom.propTypes = {
  updateRoom: PropTypes.object,
  getRoom: PropTypes.func,
  removeImage: PropTypes.func,
  changeStoreData: PropTypes.func,
  deleteRoom: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  updateRoom: makeSelectUpdateRoom(),
});

function mapDispatchToProps(dispatch) {
  return {
    getRoom: id => {
      dispatch(getRoom(id));
    },
    deleteRoom: id => {
      dispatch(deleteRoom(id));
    },
    changeStoreData: (key, value) => {
      dispatch(changeStoreData(key, value));
    },
    removeImage: image => {
      dispatch(removeImage(image));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(UpdateRoom);
