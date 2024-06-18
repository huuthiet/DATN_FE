/**
 *
 * ManagerEnergyBuildingsHost
 *
 */

import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Button } from 'reactstrap';
import {
  FormGroup,
  Label,
  Input,
} from 'reactstrap';
import Card from '@material-ui/core/Card';
import { HomeRounded, LocationOn } from '@material-ui/icons';

import localStore from 'local-storage';
import { useHistory } from 'react-router-dom';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { getMotelList } from './actions';
import reducer from './reducer';
import saga from './saga';
import makeSelectManagerBuildingHost from './selectors';
import './style.scss';
import ModalComponent from './modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { urlLink } from '../../helper/route';
import {
  Grid,
  CardActions,
  CardContent,
  Typography,
} from '@material-ui/core';

export function ManagerEnergyBuildingsHost(props) {
  useInjectReducer({ key: 'motelprofileList', reducer });
  useInjectSaga({ key: 'motelprofileList', saga });

  const currentUser = localStore.get('user') || {};
  const { role = [] } = currentUser;
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [motelName, setMotelName] = useState('');
  const [motelId, setMotelId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const getFirstDayOfCurrentMonth = () => {
    const currentDate = new Date();
    const firstDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      2,
    );
    const formattedStartDate = firstDay.toISOString().slice(0, 10);
    return formattedStartDate;
  };

  const getCurrentDate = () => {
    const currentDate = new Date();
    const formattedCurrentDate = currentDate.toISOString().slice(0, 10);
    return formattedCurrentDate;
  };

  useEffect(() => {
    props.getMotelList();

    setStartDate(getFirstDayOfCurrentMonth());
    setEndDate(getCurrentDate());
  }, []);

  const { motelList } = props.profile;

  const toggle = (motelName, id) => {
    setModal(!modal);
    setMotelName(motelName);
    setMotelId(id);
    console.log('motelName', motelName);
    console.log('motelId', id);
  };

  const cancelToggle = () => {
    setModal(!modal);
    //reset date

    setStartDate(getFirstDayOfCurrentMonth());
    setEndDate(getCurrentDate());
  };

  const handleSendMail = async motel => {
    setModal(!modal);

    if (endDate < startDate) {
      toast.error(
        'Vui lòng nhập ngày bắt đầu nhỏ hơn hoặc bằng ngày kết thúc!',
        {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          hideProgressBar: false,
          pauseOnHover: true,
          draggable: true,
        },
      );
      setModal(true);
    } else if (new Date(endDate) > new Date()) {
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
      const exportBillAllRoomApi =
        urlLink.api.serverUrl +
        urlLink.api.exportBillAllRoom +
        `${motelId}/${startDate}/${endDate}`;
      console.log('exportBillAllRoomApi', exportBillAllRoomApi);
      const response = await axios.get(exportBillAllRoomApi);
      console.log('response', response);
      const status = response.data.data;
      const toastConfig = {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
      };

      const showToast = (message, isError = true) => {
        toast[isError ? 'error' : 'success'](message, toastConfig);
        setModal(isError);
      };

      if (status === 'Motel has no rented rooms') {
        showToast('Không có phòng nào được thuê trong thời gian này!');
      } else if (status === 'Motel has no rooms with idMetter') {
        showToast('Không có phòng nào có idMetter!');
      } else if (status === 'Motel has no floors') {
        showToast('Không có tầng nào trong tòa nhà!');
      } else if (status === 'exportBillAllRoomSuccess') {
        showToast('Xuất hóa đơn thành công!', false);
        setLoading(false);
      }
    }
  };

  const getStartDay = event => {
    if (event.target.value === '') {
      setStartDate(getFirstDayOfCurrentMonth());
    } else {
      setStartDate(event.target.value);
    }
  };

  const getEndDay = event => {
    if (event.target.value === '') {
      setEndDate(getCurrentDate());
    } else {
      setEndDate(event.target.value);
    }
  };

  console.log('motelList', motelList);

  return (
    <div className="user-profile-wrapper container">
      <Helmet>
        <title>Quản lý điện năng các tòa nhà</title>
        <meta name="description" content="Description of Profile" />
      </Helmet>
      <div className="title-abc">Quản lý điện năng các tòa nhà</div>
      {loading && <div className="loading-overlay" />}

      {role.length === 2 && role[0] === 'host' ? (
        <>
          <Grid lg={12} container spacing={2} className="card-wrap">
            {motelList && motelList.length > 0 &&
              motelList.map((motel, key) => (
                <Grid className="motel-card" key={key} lg={3} md={4} sm={6} xs={12}>
                  <ModalComponent
                    modal={modal}
                    toggle={cancelToggle}
                    modalTitle="Xuất hóa đơn"
                    footer={
                      <div>
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={cancelToggle}
                        >
                          Hủy
                        </Button>{' '}
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => handleSendMail(motel)}
                        >
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
                    <div>
                      {/* Bạn có chắc muốn backup dữ liệu từ ngày {formattedStartDateBackup} đến {formattedEndDateBackup} không? Quá trình này có thể mất
                      một khoảng thời gian dài. */}
                      Hóa đơn các phòng của tòa {motelName} sẽ được gửi vào
                      email của bạn. Xác nhận xuất hóa đơn!
                    </div>
                  </ModalComponent>

                  <div className="icon-card">
                    <HomeRounded style={{ color: 'white' }} />
                  </div>
                  <Card variant="outlined" className="card-container">
                    <div className="card-content">
                      <div className="card-motel-name">
                        <HomeRounded
                          style={{
                            color: 'gray',
                            height: '22px',
                            width: '22px',
                          }}
                        />
                        {motel.name}
                      </div>

                      <br />
                      <div className="card-motel-address">
                        <LocationOn
                          style={{
                            color: 'gray',
                            height: '22px',
                            width: '22px',
                          }}
                        />
                        {motel.address.address}
                      </div>
                    </div>
                    <div className='button-container'>
                      <button
                        className="detail-button"
                        onClick={() => {
                          history.push(
                            `/manager-energy-rooms-host/${motel._id}/${motel.name
                            }`,
                          );
                        }}
                      >
                        Xem chi tiết
                      </button>

                      <button
                        className="detail-button"
                        onClick={() => toggle(motel.name, motel._id)}
                      >
                        Xuất hóa đơn
                      </button>
                    </div>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </>
      ) : (
        ''
      )}
    </div>
  );
}

ManagerEnergyBuildingsHost.propTypes = {
  dispatch: PropTypes.func,
  getRoomList: PropTypes.func,
  changeStoreData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  profile: makeSelectManagerBuildingHost(),
});

function mapDispatchToProps(dispatch) {
  return {
    getMotelList: () => {
      dispatch(getMotelList());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ManagerEnergyBuildingsHost);
