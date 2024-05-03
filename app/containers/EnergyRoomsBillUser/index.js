/**
 *
 * Bill
 *
 */

import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { Button } from '@material-ui/core';
import { Table } from 'reactstrap';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import localStore from 'local-storage';
import { useHistory } from 'react-router-dom';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { changeStoreData, getJobs } from './actions';
import reducer from './reducer';
import saga from './saga';
import makeSelectProfile from './selectors';
import './style.scss';
import { urlLink } from '../../helper/route';
import axios from 'axios';
import localStoreService from 'local-storage';

import useMediaQuery from '@material-ui/core/useMediaQuery';

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
export function EnergyRoomsBillUser(props) {
  const classes = useStyles();
  //   useInjectReducer({ key: 'profile', reducer });
  //   useInjectSaga({ key: 'profile', saga });
  const [urlImgCloud, setUrlImgCloud] = useState('');
  const currentUser = localStore.get('user') || {};
  const [billExist, setBillExist] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    _id = '',
    lastName = '',
    firstName = '',
    role = [],
    phoneNumber = {},
  } = currentUser;
  const history = useHistory();

  const {
    jobs = [],
    profile = {},
    showAlert = false,
    alert = {},
  } = props.profile;
  console.log('jobs', jobs);
  const [dataEnergyPerMonth, setDataEnergyPerMonth] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const promises = jobs.map(async job => {
        try {
          const roomId = job.room._id;
          const totalKWhApi = `${urlLink.api.serverUrl +
            urlLink.api.getDataEnergyPerMonth}${roomId}`;
          const response = await axios.get(totalKWhApi, {
            headers: {
              Authorization: `Bearer ${localStoreService.get('user').token}`,
            },
          });

          const { data } = response.data;
          console.log('data', data);

          if (data.length > 0) {
            const totalKWh = data[0].TotalKWh.toFixed(2);
            console.log('totalKWh', totalKWh);

            if (totalKWh) {
              return totalKWh;
            }
            return 'Chưa có dữ liệu';
          }
          return 'Chưa có dữ liệu';
        } catch (error) {
          console.error('Error fetching data:', error);
          return 'Chưa có dữ liệu';
        }
      });

      const results = await Promise.all(promises);
      setDataEnergyPerMonth(results);
    };

    fetchData();
  }, [jobs]);

  const TenMegaBytes = 10 * 1024 * 1024;

  useEffect(() => {
    props.getJobs();
  }, [urlImgCloud]);
  const {
    motelList,
    error,
    showSuccessPopup,
    showErrorPopup,
    showWarningPopup,
  } = props.profile;
  const [id, setId] = useState('');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    setLoading(true);
    const user = localStore.get('user');
    const userId = user._id;
    const token = localStore.get('token');
    const requestUrl = `${urlLink.api.serverUrl +
      urlLink.api.getUserBill}/${userId}`;

    axios
      .get(requestUrl)
      .then(response => {
        setBillExist(true);
        setLoading(false);
        console.log('response', response.data.data);
        const { data } = response.data;
        const tbody = document.querySelector('tbody');
        tbody.innerHTML = '';
        data.forEach((item, index) => {
          console.log('item', item[index]);
          const tr = document.createElement('tr');
          tr.innerHTML = `
                    <td>${item.user.firstName} ${item.user.lastName}</td>
                    <td>${item.user.phoneNumber.countryCode} ${
            item.user.phoneNumber.number
          }</td>
                    <td>${item.room.name}</td>
                    <td>${item.motelRoom.address.address}</td>
                    <td>${item.description}</td>
                    <td>${item.amount.toLocaleString('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    })}</td>
                    <td>${item.vnpayStatus}</td>
                `;
          tbody.appendChild(tr);
        });
      })
      .catch(error => {
        setLoading(false);
        console.error('error', error);
      });
  }, []);
  return (
    <div className="user-profile-wrapper container">
      <Helmet>
        <title>Bill</title>
        <meta name="description" content="Description of Profile" />
      </Helmet>
      <Grid container align="center">
        <>
          {loading && <div className="loading-overlay" />}
          {billExist ? (
            <Grid item xs={12} className="user-room-container">
              <Table responsive striped className="user-room-table">
                <thead>
                  <th>Người thuê</th>
                  <th>Số điện thoại</th>
                  <th>Phòng</th>
                  <th>Địa chỉ</th>
                  <th>Mô tả</th>
                  <th>Tổng tiền</th>
                  <th>Trạng thái</th>
                </thead>
                <tbody />
              </Table>
            </Grid>
          ) : (
            <div className="no-data">
              <span>Không có hóa đơn nào! 1</span>
            </div>
          )}
        </>
      </Grid>
    </div>
  );
}

EnergyRoomsBillUser.propTypes = {
  dispatch: PropTypes.func,
  getRoomList: PropTypes.func,
  changeStoreData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  profile: makeSelectProfile(),
});

function mapDispatchToProps(dispatch) {
  return {
    getJobs: () => {
      dispatch(getJobs());
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

export default compose(withConnect)(EnergyRoomsBillUser);
