/**
 *
 * JobDetailUser
 *
 */

import { makeStyles } from '@material-ui/core/styles';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import DateRangeIcon from '@material-ui/icons/DateRange';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import InsertInvitationIcon from '@material-ui/icons/InsertInvitation';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import PersonIcon from '@material-ui/icons/Person';
import PhoneIcon from '@material-ui/icons/Phone';
import TodayIcon from '@material-ui/icons/Today';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import React, { memo, useEffect, useState } from 'react';
import { CheckCircleOutline } from '@material-ui/icons';
//

import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import {
  Avatar,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { Button } from 'reactstrap';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FormattedMessage } from 'react-intl';
import Modal from 'react-modal';
import Select from 'react-select';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import PaperWrapper from '../../components/PaperWrapper/Loadable';
import Money from '../../helper/format';
import { changeAppStoreData } from '../App/actions';
import { getProfile } from '../Profile/actions';
import {
  changeStoreData,
  getJob,
  putActive,
  putRenewContract,
  putDeposit,
  putCheckOut,
  putJob,
  getBankInfo,
  postTransaction,
} from './actions';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import makeSelectJobDetailUser from './selectors';
import './style.scss';
import { functionsIn } from 'lodash';
import ModalComponent from './modal';

const useStyles = makeStyles(theme => ({
  content: {
    marginTop: '10px',
  },
  list: {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid rgba(0, 0, 0, .25)',
    paddingBottom: '8px',
  },
  text: {
    display: 'flex',
  },
  label: {
    fontWeight: 'bold',
    paddingRight: '5px',
  },
  button: {
    marginLeft: '5px',
  },
}));

const optionsRentalPeriod = [
  {
    label: '1',
    value: '1',
    isDisabled: false,
  },
  {
    label: '2',
    value: '2',
    isDisabled: false,
  },
  {
    label: '3',
    value: '3',
    isDisabled: false,
  },
  {
    label: '4',
    value: '4',
    isDisabled: false,
  },
  {
    label: '5',
    value: '5',
    isDisabled: false,
  },
  {
    label: '6',
    value: '6',
    isDisabled: false,
  },
  {
    label: '7',
    value: '7',
    isDisabled: false,
  },
  {
    label: '8',
    value: '8',
    isDisabled: false,
  },
  {
    label: '9',
    value: '9',
    isDisabled: false,
  },
  {
    label: '10',
    value: '10',
    isDisabled: false,
  },
  {
    label: '11',
    value: '11',
    isDisabled: false,
  },
  {
    label: '12',
    value: '12',
    isDisabled: false,
  },
  {
    label: '13',
    value: '13',
    isDisabled: false,
  },
  {
    label: '14',
    value: '14',
    isDisabled: false,
  },
  {
    label: '15',
    value: '15',
    isDisabled: false,
  },
  {
    label: '16',
    value: '16',
    isDisabled: false,
  },
  {
    label: '17',
    value: '17',
    isDisabled: false,
  },
  {
    label: '18',
    value: '18',
    isDisabled: false,
  },
  {
    label: '19',
    value: '19',
    isDisabled: false,
  },
  {
    label: '20',
    value: '20',
    isDisabled: false,
  },
  {
    label: '21',
    value: '21',
    isDisabled: false,
  },
  {
    label: '22',
    value: '22',
    isDisabled: false,
  },
  {
    label: '23',
    value: '23',
    isDisabled: false,
  },
  {
    label: '24',
    value: '24',
    isDisabled: false,
  },
  {
    label: '25',
    value: '25',
    isDisabled: false,
  },
  {
    label: '26',
    value: '26',
    isDisabled: false,
  },
  {
    label: '27',
    value: '27',
    isDisabled: false,
  },
  {
    label: '28',
    value: '28',
    isDisabled: false,
  },
  {
    label: '29',
    value: '29',
    isDisabled: false,
  },
  {
    label: '30',
    value: '30',
    isDisabled: false,
  },
  {
    label: '31',
    value: '31',
    isDisabled: false,
  },
  {
    label: '32',
    value: '32',
    isDisabled: false,
  },
  {
    label: '33',
    value: '33',
    isDisabled: false,
  },
  {
    label: '34',
    value: '34',
    isDisabled: false,
  },
  {
    label: '35',
    value: '35',
    isDisabled: false,
  },
  {
    label: '36',
    value: '36',
    isDisabled: false,
  },
];

export function JobDetailUser(props) {
  useInjectReducer({ key: 'jobDetailUser', reducer });
  useInjectSaga({ key: 'jobDetailUser', saga });
  const classes = useStyles();
  const { id = '', idRoom = '' } = useParams();
  console.log("Check idRoom: ", { idRoom });

  const history = useHistory();
  const today = new Date();
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  useEffect(() => {
    if (id && idRoom) {
      // getBankInfo(idRoom);
      props.getJob(id, idRoom);
      props.getProfile();
    }
  }, [id, idRoom]);

  useEffect(() => {
    props.getJob(id, idRoom);
  }, []);

  const {
    job,
    // dataEnergy,
    profile: { wallet = '' },
    flagDeposit,
    bankInfo = [],
  } = props.jobDetailUser;

  console.log('props.jobDetailUser', props.jobDetailUser);

  const {
    bank = '',
    image = [],
    nameTk = '',
    nameTkLable = '',
    stk = '',
  } = bankInfo;

  console.log({ bankInfo });

  const {
    fullName = '',
    deposit = '',
    phoneNumber = '',
    motelRoom = {},
    checkInTime = new Date(),
    price = '',
    bail = '',
    afterCheckInCost = '',
    currentOrder = {},
    returnRoomDate = '',
    images = [],
    rentalPeriod = '',
    isActived = false,
    roomPassword = '',
    status = '',
    isUpdatedReturnRoomDate = false,
    room = {},
  } = job;

  const expireRenewContract = moment(checkInTime).add(rentalPeriod, 'months').subtract(15, 'days');

  console.log('job in index: ', job);

  // let roundedTotalkWhTime = 0;// số điện
  // let totalElectric = 0; // tiền điện
  // let totalElectricNumber = 0;
  // let electricPrice = 0; // giá điện
  // let roundedTotalElectric = 0; // tổng tiền điện đã format
  // let waterNumber = 0;
  // let waterPrice = 0;
  // let totalWater = 0;
  // let garbagePrice = 0; // giá dịch vụ
  // let wifiPrice = 0; // giá xe
  // let numberVihicle = 0;
  // let totalPriceVihicle = 0;
  // let roundedTotalWater = 0; // tổng tiền nước

  // // const { totalkWhTime = 0 } = dataEnergy;
  // if (job && job.room) {
  //   if(currentOrder.type === "monthly") {
  //     roundedTotalkWhTime = currentOrder.electricNumber;
  //     totalElectric = Money(currentOrder.electricPrice);
  //     totalElectricNumber = parseInt(job.currentOrder.electricPrice.toFixed(0));
  //   }
  //   numberVihicle = room.vihicle;
  //   electricPrice = Money(room.electricityPrice);
  //   roundedTotalElectric = (totalElectric);
  //   waterNumber = room.person;
  //   waterPrice = Money(room.waterPrice);
  //   totalWater = waterNumber * room.waterPrice;
  //   garbagePrice = Money(room.garbagePrice);
  //   wifiPrice = Money(room.wifiPrice);
  //   totalPriceVihicle = Money(room.wifiPrice * room.vihicle);
  //   roundedTotalWater = Money(totalWater);
  // }

  // const [numberDayStay, setNumberDayStay] = useState(0);
  let numberDayStay = 0;
  // // const [electricNumber, setElectricNumber] = useState(0);
  let electricNumber = 0;
  // // const [electricPrice, setElectricPrice] = useState(0);
  let electricPrice = 0;
  // // const [electricPricePerKwh, setElectricPricePerKwh] = useState(0);
  let electricPricePerKwh = 0;
  // // const [roomPrice, setRoomPrice] = useState(0);
  let roomPrice = 0;
  let roomPricePerMon = 0;
  // // const [numberPerson, setNumberPerson] = useState(0);
  let numberPerson = 0;
  // // const [waterPrice, setWaterPrice] = useState(0);
  let waterPrice = 0;
  // // const [waterPricePerPerson, setWaterPricePerPerson] = useState(0);
  let waterPricePerPerson = 0;
  // // const [vehiclePrice, setVehiclePrice] = useState(0);
  let vehiclePrice = 0;
  // // const [vehiclePricePer, setVehiclePricePer] = useState(0);
  let vehiclePricePer = 0;
  // // const [numberVehicle, setNumberVehicle] = useState(0);
  let numberVehicle = 0;
  // // const [servicePrice, setServicePrice] = useState(0);
  let servicePrice = 0;
  // // const [totalPrice, setTotalPrice] = useState(0);
  let totalPrice = 0;
  // const {
  //   numberDayStay = 0,
  //   electricNumber = 0,
  //   electricPrice = 0,
  //   electricPricePerKwh = 0,
  //   roomPrice = 0,
  //   numberPerson = 0,
  //   waterPrice = 0,
  //   waterPricePerPerson = 0,
  //   vehiclePrice = 0,

  // }

  if (job && job.room) {
    if (currentOrder.type === 'monthly') {
      // setNumberDayStay(currentOrder.numberDayStay);
      numberDayStay = currentOrder.numberDayStay;
      roomPricePerMon = room.price;
      // setElectricNumber(currentOrder.electricNumber);
      electricNumber = currentOrder.electricNumber;
      // setElectricPrice(currentOrder.electricPrice);
      electricPrice = parseInt(currentOrder.electricPrice.toFixed(0));
      // setElectricPricePerKwh(room.electricityPrice);
      electricPricePerKwh = room.electricityPrice;
      // setRoomPrice(parseInt(currentOrder.amount.toFixed(0)));
      roomPrice = parseInt(currentOrder.roomPrice.toFixed(0));
      // setNumberPerson(room.person);
      numberPerson = room.person;
      // setWaterPrice(currentOrder.waterPrice);
      waterPrice = parseInt(currentOrder.waterPrice.toFixed(0));
      // setWaterPricePerPerson(room.waterPrice);
      waterPricePerPerson = parseInt(room.waterPrice.toFixed(0));
      // setVehiclePrice(currentOrder.vehiclePrice);
      vehiclePrice = parseInt(currentOrder.vehiclePrice.toFixed(0));
      // setNumberVehicle(room.vihicle);
      numberVehicle = room.vihicle;
      vehiclePricePer = room.wifiPrice;
      // setServicePrice(currentOrder.servicePrice);
      // setVehiclePricePer(room.garbagePrice);
      servicePrice = parseInt(room.garbagePrice.toFixed(0));
      // setTotalPrice(parseInt(currentOrder.amount.toFixed(0)));
      totalPrice = parseInt(currentOrder.amount.toFixed(0));
    }
  }

  for (let index = 0; index < optionsRentalPeriod.length; index++) {
    const element = optionsRentalPeriod[index];
    if (element.value < room.minimumMonths) {
      element.isDisabled = true;
    }
  }

  const [datepicker, setDatepicker] = useState(returnRoomDate);

  const [numberMonRenew, setNumberMonRenew] = useState(0);
  const [selectedBankName, setSelectedBankName] = useState('');
  const [selectedBankNumber, setSelectedBankNumber] = useState('');
  const [selectedBankUsername, setSelectedBankUsername] = useState('');
  const [banking, setBanking] = useState('');
  const [keyPayment, setKeyPayment] = useState('');
  // const [numberMonRenewUpdate, setNumberMonRenewUp] = useState(0);

  let MaThanhToan = '';

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
    const baseString = '0123456789ABCDEF';
    const ma = `${getRandomString(8, baseString)}`;
    MaThanhToan = ma;
    return ma;
  };

  const SubmitCashModal = () => {
    if (job) {
      const formData = {
        order: job.currentOrder._id,
        afterCheckInCost: job.afterCheckInCost,
        deposit: job.deposit,
        rentalPeriod: job.rentalPeriod,
        user: job.user._id,
        fullName: job.fullName,
        job: job._id,
        motel: job.motelRoom._id,
        room: job.room._id,
        type: job.currentOrder.type,
        keyPayment,
        banking,
        paymentMethod: 'cash',
      };

      // console.log("banhhhhh", banking);
      // console.log({ formData });
      if (banking) {
        props.postTransaction(formData);
      } else {
        toast.error("Vui lòng chọn ngân hàng trước khi Xác nhận");
      }
    }
  };

  const checkOutDate = new Date(checkInTime).setMonth(
    new Date(checkInTime).getMonth() + Number(rentalPeriod),
  );

  const minDate = new Date(checkInTime).setMonth(
    new Date(checkInTime).getMonth() + 1,
  );
  const dateStay = Math.ceil(Math.abs(lastDay - today) / (24 * 3600 * 1000)) + 1;

  const handleCheckOut = date => {
    if (moment(date).isBefore(moment(checkOutDate))) {
      // Trả ngày trước ngày hợp đồng
      props.changeAppStoreData('showAlert', true);
      props.changeAppStoreData('alert', {
        title: <FormattedMessage {...messages.CheckOutRoom} />,
        content: `Ngày trả phòng sớm hơn so với hợp đồng, bạn sẽ mất cọc khi trả phòng. Bạn thực sự muốn chọn ngày ${moment(
          date,
        ).format('DD/MM/YYYY')} để trả phòng?`,
        callBack: () => {
          props.putCheckOut(id, moment(date).format('MM/DD/YYYY'));
        },
      });
    } else {
      // Gia Hạn Thêm Hợp Đồng
      props.changeAppStoreData('showAlert', true);
      props.changeAppStoreData('alert', {
        title: <FormattedMessage {...messages.CheckOutRoom} />,
        content: `Bạn thực sự muốn chọn ngày ${moment(date).format(
          'DD/MM/YYYY',
        )} để trả phòng?`,
        callBack: () => {
          props.putCheckOut(id, moment(date).format('MM/DD/YYYY'));
        },
      });
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenBankingMonthly, setIsOpenBankingMonthly] = useState(false);

  const [modalRenewContract, setModalRenewContract] = useState(false);

  function toggleModalRenewContract() {
    setModalRenewContract(!modalRenewContract);
    setNumberMonRenew(room.minimumMonths);
  }

  function SubmitModalRenewContract() {
    setModalRenewContract(!modalRenewContract);
    console.log('gọi renew');

    props.putRenewContract(job._id, numberMonRenew, idRoom);
  }

  function toggleModal() {
    setIsOpen(!isOpen);
  }
  function toggleModalBankingMonthly() {
    setIsOpenBankingMonthly(!isOpenBankingMonthly);
  }
  const [isOpenCheckIn, setIsOpenCheckIn] = useState(false);
  const toggleCheckInModal = () => {
    setIsOpenCheckIn(!isOpenCheckIn);
  };

  function SubmitModal() {
    setIsOpen(!isOpen);
    if (job) {
      const formData = {
        order: job.currentOrder._id,
        afterCheckInCost: job.afterCheckInCost,
        deposit: job.deposit,
        rentalPeriod: job.rentalPeriod,
        user: job.user._id,
        fullName: job.fullName,
        job: job._id,
        motel: job.motelRoom._id,
        room: job.room._id,
        type: job.currentOrder.type,
        keyPayment,
        banking,
        paymentMethod: 'cash',
      };
      console.log({ formData });

      console.log("banhhhhh", banking);
      console.log({ formData });
      if (banking) {
        props.postTransaction(formData);
      } else {
        toast.error("Vui lòng chọn ngân hàng trước khi Xác nhận");
      }
    }
  }
  // function SubmitModal() {
  //   setIsOpen(!isOpen);
  //   props.putJob(id);
  // }

  const submitCheckInModal = () => {
    setIsOpenCheckIn(!isOpenCheckIn);
    props.putJob(id);
  };

  const [moneyWallet, setMoneyWallet] = useState();
  const [total, setTotal] = useState(0);

  const ExampleCustomInput = ({ value, onClick }) => (
    <button className="example-custom-input" onClick={onClick}>
      <i className="fa fa-calendar" aria-hidden="true" />
      {value}
    </button>
  );

  let bankOptions = [];
  if (bankInfo.length !== 0) {
    bankOptions = bankInfo.map(bankItem => ({
      label: bankItem.nameTkLable,
      value: bankItem.id,
      bankName: bankItem.nameTkLable,
      bankNumber: bankItem.stk,
      bankUsername: bankItem.nameTk,
      objectBankId: bankItem._id,
    }));
  }

  console.log({bankOptions});

  return (
    <div className="job-detail-wrapper">
      <Helmet>
        <title>Job Detail User</title>
        <meta name="description" content="Description of JobDetailUser" />
      </Helmet>
      <div className="job-detail-container">
        <span className="job-detail-title">
          <FormattedMessage {...messages.InformationRoom} />
        </span>
        <Grid container justify="center" alignItems="center" spacing={1}>
          {images &&
            images.map((imageId, index) => (
              <Grid
                item
                xs={6}
                key={index}
                style={{ display: 'flex', justifyContent: 'center' }}
              >
                <Avatar
                  style={{
                    width: '140px',
                    height: '140px',
                  }}
                  variant="square"
                  alt="Avatar"
                  src={imageId}
                >
                  Image
                </Avatar>
              </Grid>
            ))}
        </Grid>
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={<FormattedMessage {...messages.PeopleRomSet} />}
              secondary={fullName}
            />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <AttachMoneyIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={<FormattedMessage {...messages.Deposited} />}
              secondary={Money(deposit)}
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <PhoneIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={<FormattedMessage {...messages.Phone} />}
              secondary={phoneNumber}
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <HomeWorkIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={<FormattedMessage {...messages.Motel} />}
              secondary={motelRoom.name}
            />
            {flagDeposit === true && (
              <FormattedMessage {...messages.PaymentDeposit} />
            )}
            {status === 'pendingDepositPayment' && (
              <Button
                className={classes.button}
                size="small"
                variant="contained"
                color="primary"
                onClick={() => {
                  // eslint-disable-next-line react/prop-types, no-underscore-dangle
                  const payload = {
                    jobId: id,
                    orderId: currentOrder._id,
                  };
                  props.putDeposit(payload);
                }}
              >
                <FormattedMessage {...messages.Deposit} />
              </Button>
            )}
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <MeetingRoomIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={<FormattedMessage {...messages.Room} />}
              secondary={room.name}
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <EventAvailableIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={<FormattedMessage {...messages.CheckinDate} />}
              secondary={moment(checkInTime).format('DD/MM/YYYY')}
            />
            {!isActived && (
              <ListItemText
                primary={<FormattedMessage {...messages.ExpireActivate} />}
                secondary={moment(checkInTime).add(7, "days").format('DD/MM/YYYY')}
              />
            )}
            <Button
              className={classes.button}
              size="small"
              variant="contained"
              color="primary"
              disabled={moment(checkInTime) > moment(new Date()) || isActived}
              onClick={() => {
                if (images.length > 1) {
                  // đã có thông tin xác nhân kích hoạt phòng luôn
                  props.putActive(id);
                } else {
                  history.push(`/job-verify/${id}/${idRoom}`);
                }
              }}
            >
              {isActived ? (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <CheckCircleOutline style={{ fontSize: '20px' }} />
                  <FormattedMessage {...messages.Activated} />
                </div>
              ) : (
                <FormattedMessage {...messages.Activate} />
              )}
            </Button>
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <AttachMoneyIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={<FormattedMessage {...messages.PriceRoom} />}
              secondary={Money(price)}
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <AttachMoneyIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={<FormattedMessage {...messages.BondMoney} />}
              secondary={Money(bail)}
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <AttachMoneyIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={<FormattedMessage {...messages.PaymentUponCheckIn} />}
              secondary={Money(afterCheckInCost)}
            />
            {currentOrder.type === 'afterCheckInCost' && (
              <ListItemText
                primary={<FormattedMessage {...messages.ExpireDate} />}
                secondary={
                  currentOrder.type === 'afterCheckInCost' ? moment(currentOrder.expireTime).format("DD/MM/YYYY") : ""
                }
              />
            )}
            <Button
              variant="outlined"
              color="primary"
              disabled={
                !isActived ||
                (currentOrder.type === 'afterCheckInCost' &&
                  currentOrder.isCompleted === true) ||
                currentOrder.type !== 'afterCheckInCost'
              }
              onClick={() => {
                setMoneyWallet(Money(afterCheckInCost));
                // toggle thanh toán khi nhận phòng
                toggleCheckInModal();
                // toggleModal();
                // history.push(`/payment/${id}`);
                // props.putJob(id);
              }}
            >
              {!isActived ||
                (currentOrder.type === 'afterCheckInCost' &&
                  currentOrder.isCompleted === true) ||
                currentOrder.type !== 'afterCheckInCost' ? (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <CheckCircleOutline style={{ fontSize: '20px' }} />
                  <FormattedMessage {...messages.Paid} />
                </div>
              ) : (
                <FormattedMessage {...messages.Pay} />
              )}
            </Button>
          </ListItem>
          {/* <Divider variant="inset" component="li" /> */}
          {/* <ListItem>
            <ListItemAvatar>
              <Avatar>
                <VpnKeyIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={<FormattedMessage {...messages.RoomLockCode} />}
              secondary={roomPassword}
            />
          </ListItem> */}
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <TodayIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={<FormattedMessage {...messages.CheckOutDate} />}
              secondary={moment(returnRoomDate || checkOutDate).format(
                'DD/MM/YYYY',
              )}
            />
            <DatePicker
              dateFormat="dd/MM/yyyy"
              minDate={minDate}
              onChange={handleCheckOut}
              customInput={<ExampleCustomInput />}
            // customInput={
            // 	<InputForm
            // 		// icon="fa fa-calendar"
            // 		style={{width:'10px'}}
            // 	/>
            // }
            />
            {/* <ListItemText
								primary="Ngày trả phòng"
								secondary={moment(
									returnRoomDate ? returnRoomDate : checkOutDate,
								).format('DD/MM/YYYY')}
							/>
							<MuiPickersUtilsProvider utils={DateFnsUtils}>
								<KeyboardDatePicker
									className="date-custom"
									required
									disablePast
									// maxDate={moment().add(7, 'days')}
									minDate={minDate}
									id="date-picker-dialog"
									placeholder="Nhập ngày"
									format="dd/MM/yyyy"
									KeyboardButtonProps={{
										'aria-label': 'change date',
									}}
									disabled={isUpdatedReturnRoomDate}
									value={returnRoomDate ? returnRoomDate : checkOutDate}
									onChange={handleCheckOut}
									size="small"
								/>
							</MuiPickersUtilsProvider> */}
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <AssignmentIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={<FormattedMessage {...messages.RentalContract} />}
              secondary={`${rentalPeriod} tháng`}
            />
            {/* <ListItemText
              primary={<FormattedMessage {...messages.ExpireRenew} />}
              secondary={expireRenewContract}
            /> */}
            {/* {moment(checkInTime).add(rentalPeriod, "months").diff(moment(), "days") > 15 ?

            } */}
            <Button
              className={classes.button}
              size="small"
              variant="contained"
              color="primary"
              onClick={() => {
                // setMoneyWallet(Money(afterCheckInCost));
                toggleModalRenewContract();
              }}
            >
              <FormattedMessage {...messages.RenewContract} />
            </Button>
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <DateRangeIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={<FormattedMessage {...messages.NumberOfDays} />}
              secondary={dateStay}
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <InsertInvitationIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={<FormattedMessage {...messages.PaymentDate} />}
              // secondary={moment(lastDay).format('DD/MM/YYYY')}
              secondary={
                currentOrder.type === 'monthly' ? moment(currentOrder.expireTime).startOf("month").format("DD/MM/YYYY")
                  : moment().add(1, "months").startOf("month").format("DD/MM/YYYY")
              }
            />
            {currentOrder.type === 'monthly' && (
              <ListItemText
                primary={<FormattedMessage {...messages.ExpireDate} />}
                // secondary={moment(lastDay).format('DD/MM/YYYY')}
                secondary={
                  currentOrder.type === 'monthly' ? moment(currentOrder.expireTime).format("DD/MM/YYYY") : ''
                }
              />
            )}
            <Button
              className={classes.button}
              size="small"
              color="primary"
              disabled={
                !isActived ||
                currentOrder.type !== 'monthly' ||
                currentOrder.isCompleted
              }
              onClick={() => {
                toggleModal();
              }}
            >
              {!isActived ||
                currentOrder.type !== 'monthly' ||
                (currentOrder.type === 'monthly' && currentOrder.isCompleted) ? (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <CheckCircleOutline style={{ fontSize: '20px' }} />
                  <FormattedMessage {...messages.Paid} />
                </div>
              ) : (
                <FormattedMessage {...messages.Pay} />
              )}
            </Button>
          </ListItem>
          {/* <Divider variant="inset" component="li" /> */}
          {/* <ListItem>
            <ListItemAvatar>
              <Avatar>
                <AccountBalanceWalletIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={<FormattedMessage {...messages.BalanceInWallet} />}
              secondary={Money(wallet)}
            />
          </ListItem> */}
        </List>
      </div>

      {/* MODAL THANH TOÁN "THANH TOÁN KHI NHẬN PHÒNG" */}
      {/* <ModalComponent
        modal={isOpenCheckIn}
        modalTitle="Xác nhận thanh toán"
        footer={
          <>
            <Button className="btn btn-secondary" onClick={toggleCheckInModal}>
              {<FormattedMessage {...messages.Cancel} />}
            </Button>
            <Button className="btn btn-success" onClick={submitCheckInModal}>
              {<FormattedMessage {...messages.Accept} />}
            </Button>
          </>
        }
      >
        <div
          className="bill-content"
          style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <span style={{ minWidth: '300px' }}>
              <FormattedMessage {...messages.TotalMoney} />
              {': '}
            </span>
            <span>{Money(afterCheckInCost)}</span>
          </div>
        </div>
      </ModalComponent> */}
      {/* <ModalComponent
        modal={isOpenCheckIn}
        modalTitle="Xác nhận thanh toán"
        footer={
          <>
            <Button className="btn btn-secondary" onClick={toggleCheckInModal}>
              {<FormattedMessage {...messages.Cancel} />}
            </Button>
            <Button className="btn btn-success" onClick={submitCheckInModal}>
              {<FormattedMessage {...messages.Accept} />}
            </Button>
          </>
        }
      >
        <div
          className="bill-content"
          style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <span style={{ minWidth: '300px' }}>
              <FormattedMessage {...messages.TotalMoney} />
              {': '}
            </span>
            <span>{Money(afterCheckInCost)}</span>
          </div>
        </div>
      </ModalComponent> */}

      <ModalComponent
        modal={isOpenCheckIn}
        toggle={toggleCheckInModal}
        modalTitle="Xác nhận thanh toán chuyển khoản ngân hàng!"
        footer={
          <div>
            <Button color="secondary" onClick={toggleCheckInModal}>
              <FormattedMessage {...messages.Cancel} />
            </Button>{' '}
            <Button onClick={SubmitCashModal} color="primary">
              <FormattedMessage {...messages.Accept} />
            </Button>
          </div>
        }
      >
        <div className="deposit" style={{ minHeight: '200px' }}>
          <h5>
            <FormattedMessage {...messages.AmountOfMoney} />
            {Money(afterCheckInCost)}
          </h5>
          <div style={{ minHeight: '50px' }}>
            <FormattedMessage {...messages.AmountOfMoneyTransfer} />
          </div>
          <div
            style={{
              boxShadow:
                'rgba(3, 7, 18, 0.01) 0px -1px 3px, rgba(3, 7, 18, 0.03) 0px -2px 12px, rgba(3, 7, 18, 0.04) 0px -5px 27px, rgba(3, 7, 18, 0.04) 1px -10px 47px, rgba(3, 7, 18, 0.04) 1px -15px 74px;',
            }}
          >
            <Select
              placeholder="Chọn ngân hàng"
              options={bankOptions}
              onChange={selectedOption => {
                console.log('Selected bank:', selectedOption);
                setSelectedBankName(selectedOption.bankName);
                setSelectedBankNumber(selectedOption.bankNumber);
                setSelectedBankUsername(selectedOption.bankUsername);
                setBanking(selectedOption.objectBankId);
                setKeyPayment(getRandomHex2());
              }}
            />
          </div>

          {selectedBankName && (
            <div style={{ position: 'relative', top: '20px', padding: '0px' }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  paddingBottom: '10px',
                }}
              >
                <span
                  style={{
                    color: 'gray',
                    fontSize: '14px',
                    margin: '0px 0 6px 3px',
                  }}
                >
                  Ngân hàng
                </span>
                <span
                  style={{
                    padding: '8px 8px',
                    border: '1px solid #E2E2E2',
                    borderRadius: '6px',
                  }}
                >
                  {selectedBankName}
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  paddingBottom: '10px',
                }}
              >
                <span
                  style={{
                    color: 'gray',
                    fontSize: '14px',
                    margin: '0px 0 6px 3px',
                  }}
                >
                  Số tài khoản
                </span>
                <span
                  style={{
                    padding: '8px 8px',
                    border: '1px solid #E2E2E2',
                    borderRadius: '6px',
                  }}
                >
                  {selectedBankNumber}
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  paddingBottom: '10px',
                }}
              >
                <span
                  style={{
                    color: 'gray',
                    fontSize: '14px',
                    margin: '0px 0 6px 3px',
                  }}
                >
                  Tên người nhận
                </span>
                <span
                  style={{
                    padding: '8px 8px',
                    border: '1px solid #E2E2E2',
                    borderRadius: '6px',
                  }}
                >
                  {selectedBankUsername}
                </span>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  paddingBottom: '10px',
                }}
              >
                <span
                  style={{
                    color: 'gray',
                    fontSize: '14px',
                    margin: '0px 0 6px 3px',
                  }}
                >
                  Nội dung thanh toán
                </span>
                <span
                  style={{
                    padding: '8px 8px',
                    border: '1px solid #E2E2E2',
                    borderRadius: '6px',
                  }}
                >
                  {keyPayment}
                </span>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  paddingBottom: '10px',
                }}
              >
                <span
                  style={{
                    color: 'brown',
                    fontSize: '14px',
                    margin: '0px 0 6px 3px',
                  }}
                >
                  Sau khi bấm "Chấp nhận", bạn sẽ được chuyển đến trang giao
                  dịch. Vui lòng tải ảnh hóa đơn để xác nhận thanh toán và chờ
                  chủ trọ phê duyệt!
                </span>
              </div>
            </div>
          )}
        </div>
      </ModalComponent>

      {/* MODAL THANH TOÁN "NGÀY THANH TOÁN" BẰNG VÍ NỘI BỘ */}
      {/* <ModalComponent
        modal={isOpen}
        modalTitle="Xác nhận thanh toán"
        footer={
          <>
            <Button className="btn btn-secondary" onClick={toggleModal}>
              {<FormattedMessage {...messages.Cancel} />}
            </Button>
            <Button className="btn btn-success" onClick={SubmitModal}>
              {<FormattedMessage {...messages.Accept} />}
            </Button>
          </>
        }
      >
        <div
          className="bill-content"
          style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <span style={{ minWidth: '300px' }}>
              <FormattedMessage {...messages.RoomPrice} />
              {': '}
            </span>
            <span>{moneyWallet}</span>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <span style={{ minWidth: '300px' }}>
              <FormattedMessage {...messages.ElectricNumber} />
              {': '}
            </span>
            <span>{roundedTotalkWhTime} (kWh)</span>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <span style={{ minWidth: '300px' }}>
              <FormattedMessage {...messages.ElectricPrice} />
              {': '}
            </span>
            <span>{electricPrice}</span>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <span style={{ minWidth: '300px' }}>
              <FormattedMessage {...messages.TotalElectric} />
              {': '}
            </span>
            <span>{roundedTotalElectric}</span>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <span style={{ minWidth: '300px' }}>
              <FormattedMessage {...messages.WaterNumber} />
              {': '}
            </span>
            <span>{waterNumber} (Khối)</span>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <span style={{ minWidth: '300px' }}>
              <FormattedMessage {...messages.WaterPrice} />
              {': '}
            </span>
            <span>{waterPrice}</span>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <span style={{ minWidth: '300px' }}>
              <FormattedMessage {...messages.TotalWater} />
              {': '}
            </span>
            <span>{roundedTotalWater}</span>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <span style={{ minWidth: '300px' }}>
              <FormattedMessage {...messages.VehiclePrice} />
              {': '}
            </span>
            <span>{wifiPrice}</span>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderBottom: '1px solid grey',
              paddingBottom: '6px',
            }}
          >
            <span style={{ minWidth: '300px' }}>
              <FormattedMessage {...messages.ServicePrice} />
              {': '}
            </span>
            <span>{garbagePrice}</span>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <span
              style={{ minWidth: '300px', fontSize: '18px', fontWeight: '700' }}
            >
              <FormattedMessage {...messages.TotalPrice} />
              {': '}
            </span>
            <span style={{ fontSize: '18px', fontWeight: '700' }}>{total}</span>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <span style={{ minWidth: '300px' }}>
              <FormattedMessage {...messages.AmountOfMoneyDec} />
            </span>
          </div>
        </div>
      </ModalComponent> */}
      {/* THANH TOÁN HÀNG THÁNG BẰNG NGÂN HÀNG */}
      <ModalComponent
        modal={isOpen}
        modalTitle="Xác nhận thanh toán"
        footer={
          <>
            <Button className="btn btn-secondary" onClick={toggleModal}>
              {<FormattedMessage {...messages.Cancel} />}
            </Button>
            <Button className="btn btn-success" onClick={SubmitModal}>
              {<FormattedMessage {...messages.Accept} />}
            </Button>
          </>
        }
      >
        <div
          className="bill-content"
          style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <span style={{ minWidth: '300px' }}>
              <FormattedMessage {...messages.numberDayStay} />
              {': '}
            </span>
            <span>{numberDayStay} (ngày)</span>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <span style={{ minWidth: '300px' }}>
              <FormattedMessage {...messages.RoomPrice} />
              {/* {': '} */}
            </span>
            <span>{Money(roomPricePerMon)}/tháng</span>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <span style={{ minWidth: '300px' }}>
              <FormattedMessage {...messages.totalRoomPrice} />
              {': '}
            </span>
            <span>{Money(roomPrice)}</span>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <span style={{ minWidth: '300px' }}>
              <FormattedMessage {...messages.ElectricNumber} />
              {': '}
            </span>
            <span>{electricNumber} (kWh)</span>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <span style={{ minWidth: '300px' }}>
              <FormattedMessage {...messages.ElectricPrice} />
              {': '}
            </span>
            <span>{Money(electricPricePerKwh)}</span>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <span style={{ minWidth: '300px' }}>
              <FormattedMessage {...messages.TotalElectric} />
              {': '}
            </span>
            <span>{Money(electricPrice)}</span>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <span style={{ minWidth: '300px' }}>
              <FormattedMessage {...messages.numberOfPerson} />
              {': '}
            </span>
            <span>{numberPerson} (người)</span>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <span style={{ minWidth: '300px' }}>
              <FormattedMessage {...messages.WaterPrice} />
              {': '}
            </span>
            <span>{Money(waterPricePerPerson)}</span>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <span style={{ minWidth: '300px' }}>
              <FormattedMessage {...messages.TotalWater} />
              {': '}
            </span>
            <span>{Money(waterPrice)}</span>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <span style={{ minWidth: '300px' }}>
              <FormattedMessage {...messages.numberOfVihicle} />
              {': '}
            </span>
            <span>{numberVehicle} (chiếc)</span>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <span style={{ minWidth: '300px' }}>
              <FormattedMessage {...messages.VehiclePrice} />
              {': '}
            </span>
            <span>{Money(vehiclePricePer)}</span>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <span style={{ minWidth: '300px' }}>
              <FormattedMessage {...messages.totalVihicle} />
              {': '}
            </span>
            <span>{Money(vehiclePrice)}</span>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderBottom: '1px solid grey',
              paddingBottom: '6px',
            }}
          >
            <span style={{ minWidth: '300px' }}>
              <FormattedMessage {...messages.ServicePrice} />
              {': '}
            </span>
            <span>{Money(servicePrice)}</span>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <span
              style={{ minWidth: '300px', fontSize: '18px', fontWeight: '700' }}
            >
              <FormattedMessage {...messages.TotalPrice} />
              {': '}
            </span>
            <span style={{ fontSize: '18px', fontWeight: '700' }}>
              {Money(totalPrice)}
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <span style={{ minWidth: '300px' }}>
              {/* <FormattedMessage {...messages.AmountOfMoneyDec} /> */}
              Vui lòng chọn ngân hàng để thanh toán
            </span>
          </div>
          <div>
            <Select
              placeholder="Chọn ngân hàng"
              options={bankOptions}
              onChange={selectedOption => {
                console.log('Selected bank:', selectedOption);
                setSelectedBankName(selectedOption.bankName);
                setSelectedBankNumber(selectedOption.bankNumber);
                setSelectedBankUsername(selectedOption.bankUsername);
                setBanking(selectedOption.objectBankId);
                setKeyPayment(getRandomHex2());
              }}
            />
          </div>

          {selectedBankName && (
            <div style={{ position: 'relative', top: '20px', padding: '0px' }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  paddingBottom: '10px',
                }}
              >
                <span
                  style={{
                    color: 'gray',
                    fontSize: '14px',
                    margin: '0px 0 6px 3px',
                  }}
                >
                  Ngân hàng
                </span>
                <span
                  style={{
                    padding: '8px 8px',
                    border: '1px solid #E2E2E2',
                    borderRadius: '6px',
                  }}
                >
                  {selectedBankName}
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  paddingBottom: '10px',
                }}
              >
                <span
                  style={{
                    color: 'gray',
                    fontSize: '14px',
                    margin: '0px 0 6px 3px',
                  }}
                >
                  Số tài khoản
                </span>
                <span
                  style={{
                    padding: '8px 8px',
                    border: '1px solid #E2E2E2',
                    borderRadius: '6px',
                  }}
                >
                  {selectedBankNumber}
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  paddingBottom: '10px',
                }}
              >
                <span
                  style={{
                    color: 'gray',
                    fontSize: '14px',
                    margin: '0px 0 6px 3px',
                  }}
                >
                  Tên người nhận
                </span>
                <span
                  style={{
                    padding: '8px 8px',
                    border: '1px solid #E2E2E2',
                    borderRadius: '6px',
                  }}
                >
                  {selectedBankUsername}
                </span>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  paddingBottom: '10px',
                }}
              >
                <span
                  style={{
                    color: 'gray',
                    fontSize: '14px',
                    margin: '0px 0 6px 3px',
                  }}
                >
                  Nội dung thanh toán
                </span>
                <span
                  style={{
                    padding: '8px 8px',
                    border: '1px solid #E2E2E2',
                    borderRadius: '6px',
                  }}
                >
                  {keyPayment}
                </span>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  paddingBottom: '10px',
                }}
              >
                <span
                  style={{
                    color: 'brown',
                    fontSize: '14px',
                    margin: '0px 0 6px 3px',
                  }}
                >
                  Sau khi bấm "Chấp nhận", bạn sẽ được chuyển đến trang giao
                  dịch. Vui lòng tải ảnh hóa đơn để xác nhận thanh toán và chờ
                  chủ trọ phê duyệt!
                </span>
              </div>
            </div>
          )}
        </div>
      </ModalComponent>

      <ModalComponent
        modal={modalRenewContract}
        modalTitle="Xác nhận gia hạn hợp đồng"
        footer={
          <>
            <Button
              className="btn btn-secondary"
              onClick={toggleModalRenewContract}
            >
              {<FormattedMessage {...messages.Cancel} />}
            </Button>
            <Button
              className="btn btn-success"
              onClick={SubmitModalRenewContract}
            >
              {<FormattedMessage {...messages.Accept} />}
            </Button>
          </>
        }
      >
        <div className="renew">
          <FormattedMessage {...messages.SelectNumberOfMon}>
            {msg => (
              <>
                <label
                  style={{
                    fontSize: '14px',
                    marginBottom: '2px',
                    fontWeight: 'bold',
                  }}
                >
                  <span>{msg}</span>
                </label>
                <Select
                  placeholder={numberMonRenew}
                  defaultValue={
                    numberMonRenew
                    // optionsRentalPeriod[6]
                  }
                  icon="fa fa-usd"
                  value={numberMonRenew}
                  options={optionsRentalPeriod}
                  className="mb-3"
                  onChange={evt => {
                    setNumberMonRenew(evt.value);

                    // setFieldValue(
                    //   'rentalPeriod',
                    //   handleChangeGender(evt),
                    // );
                    // setFieldValue(
                    //   'total',
                    //   // evt.value * values.price + values.bail,
                    //   values.price + values.bail,
                    // );
                  }}
                />
              </>
            )}
          </FormattedMessage>
        </div>
      </ModalComponent>
    </div>
  );
}

JobDetailUser.propTypes = {
  dispatch: PropTypes.func,
  getBankInfo: PropTypes.func,
  postTransaction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  jobDetailUser: makeSelectJobDetailUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    getBankInfo: id => {
      dispatch(getBankInfo(id));
    },
    postTransaction: payload => {
      dispatch(postTransaction(payload));
    },
    getJob: (id, idRoom) => {
      dispatch(getJob(id, idRoom));
    },
    getProfile: () => {
      dispatch(getProfile());
    },
    putActive: id => {
      dispatch(putActive(id));
    },
    putRenewContract: (id, numberMon, idRoom) => {
      dispatch(putRenewContract(id, numberMon, idRoom));
    },
    putDeposit: payload => {
      dispatch(putDeposit(payload));
    },
    putCheckOut: (id, returnRoomDate) => {
      dispatch(putCheckOut(id, returnRoomDate));
    },
    changeStoreData: (key, value) => {
      dispatch(changeStoreData(key, value));
    },
    changeAppStoreData: (key, value) => {
      dispatch(changeAppStoreData(key, value));
    },
    putJob: id => {
      dispatch(putJob(id));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(JobDetailUser);
