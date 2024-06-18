/**
 *
 * Manager Energy
 *
 */

import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useParams, useLocation, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import _, { set } from 'lodash';
import localStore from 'local-storage';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import {
  Grid,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@material-ui/core';

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Col,
  Row,
} from 'reactstrap';
import { MoreHoriz, Speed } from '@material-ui/icons';


import { Link, useHistory } from 'react-router-dom';

import { Helmet } from 'react-helmet';
import { AccessTime, InsertDriveFile } from '@material-ui/icons';

import { connect } from 'react-redux';
import { compose } from 'redux';
import Button from '@material-ui/core/Button';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { urlLink } from '../../helper/route';
import reducer from './reducer';
import saga from './saga';
import makeSelectMotelListRoom from './selectors';
import { getMotelInfor } from './actions';
import './style.scss';
import ModalComponent from './modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Tooltip from '@material-ui/core/Tooltip';
import { ArrowForwardIos } from '@material-ui/icons';
import { Clock } from '@material-ui/pickers';


const electricMetterStyled = room => ({
  color:
    (room.listIdElectricMetter && room.listIdElectricMetter.length === 0) ? 'red' : 'green',
  fontWeight: (room.listIdElectricMetter && room.listIdElectricMetter.length === 0) || 'bold',
  border:
    (room.listIdElectricMetter && room.listIdElectricMetter.length === 0) || !room.listIdElectricMetter
      ? '1px solid red'
      : '1px solid green',
  width: '30px',
  padding: '4px',
  minWidth: '30px', // Sửa đổi minWidth ở đây
  borderRadius: '5px',
  fontSize: '12px',
  backgroundColor:
    (room.listIdElectricMetter && room.listIdElectricMetter.length === 0) || !room.listIdElectricMetter
      ? 'rgba(255, 0, 0, 0.1)'
      : '#DAFFE9',
});

const ManagerEnergyRoomsHost = props => {
  const currentUser = localStore.get('user') || {};

  const { id, name } = useParams();
  const history = useHistory();

  useInjectReducer({ key: 'motelListRoom', reducer });
  useInjectSaga({ key: 'motelListRoom', saga });

  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [roomName, setRoomName] = useState({});
  const [roomId, setRoomId] = useState({});
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const getFirstDayOfCurrentMonth = () => {
    const currentDate = new Date();
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 2);
    const formattedStartDate = firstDay.toISOString().slice(0, 10);
    return formattedStartDate;
  };

  const getCurrentDate = () => {
    const currentDate = new Date();
    const formattedCurrentDate = currentDate.toISOString().slice(0, 10);
    return formattedCurrentDate;
  }

  const toggle = (roomName, id) => {
    setModal(!modal);
    setRoomId(id);
    setRoomName(roomName);
    console.log(roomName);
  }

  const cancelToggle = () => {
    setModal(!modal);
    //reset date

    setStartDate(getFirstDayOfCurrentMonth());
    setEndDate(getCurrentDate());

  }

  const handleSendMail = async (room) => {
    setModal(!modal);

    if (endDate < startDate) {
      toast.error('Vui lòng nhập ngày bắt đầu nhỏ hơn hoặc bằng ngày kết thúc!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
      });
      setModal(true);
    } else if ((new Date(endDate)) > (new Date())) {
      toast.error('Vui lòng nhập ngày kết thúc không vượt quá ngày hiện tại!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
      });
      setModal(true);
    } else {
      setLoading(true);
      const exportBillRoomApi = urlLink.api.serverUrl + urlLink.api.exportBillRoom + `${id}/${roomId}/${startDate}/${endDate}`;
      console.log(exportBillRoomApi);
      const response = await axios.get(exportBillRoomApi);
      const status = response.data.data;
      console.log('status', status);
      const showToast = (message, isError = true) => {
        toast[isError ? 'error' : 'success'](message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          hideProgressBar: false,
          pauseOnHover: true,
          draggable: true,
        });
        if (!isError) {
          setLoading(false);
        }
      };

      if (status === "exportBillSuccess") {
        showToast('Xuất hóa đơn thành công, vui lòng kiểm tra email!', false);
      } else if (status === "Empty room") {
        showToast('Phòng chưa được thuê!');
      } else if (status === "Room no id metter") {
        showToast('Phòng chưa được đặt đồng hồ điện năng!');
      } else if (status === "No data in this time") {
        showToast('Phòng không có dữ liệu điện trong thời gian xuất hóa đơn');
      }

      //reset date
      setStartDate(getFirstDayOfCurrentMonth());
      setEndDate(getCurrentDate());
      setLoading(false);
    }
  }

  const getStartDay = (event) => {
    if (event.target.value === '') {
      setStartDate(getFirstDayOfCurrentMonth());
    } else {
      setStartDate(event.target.value);
    }
  }

  const getEndDay = (event) => {
    if (event.target.value === '') {
      setEndDate(getCurrentDate());
    } else {
      setEndDate(event.target.value);
    }
  }

  useEffect(() => {
    props.getMotelInfor(id);
    setStartDate(getFirstDayOfCurrentMonth());
    setEndDate(getCurrentDate());
  }, []);

  const { listFloor = [] } = props.motelListRoom;
  console.log({ listFloor })

  // const { floors = [] } = motel;
  // console.log('floors', floors);
  // console.log('motel', motel);

  const cardStyle = {

    border: 'none',
    boxShadow: 'none',
    background: '#FAFAFA',
    maxWidth: '100%',
    borderRadius: '10px',
  };

  const cardIcon = {
    color: '#7B7B7B',
    borderRadius: '50%',
    height: '50px',
    width: '50px',
    backgroundColor: '#18c3a5',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '2px 2px 8px 1px rgba(24, 195, 65, 0.35)',
    position: 'relative',
    zIndex: '1',
    top: '25px',
    left: '25px',
  };

  const StyledButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ebebeb;
    border: none;
    color: #797979;
    font-size: 15px;
    padding: 8px 12px;
    transition: background-color 0.5s;
    border-radius: 20px;
    margin: 40px 0 10px 0;
    width: calc(50% - 10px);
    &:hover {
      background-color: #dedede;
    }
    @media (max-width: 600px) {
      width: calc(50% - 20px);
    }
  `;

  const StyledButton2 = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #6f41cb;
  border: none;
  color: white;
  font-size: 15px;
  padding: 8px 12px;
  transition: background-color 0.5s;
  border-radius: 20px;
  margin: 40px 0 10px 0;
  width: calc(50% - 10px);
  &:hover {
    background-color: #3a1486;
  }
  @media (max-width: 600px) {
    width: calc(50% - 20px);
  }
`;
  const StyleMoreButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    font-size: 17px;
    color: #a7a7a7;
    transition: all 0.3s;
    &:hover{
      background-color: #eeeeee;
    }
  `;

  const cardNameStyle = {
    alignItems: 'center',
    justifyContent: 'center',
    color: '#7B7B7B',
    fontSize: '20px',
    fontWeight: 'bold',

    width: '100%',
  };

  const cardContentStyle = {
    display: 'flex',
    justifyContent: 'justify-start',
    gap: '4px',
  }

  return (
    <div className="container">
      <Helmet>
        <title>Energy</title>
        <meta name="description" content="Description of Energy" />
      </Helmet>
      <div className="title-abc">Quản lý điện năng các phòng tòa {name}</div>
      {loading && <div className='loading-overlay' />}
      <Button
        className="summary-btn"
        onClick={() => {
          history.push(`/manager-energy-building-summary-report/${id}/${name}`);
        }}
      >
        <InsertDriveFile className="summary-icon" />
        Báo cáo tổng hợp
      </Button>
      {currentUser.role.length === 2 && currentUser.role.includes('host') ? (
        <Grid lg={12} container spacing={2}>
          {listFloor.length > 0 && listFloor.map((floor, floorIndex) =>
            floor.rooms.map((room, roomIndex) => (
              <Grid Grid key={`room-${roomIndex}`} item lg={3} md={4} sm={6} xs={12}>
                <ModalComponent
                  modal={modal}
                  toggle={cancelToggle}
                  modalTitle="Xuất hóa đơn"
                  footer={
                    <div>
                      <Button variant='outlined' color="secondary" onClick={cancelToggle}>
                        Hủy
                      </Button>{' '}
                      <Button
                        variant='outlined'
                        color="primary"
                        onClick={() => handleSendMail(room)}>
                        Xác nhận
                      </Button>
                    </div>
                  }
                >
                  <FormGroup>
                    <Label for="startDateBackup">Từ ngày</Label>
                    <Input
                      id="startDateBackup"
                      name="date"
                      placeholder="Ngày bắt đầu..."
                      type="date"

                      defaultValue={getFirstDayOfCurrentMonth()}
                      onChange={getStartDay}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="endDateBackup">Đến ngày</Label>
                    <Input
                      id="endDateBackup"
                      name="date"
                      placeholder="Ngày kết thúc..."
                      type="date"
                      defaultValue={getCurrentDate()}
                      onChange={getEndDay}
                    />
                  </FormGroup>
                  <span>
                    Hóa đơn phòng {roomName} sẽ được gửi đến email của chủ nhà trọ!
                  </span>
                </ModalComponent>
                <div div style={cardIcon}>
                  <AccessTime style={{ color: 'white' }} />
                </div>

                <Card style={cardStyle}>

                  <CardContent>
                    <Typography
                      style={{ display: 'flex', justifyContent: 'flex-end' }}
                    >
                      <Tooltip title="Xem lịch sử số điện" placement='top' arrow>
                        <Link to={`/history-energy/${room._id}/${room.name}`}>
                          <StyleMoreButton>
                            <MoreHoriz />
                          </StyleMoreButton>
                        </Link>
                      </Tooltip>
                    </Typography>


                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      style={cardNameStyle}
                    >
                      <div style={cardContentStyle}>
                        Tên phòng: {' '}<span>{room.name}</span>
                      </div>
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      Số lượng đồng hồ: &nbsp;
                      <span style={electricMetterStyled(room)}>
                        {!room.listIdElectricMetter ||
                          (room.listIdElectricMetter && room.listIdElectricMetter.length === 0) ? (
                          <span style={{ fontWeight: 'bold' }}>
                            Chưa có đồng hồ
                          </span>
                        ) : (
                          room.listIdElectricMetter.length
                        )}
                      </span>
                    </Typography>
                  </CardContent>
                  <CardActions style={{ justifyContent: 'center' }}>
                    <StyledButton>
                      <Link
                        to={`/host/follow-energy/${id}/${room._id}/${room.name}`}
                        style={{ textDecoration: 'none', color: '#6d6d6d' }}
                      >
                        Xem chi tiết
                      </Link>
                    </StyledButton>
                    <StyledButton2 onClick={() => toggle(room.name, room._id)}>Xuất hóa đơn</StyledButton2>
                  </CardActions>
                </Card>
              </Grid>
            )),
          )}
        </Grid>
      ) : (
        'Không có dữ liệu'
      )}
    </div>
  );
};

ManagerEnergyRoomsHost.propTypes = {
  dispatch: PropTypes.func,
  getMotelInfor: PropTypes.func,
  changeStoreData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  motelListRoom: makeSelectMotelListRoom(),
});

function mapDispatchToProps(dispatch) {
  return {
    getMotelInfor: id => {
      dispatch(getMotelInfor(id));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

// export default ManagerEnergyRooms;
export default compose(withConnect)(ManagerEnergyRoomsHost);
