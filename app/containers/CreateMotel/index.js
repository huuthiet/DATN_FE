/**
 *
 * CreateMotel
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
import { Container, Button, Col, Row } from 'reactstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import makeSelectCreateMotel from './selectors';
import reducer from './reducer';
import saga from './saga';
import './style.scss';
import InputForm from '../../components/InputForm';

import 'react-datepicker/dist/react-datepicker.css';
import InputLocation from '../../components/InputLocation';
import CheckBox from '../../components/CheckBox';
import { useHistory } from 'react-router-dom';
import { postMotel, changeStoreData } from './actions';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

// import SuccessPopup from '../../components/SuccessPopup';

const validateForm = Yup.object().shape({
  name: Yup.string().required(<FormattedMessage {...messages.errorName} />),
  address: Yup.string().required(
    <FormattedMessage {...messages.errorAddress} />,
  ),
  minPrice: Yup.string().required(
    <FormattedMessage {...messages.errorMinPrice} />,
  ),
  maxPrice: Yup.string().required(
    <FormattedMessage {...messages.errorMaxPrice} />,
  ),
  roomAcreage: Yup.string().required(
    <FormattedMessage {...messages.errorRoomAcreage} />,
  ),
  contactPhone: Yup.string().required(
    <FormattedMessage {...messages.errorContactPhone} />,
  ),
  description: Yup.string().required(
    <FormattedMessage {...messages.errorDescription} />,
  ),
  electricityPrice: Yup.string().required(
    <FormattedMessage {...messages.erroreLectricityPrice} />,
  ),
  waterPrice: Yup.string().required(
    <FormattedMessage {...messages.errorWaterPrice} />,
  ),
  wifiPrice: Yup.string().required(
    <FormattedMessage {...messages.errorwifiPrice} />,
  ),
  garbagePrice: Yup.string().required(
    <FormattedMessage {...messages.errorgarbagePrice} />,
  ),
});

export function CreateMotel(props) {
  useInjectReducer({ key: 'createMotel', reducer });
  useInjectSaga({ key: 'createMotel', saga });
  const [floors, setFloors] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [rentedRoom, setRentedRoom] = useState(0);
  const [depositedRoom, setDepositedRoom] = useState(0);
  const [availRoom, setAvailRoom] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const [utilities, setUtilities] = useState([]);
  const { action } = props.createMotel;
  const history = useHistory();

  const floorToList = listFloor => {
    if (listFloor && Number(listFloor) >= 0 && Number(listFloor) <= 20) {
      return Array(Number(listFloor)).fill(1);
    }
    return [1];
  };

  const listToFloor = listFloor => listFloor.reduce((a, b) => a + b, 0);

  const roomToList = avalRoom =>
    Array(avalRoom).fill({
      roomKey: 'F0-R0',
      availableDate: moment(new Date()).format('MM/DD/YYYY'),
    });

  useEffect(() => {
    setAvailRoom(listToFloor(floors) - rentedRoom - depositedRoom);
  }, [floors, rentedRoom, depositedRoom]);

  useEffect(() => {
    setRooms(roomToList(availRoom));
  }, [availRoom]);

  return (
    <div className="create-motel-wrapper">
      <Helmet>
        <title>CreateMotel</title>
        <meta name="description" content="Description of CreateMotel" />
      </Helmet>
      <Container>
        <div className="header">
          <FormattedMessage {...messages.AccommodationSize} />
        </div>
        <Formik
          initialValues={{
            name: '',
            address: '',
            contactPhone: '',
            floors,
            rentedRoom,
            depositedRoom,
            rooms,
            roomAcreage: 0,
            minPrice: 0,
            maxPrice: 0,
            electricityPrice: 0,
            waterPrice: 0,
            garbagePrice: 0,
            wifiPrice: 0,
            utilities,
            description: '',
          }}
          enableReinitialize
          validationSchema={validateForm}
          onSubmit={evt => {
            const temp = { ...evt, floors, utilities, rooms };
            props.postMotel(temp);
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
                <div
                  className="show"
                  // style={{ display: !showMore ? 'block' : 'none' }}
                >
                  {
                    <FormattedMessage {...messages.enterFloors}>
                      {msg => (
                        <InputForm
                          label={<FormattedMessage {...messages.floors} />}
                          placeholder={msg}
                          name="floors"
                          autoComplete="floors"
                          value={listToFloor(values.floors).length}
                          touched={touched.floors}
                          error={errors.floors}
                          type="number"
                          min={0}
                          onChange={evt => {
                            setFloors(floorToList(evt.target.value));
                          }}
                          onBlur={handleBlur}
                        />
                      )}
                    </FormattedMessage>
                  }
                  {values.floors.map((value, index) => (
                    <div key={index.toString()}>
                      {
                        <FormattedMessage {...messages.NumberquantityRoom}>
                          {msg => (
                            <InputForm
                              className="quantity-room"
                              /* eslint no-underscore-dangle: 0 */
                              value={values.floors[index]}
                              label={`${msg} ${index + 1}`}
                              type="number"
                              onChange={e => {
                                if (e.target.value) {
                                  const newArr = [...values.floors];
                                  newArr[index] = Number(e.target.value);
                                  setFloors(newArr);
                                } else {
                                  const newArr = [...values.floors];
                                  newArr[index] = 0;
                                  setFloors(newArr);
                                }
                              }}
                            />
                          )}
                        </FormattedMessage>
                      }
                    </div>
                  ))}
                  {/* {<FormattedMessage {...messages.quantityRoom}>
										{(msg) => (
											<InputForm
												label={msg}
												value={listToFloor(values.floors)}
												readOnly
											/>
										)}
									</FormattedMessage>} */}
                  {/* <div className="status-wrapper">
										{<FormattedMessage {...messages.enterRoom}>
											{(msg) => (
												<InputForm
													value={values.rentedRoom}
													touched={touched.rentedRoom}
													error={errors.rentedRoom}
													label={<FormattedMessage {...messages.rented} />}
													placeholder={msg}
													name="rentedRoom"
													autoComplete="rented-room"
													type="number"
													min={0}
													max={listToFloor(values.floors) - values.depositedRoom}
													onChange={evt => {
														setRentedRoom(evt.target.value);
													}}
													onBlur={handleBlur}
												/>
											)}
										</FormattedMessage>}
										<div className="status">
											<div className="red-box" />
										</div>
									</div>
									<div className="status-wrapper">
										{<FormattedMessage {...messages.enterFloors}>
											{(msg) => (
												<InputForm
													value={values.depositedRoom}
													touched={touched.depositedRoom}
													error={errors.depositedRoom}
													label={<FormattedMessage {...messages.deposited} />}
													placeholder={msg}
													name="depositedRoom"
													autoComplete="deposited-room"
													type="number"
													min={0}
													max={listToFloor(values.floors) - values.rentedRoom}
													onChange={evt => {
														setDepositedRoom(evt.target.value);
													}}
													onBlur={handleBlur}
												/>
											)}
										</FormattedMessage>}

										<div className="status">
											<div className="orange-box" />
										</div>
									</div>

									<div className="status-wrapper">
										<InputForm label={<FormattedMessage {...messages.roomAreAvailable} />} value={availRoom} readOnly />
										<div className="status">
											<div className="green-box" />
										</div>
									</div> */}
                  <div>
                    {
                      // values.rooms.map((item, index) => (
                      /* eslint no-underscore-dangle: 0 */
                      // <Row key={index.toString()}>
                      // 	<Col xs={3}>
                      // 		{<FormattedMessage {...messages.Floor}>
                      // 			{(msg) => (
                      // 				<InputForm
                      // 					label={msg}
                      // 					type="number"
                      // 					onChange={e => {
                      // 						const newArr = [...values.rooms];
                      // 						const str = newArr[index].roomKey.split('-');
                      // 						str[0] = `F${e.target.value}`;
                      // 						newArr[index] = {
                      // 							roomKey: `${str[0]}-${str[1]}`,
                      // 							availableDate: newArr[index].availableDate,
                      // 						};
                      // 						setRooms(newArr);
                      // 					}}
                      // 				// readOnly
                      // 				// value={index + 1}
                      // 				/>
                      // 			)}
                      // 		</FormattedMessage>}
                      // 	</Col>
                      // 	<Col xs={3}>
                      // 		<InputForm
                      // 			label={<FormattedMessage {...messages.Room} />}
                      // 			type="number"
                      // 			onChange={e => {
                      // 				const newArr = [...values.rooms];
                      // 				const str = newArr[index].roomKey.split('-');
                      // 				str[1] = `R${e.target.value}`;
                      // 				newArr[index] = {
                      // 					roomKey: `${str[0]}-${str[1]}`,
                      // 					availableDate: newArr[index].availableDate,
                      // 				};
                      // 				setRooms(newArr);
                      // 			}}
                      // 		/>
                      // 	</Col>
                      // 	<Col xs={6}>
                      // 		<DatePicker
                      // 			dateFormat="dd/MM/yyyy"
                      // 			selected={moment(
                      // 				values.rooms[index].availableDate,
                      // 				'MM/DD/YYYY',
                      // 			).toDate()}
                      // 			onChange={date => {
                      // 				const newArr = [...values.rooms];
                      // 				newArr[index] = {
                      // 					roomKey: newArr[index].roomKey,
                      // 					availableDate: moment(date).format('MM/DD/YYYY'),
                      // 				};
                      // 				setRooms(newArr);
                      // 			}}
                      // 			customInput={<InputForm label={<FormattedMessage {...messages.RoomAvailableFrom} />} />}
                      // 		/>
                      // 	</Col>
                      // </Row>
                      // ))
                    }
                  </div>

                  <Row>
                    <Col xs={4}>
                      <CheckBox
                        label="Internet"
                        onChange={e => {
                          const index = utilities.indexOf('wifi');
                          if (e.target.checked) {
                            if (index === -1) {
                              const newArr = [...utilities];
                              newArr.push('wifi');
                              setUtilities(newArr);
                            }
                          } else if (index !== -1) {
                            const newArr = [...utilities];
                            newArr.splice(index, 1);
                            setUtilities(newArr);
                          }
                        }}
                      />
                    </Col>
                    <Col xs={4}>
                      <CheckBox
                        label={<FormattedMessage {...messages.washingDrying} />}
                        onChange={e => {
                          const index = utilities.indexOf('giat_ui');
                          if (e.target.checked) {
                            if (index === -1) {
                              const newArr = [...utilities];
                              newArr.push('giat_ui');
                              setUtilities(newArr);
                            }
                          } else if (index !== -1) {
                            const newArr = [...utilities];
                            newArr.splice(index, 1);
                            setUtilities(newArr);
                          }
                        }}
                      />
                    </Col>
                    <Col xs={4}>
                      <CheckBox
                        label={<FormattedMessage {...messages.parkingLot} />}
                        onChange={e => {
                          const index = utilities.indexOf('giu_xe');
                          if (e.target.checked) {
                            if (index === -1) {
                              const newArr = [...utilities];
                              newArr.push('giu_xe');
                              setUtilities(newArr);
                            }
                          } else if (index !== -1) {
                            const newArr = [...utilities];
                            newArr.splice(index, 1);
                            setUtilities(newArr);
                          }
                        }}
                      />
                    </Col>
                    <Col xs={4}>
                      <CheckBox
                        label={<FormattedMessage {...messages.television} />}
                        onChange={e => {
                          const index = utilities.indexOf('truyen_hinh');
                          if (e.target.checked) {
                            if (index === -1) {
                              const newArr = [...utilities];
                              newArr.push('truyen_hinh');
                              setUtilities(newArr);
                            }
                          } else if (index !== -1) {
                            const newArr = [...utilities];
                            newArr.splice(index, 1);
                            setUtilities(newArr);
                          }
                        }}
                      />
                    </Col>
                    <Col xs={4}>
                      <CheckBox
                        label={
                          <FormattedMessage {...messages.AirConditioner} />
                        }
                        onChange={e => {
                          const index = utilities.indexOf('dieu_hoa');
                          if (e.target.checked) {
                            if (index === -1) {
                              const newArr = [...utilities];
                              newArr.push('dieu_hoa');
                              setUtilities(newArr);
                            }
                          } else if (index !== -1) {
                            const newArr = [...utilities];
                            newArr.splice(index, 1);
                            setUtilities(newArr);
                          }
                        }}
                      />
                    </Col>
                    <Col xs={4}>
                      <CheckBox
                        label={<FormattedMessage {...messages.toiletBowl} />}
                        onChange={e => {
                          const index = utilities.indexOf('bon_cau');
                          if (e.target.checked) {
                            if (index === -1) {
                              const newArr = [...utilities];
                              newArr.push('bon_cau');
                              setUtilities(newArr);
                            }
                          } else if (index !== -1) {
                            const newArr = [...utilities];
                            newArr.splice(index, 1);
                            setUtilities(newArr);
                          }
                        }}
                      />
                    </Col>
                    <Col xs={4}>
                      <CheckBox
                        label={<FormattedMessage {...messages.Mezzanine} />}
                        onChange={e => {
                          const index = utilities.indexOf('gac_lung');
                          if (e.target.checked) {
                            if (index === -1) {
                              const newArr = [...utilities];
                              newArr.push('gac_lung');
                              setUtilities(newArr);
                            }
                          } else if (index !== -1) {
                            const newArr = [...utilities];
                            newArr.splice(index, 1);
                            setUtilities(newArr);
                          }
                        }}
                      />
                    </Col>
                    <Col xs={4}>
                      <CheckBox
                        label={<FormattedMessage {...messages.washstand} />}
                        onChange={e => {
                          const index = utilities.indexOf('bon_rua_mat');
                          if (e.target.checked) {
                            if (index === -1) {
                              const newArr = [...utilities];
                              newArr.push('bon_rua_mat');
                              setUtilities(newArr);
                            }
                          } else if (index !== -1) {
                            const newArr = [...utilities];
                            newArr.splice(index, 1);
                            setUtilities(newArr);
                          }
                        }}
                      />
                    </Col>
                    <Col xs={4}>
                      <CheckBox
                        label={<FormattedMessage {...messages.clearTheRoom} />}
                        onChange={e => {
                          const index = utilities.indexOf('don_phong');
                          if (e.target.checked) {
                            if (index === -1) {
                              const newArr = [...utilities];
                              newArr.push('don_phong');
                              setUtilities(newArr);
                            }
                          } else if (index !== -1) {
                            const newArr = [...utilities];
                            newArr.splice(index, 1);
                            setUtilities(newArr);
                          }
                        }}
                      />
                    </Col>
                    <Col xs={4}>
                      <CheckBox
                        label={<FormattedMessage {...messages.WoodFloor} />}
                        onChange={e => {
                          const index = utilities.indexOf('san_go');
                          if (e.target.checked) {
                            if (index === -1) {
                              const newArr = [...utilities];
                              newArr.push('san_go');
                              setUtilities(newArr);
                            }
                          } else if (index !== -1) {
                            const newArr = [...utilities];
                            newArr.splice(index, 1);
                            setUtilities(newArr);
                          }
                        }}
                      />
                    </Col>
                    <Col xs={4}>
                      <CheckBox
                        label={<FormattedMessage {...messages.Wardrobe} />}
                        onChange={e => {
                          const index = utilities.indexOf('tu_quan_ao');
                          if (e.target.checked) {
                            if (index === -1) {
                              const newArr = [...utilities];
                              newArr.push('tu_quan_ao');
                              setUtilities(newArr);
                            }
                          } else if (index !== -1) {
                            const newArr = [...utilities];
                            newArr.splice(index, 1);
                            setUtilities(newArr);
                          }
                        }}
                      />
                    </Col>
                    <Col xs={4}>
                      <CheckBox
                        label={<FormattedMessage {...messages.shower} />}
                        onChange={e => {
                          const index = utilities.indexOf('voi_hoa_sen');
                          if (e.target.checked) {
                            if (index === -1) {
                              const newArr = [...utilities];
                              newArr.push('voi_hoa_sen');
                              setUtilities(newArr);
                            }
                          } else if (index !== -1) {
                            const newArr = [...utilities];
                            newArr.splice(index, 1);
                            setUtilities(newArr);
                          }
                        }}
                      />
                    </Col>
                    <Col xs={4}>
                      <CheckBox
                        label={<FormattedMessage {...messages.FreeTime} />}
                        onChange={e => {
                          const index = utilities.indexOf('gio_giac_tu_do');
                          if (e.target.checked) {
                            if (index === -1) {
                              const newArr = [...utilities];
                              newArr.push('gio_giac_tu_do');
                              setUtilities(newArr);
                            }
                          } else if (index !== -1) {
                            const newArr = [...utilities];
                            newArr.splice(index, 1);
                            setUtilities(newArr);
                          }
                        }}
                      />
                    </Col>
                    <Col xs={4}>
                      <CheckBox
                        label={
                          <FormattedMessage {...messages.PrivateEntrance} />
                        }
                        onChange={e => {
                          const index = utilities.indexOf('loi_di_rieng');
                          if (e.target.checked) {
                            if (index === -1) {
                              const newArr = [...utilities];
                              newArr.push('loi_di_rieng');
                              setUtilities(newArr);
                            }
                          } else if (index !== -1) {
                            const newArr = [...utilities];
                            newArr.splice(index, 1);
                            setUtilities(newArr);
                          }
                        }}
                      />
                    </Col>
                  </Row>
                </div>
                <div className="show">
                  {
                    <FormattedMessage {...messages.NameofMotel}>
                      {msg => (
                        <InputForm
                          label={msg}
                          placeholder={msg}
                          name="name"
                          autoComplete="name"
                          value={values.name}
                          touched={touched.name}
                          error={errors.name}
                          onChange={evt => {
                            handleChange(evt);
                          }}
                          onBlur={handleBlur}
                        />
                      )}
                    </FormattedMessage>
                  }
                  {
                    <FormattedMessage {...messages.Address}>
                      {msg => (
                        <InputLocation
                          label={msg}
                          placeholder={msg}
                          name="address"
                          autoComplete="address"
                          touched={touched.address}
                          error={errors.address}
                          onSelect={address => {
                            setFieldValue('address', address.formatted_address);
                          }}
                          onBlur={handleBlur}
                        />
                      )}
                    </FormattedMessage>
                  }

                  <div>{<FormattedMessage {...messages.rangePrice} />}</div>
                  <Row>
                    <Col>
                      <InputForm
                        type="number"
                        label={<FormattedMessage {...messages.minPrice} />}
                        min={0}
                        name="minPrice"
                        value={values.minPrice}
                        touched={touched.minPrice}
                        error={errors.minPrice}
                        onChange={evt => {
                          handleChange(evt);
                        }}
                        onBlur={handleBlur}
                      />
                    </Col>
                    <Col>
                      <InputForm
                        type="number"
                        label={<FormattedMessage {...messages.maxPrice} />}
                        min={0}
                        name="maxPrice"
                        value={values.maxPrice}
                        touched={touched.maxPrice}
                        error={errors.maxPrice}
                        onChange={evt => {
                          handleChange(evt);
                        }}
                        onBlur={handleBlur}
                      />
                    </Col>
                    <Col>
                      <InputForm
                        type="number"
                        label={<FormattedMessage {...messages.roomAcreage} />}
                        min={0}
                        name="roomAcreage"
                        value={values.roomAcreage}
                        touched={touched.roomAcreage}
                        error={errors.roomAcreage}
                        onChange={evt => {
                          handleChange(evt);
                        }}
                        onBlur={handleBlur}
                      />
                    </Col>
                  </Row>
                  {
                    <FormattedMessage {...messages.EnterNumberPhone}>
                      {msg => (
                        <InputForm
                          label={<FormattedMessage {...messages.ProfileRoom} />}
                          placeholder={msg}
                          name="contactPhone"
                          autoComplete="contactPhone"
                          touched={touched.contactPhone}
                          error={errors.contactPhone}
                          onChange={evt => {
                            handleChange(evt);
                          }}
                          onBlur={handleBlur}
                        />
                      )}
                    </FormattedMessage>
                  }
                  {
                    <FormattedMessage {...messages.enterDescription}>
                      {msg => (
                        <InputForm
                          type="textarea"
                          label={msg}
                          placeholder={msg}
                          name="description"
                          autoComplete="description"
                          value={values.description}
                          touched={touched.description}
                          error={errors.description}
                          onChange={evt => {
                            handleChange(evt);
                          }}
                          onBlur={handleBlur}
                        />
                      )}
                    </FormattedMessage>
                  }

                  <Row>
                    <Col xs={6} md={3}>
                      <InputForm
                        label={
                          <FormattedMessage {...messages.electricityPrice} />
                        }
                        type="number"
                        min={0}
                        placeholder="VND"
                        name="electricityPrice"
                        autoComplete="description"
                        value={values.electricityPrice}
                        touched={touched.electricityPrice}
                        error={errors.electricityPrice}
                        onChange={evt => {
                          handleChange(evt);
                        }}
                        onBlur={handleBlur}
                      />
                    </Col>
                    <Col xs={6} md={3}>
                      <InputForm
                        label={<FormattedMessage {...messages.waterPrice} />}
                        type="number"
                        min={0}
                        placeholder="VND"
                        name="waterPrice"
                        autoComplete="waterPrice"
                        value={values.waterPrice}
                        touched={touched.waterPrice}
                        error={errors.waterPrice}
                        onChange={evt => {
                          handleChange(evt);
                        }}
                        onBlur={handleBlur}
                      />
                    </Col>
                    <Col xs={6} md={3}>
                      <InputForm
                        label={<FormattedMessage {...messages.wifiPrice} />}
                        type="number"
                        min={0}
                        placeholder="VND"
                        name="wifiPrice"
                        autoComplete="wifiPrice"
                        value={values.wifiPrice}
                        touched={touched.wifiPrice}
                        error={errors.wifiPrice}
                        onChange={evt => {
                          handleChange(evt);
                        }}
                        onBlur={handleBlur}
                      />
                    </Col>
                    <Col xs={6} md={3}>
                      <InputForm
                        label={<FormattedMessage {...messages.garbagePrice} />}
                        type="number"
                        min={0}
                        placeholder="VND"
                        name="garbagePrice"
                        autoComplete="garbagePrice"
                        value={values.garbagePrice}
                        touched={touched.garbagePrice}
                        error={errors.garbagePrice}
                        onChange={evt => {
                          handleChange(evt);
                        }}
                        onBlur={handleBlur}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col xs={12}>
                      <Button
                        className="btn-block"
                        color="success"
                        type="submit"
                      >
                        {<FormattedMessage {...messages.Finish} />}
                      </Button>
                    </Col>
                  </Row>
                </div>
              </form>
            </div>
          )}
        </Formik>
      </Container>
      {action === 1 ? (
        <div className="link">
          {props.changeStoreData('action', 0)}
          {history.push(`/profile`)}
        </div>
      ) : (
        ''
      )}
      {/* <SuccessPopup
        visible={showSuccessPopup}
        content="Tạo phòng thành công"
        toggle={() => {
          props.changeStoreData('showSuccessPopup', !showSuccessPopup);
        }}
      /> */}
      {/* <WarningPopup
        visible={showDelete}
        content="Bạn thực sự muốn xóa?"
        callBack={() => props.deleteMotel(id)}
        toggle={() => {
          props.changeStoreData('showDelete', false);
        }}
      /> */}
    </div>
  );
}

CreateMotel.propTypes = {
  postMotel: PropTypes.func,
  createMotel: PropTypes.object,
  changeStoreData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  createMotel: makeSelectCreateMotel(),
});

function mapDispatchToProps(dispatch) {
  return {
    postMotel: data => {
      dispatch(postMotel(data));
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

export default compose(withConnect)(CreateMotel);
