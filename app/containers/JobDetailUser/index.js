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
import VpnKeyIcon from '@material-ui/icons/VpnKey';
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
  const { id = '', idElectricMetter = '' } = useParams();
  // console.log('idElectricMetter in index: ', idElectricMetter);

  const history = useHistory();
  const today = new Date();
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const {
    job,
    dataEnergy,
    profile: { wallet = '' },
    flagDeposit,
  } = props.jobDetailUser;

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

  console.log('job in index: ', job);

  let roundedTotalkWhTime = 0;
  let totalElectric = 0;
  let electricPrice = 0;
  let roundedTotalElectric = 0;
  let waterNumber = 0;
  let waterPrice = 0;
  let totalWater = 0;
  let garbagePrice = 0;
  let wifiPrice = 0;
  let roundedTotalWater = 0;

  const { totalkWhTime = 0 } = dataEnergy;
  if (job && job.room) {
    roundedTotalkWhTime = totalkWhTime.toFixed(2);

    totalElectric = roundedTotalkWhTime * room.electricityPrice;
    electricPrice = Money(room.electricityPrice);
    roundedTotalElectric = Money(totalElectric);
    waterNumber = dataEnergy.waterNumber || 0;
    waterPrice = Money(room.waterPrice);
    totalWater = waterNumber * room.waterPrice;
    garbagePrice = Money(room.garbagePrice);
    wifiPrice = Money(room.wifiPrice);
    roundedTotalWater = Money(totalWater);
  }

  for (let index = 0; index < optionsRentalPeriod.length; index++) {
    const element = optionsRentalPeriod[index];
    if (element.value < room.minimumMonths) {
      element.isDisabled = true;
    }
  }

  const [datepicker, setDatepicker] = useState(returnRoomDate);

  const [numberMonRenew, setNumberMonRenew] = useState(0);
  // const [numberMonRenewUpdate, setNumberMonRenewUp] = useState(0);

  const checkOutDate = new Date(checkInTime).setMonth(
    new Date(checkInTime).getMonth() + Number(rentalPeriod),
  );

  const minDate = new Date(checkInTime).setMonth(
    new Date(checkInTime).getMonth() + 1,
  );
  const dateStay = Math.ceil(Math.abs(lastDay - today) / (24 * 3600 * 1000));

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

  const [modalRenewContract, setModalRenewContract] = useState(false);

  function toggleModalRenewContract() {
    setModalRenewContract(!modalRenewContract);
    setNumberMonRenew(room.minimumMonths);
  }

  function SubmitModalRenewContract() {
    setModalRenewContract(!modalRenewContract);
    console.log('gọi renew');

    props.putRenewContract(job._id, numberMonRenew);
  }

  function toggleModal() {
    setIsOpen(!isOpen);
  }
  const [isOpenCheckIn, setIsOpenCheckIn] = useState(false);
  const toggleCheckInModal = () => {
    setIsOpenCheckIn(!isOpenCheckIn);
  };

  function SubmitModal() {
    setIsOpen(!isOpen);
    props.putJob(id);
  }

  const submitCheckInModal = () => {
    setIsOpenCheckIn(!isOpenCheckIn);
    props.putJob(id);
  };

  const [moneyWallet, setMoneyWallet] = useState();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (id && idElectricMetter) {
      console.log('id in index: ', id);
      props.getJob(id, idElectricMetter);
      props.getProfile();
    }
  }, [id, idElectricMetter]);

  const ExampleCustomInput = ({ value, onClick }) => (
    <button className="example-custom-input" onClick={onClick}>
      <i className="fa fa-calendar" aria-hidden="true" />
      {value}
    </button>
  );

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
              // secondary={name}
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
                  history.push(`/job-verify/${id}/${idElectricMetter}`);
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
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <VpnKeyIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={<FormattedMessage {...messages.RoomLockCode} />}
              secondary={roomPassword}
            />
          </ListItem>
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
              secondary={moment(lastDay).format('DD/MM/YYYY')}
            />
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
                // history.push(`/payment/${id}`);
                // convert to number
                const roomPriceRounded = parseInt(
                  job.currentOrder.amount.toFixed(0),
                );
                setMoneyWallet(Money(roomPriceRounded));

                const total =
                  roomPriceRounded +
                  totalElectric +
                  totalWater +
                  room.wifiPrice +
                  room.garbagePrice;
                const roundedTotal = Money(total);
                setTotal(roundedTotal);
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
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <AccountBalanceWalletIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={<FormattedMessage {...messages.BalanceInWallet} />}
              secondary={Money(wallet)}
            />
          </ListItem>
        </List>
      </div>
      {/* MODAL THANH TOÁN "THANH TOÁN KHI NHẬN PHÒNG" */}
      <ModalComponent
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
      </ModalComponent>

      {/* MODAL THANH TOÁN "NGÀY THANH TOÁN" */}
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
};

const mapStateToProps = createStructuredSelector({
  jobDetailUser: makeSelectJobDetailUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    getJob: (id, idElectricMetter) => {
      dispatch(getJob(id, idElectricMetter));
    },
    getProfile: () => {
      dispatch(getProfile());
    },
    putActive: id => {
      dispatch(putActive(id));
    },
    putRenewContract: (id, numberMon) => {
      dispatch(putRenewContract(id, numberMon));
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
