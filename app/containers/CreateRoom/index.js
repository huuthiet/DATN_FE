/**
 *
 * ForgotPassword
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
import { Container, Button, Col, Row, Alert } from 'reactstrap';

import makeSelectCreateRoom from './selectors';
import reducer from './reducer';
import saga from './saga';
import './style.scss';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CheckBox from '../../components/CheckBox';
import { useHistory } from 'react-router-dom';
import { changeStoreData, putCreateRoom } from './actions';
import { urlLink } from '../../helper/route';
import Select from 'react-select';
import { useParams } from 'react-router';
import InputForm from '../../components/InputForm';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import * as faker from 'faker';
import axios from 'axios';

export function CreateRoom(props) {
  useInjectReducer({ key: 'createRoom', reducer });
  useInjectSaga({ key: 'createRoom', saga });
  const { id } = useParams();

  const history = useHistory();
  const { action } = props.createRoom;

  const [utilities, setUtilities] = useState([]);
  // const [utilities, setUtilities] = useState(utils);
  const options = [
    { value: 'available', label: <FormattedMessage {...messages.available} /> },
    { value: 'rented', label: <FormattedMessage {...messages.rented} /> },
    { value: 'unknown', label: <FormattedMessage {...messages.unknown} /> },
    { value: 'deposited', label: <FormattedMessage {...messages.deposited} /> },
  ];
  const [dataOptions, setDataOptions] = useState('available');

  let statusRoom = '';
  if (dataOptions == 'unknown') {
    statusRoom = <FormattedMessage {...messages.unknown} />;
  } else if (dataOptions == 'rented') {
    statusRoom = <FormattedMessage {...messages.rented} />;
  } else if (dataOptions == 'deposited') {
    statusRoom = <FormattedMessage {...messages.deposited} />;
  } else {
    statusRoom = <FormattedMessage {...messages.available} />;
  }

  const [submitAction, setSubmitAction] = useState(false);

  // multiple img

  const number = 1;

  const [electricityPrice, setElectricityPrice] = useState(number);
  const [name, setname] = useState(number);
  const [idElectricMetter, setIdElectricMetter] = useState(0);
  const [acreage, setAcreage] = useState(number);
  const [price, setprice] = useState(number);
  const [waterPrice, setwaterPrice] = useState(number);
  const [minimumMonths, setMinimumMonths] = useState(number);
  const [availableDate, setAvailableDate] = useState(new Date());
  const [depositPrice, setDepositPrice] = useState(number);
  const [roomPassword, setRoomPassword] = useState(
    faker.random.number({ min: 100000, max: 999999, precision: 6 }),
  );
  const [arrayUrlImage, setArrayUrlImage] = useState([]);
  const [countSubmit, setCountSubmit] = useState(false);

  //New
  const [wifiPrice, setWifiPrice] = useState(number);
  const [garbagePrice, setGarbagePrice] = useState(number);
  const [arrayCallImg, setArrayCallImg] = useState([]);

  const apiPostImg = async payload => {
    const { id, formData } = payload;
    const requestUrl = `${urlLink.api.serverUrl +
      urlLink.api.motelDetail}/img/${id}`;

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    try {
      const response = await axios.post(requestUrl, formData, config);
      if (response.data.data.images) {
        return response.data.data.images.imageUrl;
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleFileInputChangeFile = async e => {
    const dataFile = e.target.files;
    setArrayCallImg([]);
    const newArr = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < dataFile.length; i++) {
      const formData = new FormData();
      formData.append('file', dataFile[i]);
      const data = {
        id,
        formData,
      };
      newArr.push(data);
    }
    setArrayCallImg(newArr);
  };
  const handleCallImages = () => {
    const n = arrayCallImg.length;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < n; i++) {
      apiPostImg(arrayCallImg[i]);
    }
  };

  return (
    <div className="login-page-wrapper">
      <Helmet>
        <title>CreateRoom</title>
        <meta name="description" content="Description of ForgotPassword" />
      </Helmet>
      <Container>
        <div className="title mb-3">
          <h3>
            <FormattedMessage {...messages.CreateNewRoom} />
          </h3>
        </div>
        <Row>
          <Col md={3}>
            <InputForm
              label={<FormattedMessage {...messages.NameRoom} />}
              type="text"
              min={0}
              name="name"
              value={name}
              autoComplete="description"
              onChange={evt => {
                setname(evt.target.value);
              }}
            />
          </Col>
          <Col md={3}>
            <InputForm
              label={<FormattedMessage {...messages.electricMetter} />}
              type="text"
              // min={0}
              name="electricMetter"
              value={null}
              autoComplete="description"
              onChange={evt => {
                setIdElectricMetter(evt.target.value);
              }}
            />
          </Col>

          <Col md={6}>
            {/* <h5>Chọn tự động cập nhập</h5> */}
            <Select
              placeholder={statusRoom}
              value={dataOptions}
              options={options}
              className="pt-4"
              onChange={e => {
                setDataOptions(e.value);
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <InputForm
              label={<FormattedMessage {...messages.AcreageRoom} />}
              type="text"
              min={15}
              name="acreage"
              value={acreage}
              autoComplete="description"
              onChange={evt => {
                setAcreage(evt.target.value);
              }}
            />
          </Col>
          <Col md={6}>
            <InputForm
              type="number"
              label={<FormattedMessage {...messages.PriceName} />}
              min={0}
              name="minPrice"
              value={price}
              onChange={evt => {
                setprice(evt.target.value);
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col md={3} xs={6}>
            <InputForm
              label={<FormattedMessage {...messages.electricityPrice} />}
              type="number"
              min={0}
              placeholder="VND"
              value={electricityPrice}
              name="electricityPrice"
              autoComplete="description"
              onChange={evt => {
                setElectricityPrice(evt.target.value);
              }}
            />
          </Col>
          <Col md={3} xs={6}>
            <InputForm
              label={<FormattedMessage {...messages.waterPrice} />}
              type="number"
              min={0}
              placeholder="VND"
              name="waterPrice"
              value={waterPrice}
              autoComplete="waterPrice"
              onChange={evt => {
                setwaterPrice(evt.target.value);
              }}
            />
          </Col>
          <Col md={3} xs={6}>
            <InputForm
              label="Mã Khóa Phòng"
              type="number"
              min={100000}
              max={999999}
              placeholder="VND"
              value={roomPassword}
              name="roomPassword"
              autoComplete="roomPassword"
              onChange={evt => {
                setRoomPassword(evt.target.value);
              }}
            />
          </Col>
          <Col md={3} xs={6}>
            <InputForm
              label="Tiền Thế Chân"
              type="number"
              min={0}
              placeholder="VND"
              name="depositPrice"
              value={depositPrice}
              autoComplete="depositPrice"
              onChange={evt => {
                setDepositPrice(evt.target.value);
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={6} md={3}>
            <InputForm
              label={<FormattedMessage {...messages.wifiPrice} />}
              type="number"
              min={0}
              placeholder="VND"
              value={wifiPrice}
              name="wifiPrice"
              autoComplete="wifiPrice"
              onChange={evt => {
                setWifiPrice(evt.target.value);
              }}
            />
          </Col>
          <Col xs={6} md={3}>
            <InputForm
              label={<FormattedMessage {...messages.garbagePrice} />}
              type="number"
              min={0}
              placeholder="VND"
              value={garbagePrice}
              name="garbagePrice"
              autoComplete="description"
              onChange={evt => {
                setGarbagePrice(evt.target.value);
              }}
            />
          </Col>
          <Col md={3} xs={6}>
            <InputForm
              label={<FormattedMessage {...messages.MinMonthRented} />}
              type="number"
              min={1}
              max={12}
              placeholder="Tháng"
              value={minimumMonths}
              name="minimumMonths"
              autoComplete="description"
              onChange={evt => {
                const month = parseInt(evt.target.value);

                if (month > 12) {
                  setMinimumMonths(1);
                } else {
                  setMinimumMonths(month);
                }
              }}
            />
          </Col>
          <Col md={3} xs={6} className="PickerCol">
            <DatePicker
              dateFormat="dd/MM/yyyy"
              selected={moment(availableDate, 'MM/DD/YYYY').toDate()}
              onChange={date => {
                setAvailableDate(moment(date).format('MM/DD/YYYY'));
              }}
              customInput={
                <InputForm
                  label={<FormattedMessage {...messages.CheckInDate} />}
                  icon="fa fa-calendar"
                />
              }
            />
          </Col>
        </Row>
        {/* <Row>
          <Col md={6} xs={12}>
            <input
              type="file"
              id="fileupload"
              accept=".png, .jpg"
              multiple="multiple"
              onChange={e => {
                handleFileInputChangeFile(e);
              }}
            />
          </Col>
        </Row> */}
        <Row>
          <Col xs={12}>
            <h4 className="text-center">
              {<FormattedMessage {...messages.ListRoomAcc} />}
            </h4>
          </Col>
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
                  e.checked = false;
                }
              }}
            />
          </Col>
          <Col xs={4}>
            <CheckBox
              label={<FormattedMessage {...messages.AirConditioner} />}
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
              label={<FormattedMessage {...messages.PrivateEntrance} />}
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
        <Row>
          <Col xs={12}>
            {roomPassword > 999999 && (
              <Alert color="danger" className="mt-3">
                Mã Phòng Phải từ 100.000 đến 999.999
              </Alert>
            )}
            {roomPassword < 100000 && (
              <Alert color="danger" className="mt-3">
                Mã Phòng Phải từ 100.000 đến 999.999
              </Alert>
            )}
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs={12}>
            <Button
              color="primary"
              className="btn-block mt-3"
              type="submit"
              onClick={() => {
                const data = {
                  utilities,
                  id,
                  name,
                  idElectricMetter,
                  electricityPrice,
                  price,
                  waterPrice,
                  minimumMonths,
                  availableDate,
                  acreage,
                  roomPassword,
                  wifiPrice,
                  garbagePrice,
                  depositPrice,
                  // arrayCallImg,
                  status: dataOptions,
                };
                if (roomPassword <= 999999 && roomPassword >= 100000) {
                  // handleCallImages();
                  props.putCreateRoom(data);
                }
              }}
            >
              {<FormattedMessage {...messages.AddRoom} />}
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

CreateRoom.propTypes = {
  dispatch: PropTypes.func,
  postMotel: PropTypes.func,
  createRoom: PropTypes.object,
  changeStoreData: PropTypes.func,
  putCreateRoom: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  createRoom: makeSelectCreateRoom(),
});

function mapDispatchToProps(dispatch) {
  return {
    putCreateRoom: data => {
      dispatch(putCreateRoom(data));
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

export default compose(withConnect)(CreateRoom);
