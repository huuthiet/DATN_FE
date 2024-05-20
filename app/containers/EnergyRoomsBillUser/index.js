import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Button, Grid, useTheme, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { DataGrid } from '@mui/x-data-grid';
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
  const [urlImgCloud, setUrlImgCloud] = useState('');
  const currentUser = localStore.get('user') || {};
  const [billExist, setBillExist] = useState(false);
  const [loading, setLoading] = useState(false);
  const { _id = '', lastName = '', firstName = '', role = [], phoneNumber = {} } = currentUser;
  const history = useHistory();
  const { jobs = [], profile = {}, showAlert = false, alert = {} } = props.profile;
  const [dataEnergyPerMonth, setDataEnergyPerMonth] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const promises = jobs.map(async job => {
        try {
          const roomId = job.room._id;
          const totalKWhApi = `${urlLink.api.serverUrl + urlLink.api.getDataEnergyPerMonth}${roomId}`;
          const response = await axios.get(totalKWhApi, {
            headers: {
              Authorization: `Bearer ${localStoreService.get('user').token}`,
            },
          });

          const { data } = response.data;
          if (data.length > 0) {
            const totalKWh = data[0].TotalKWh.toFixed(2);
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

  useEffect(() => {
    props.getJobs();
  }, [urlImgCloud]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    setLoading(true);
    const user = localStore.get('user');
    const userId = user._id;
    const requestUrl = `${urlLink.api.serverUrl + urlLink.api.getUserBill}/${userId}`;

    axios.get(requestUrl)
      .then(response => {
        setBillExist(true);
        setLoading(false);
        const { data } = response.data;
        const formattedRows = data.map((item, index) => ({
          id: `${userId}-${index}`, // Ensure unique id
          renter: `${item.user.firstName} ${item.user.lastName}`,
          phoneNumber: `${item.user.phoneNumber.countryCode} ${item.user.phoneNumber.number}`,
          room: item.room.name,
          address: item.motelRoom.address.address,
          description: item.description,
          amount: item.amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
          status: item.vnpayStatus,
        }));
        setRows(formattedRows);
      })
      .catch(error => {
        setLoading(false);
        console.error('error', error);
      });
  }, []);

  const columns = [
    { field: 'renter', headerName: 'Người thuê', width: 200 },
    { field: 'phoneNumber', headerName: 'Số điện thoại', width: 200 },
    { field: 'room', headerName: 'Phòng', width: 150 },
    { field: 'address', headerName: 'Địa chỉ', width: 250 }, // Increased flex for better visibility
    { field: 'description', headerName: 'Mô tả', width: 250 }, // Increased flex for better visibility
    { field: 'amount', headerName: 'Tổng tiền', width: 160 },
    { field: 'status', headerName: 'Trạng thái', width: 160 },
  ];

  console.log('rows', rows);

  return (
    <div className="user-profile-wrapper container">
      <Helmet>
        <title>Bill</title>
        <meta name="description" content="Description of Profile" />
      </Helmet>
      <Grid container align="center">
        {loading && <div className="loading-overlay" />}
        {billExist ? (
          <Grid item xs={12}>
            <div style={{ width: '100%' }}>
              <DataGrid
                // getRowId={row => row.key}
                rows={rows}
                columns={columns}
                pageSize={5}
                autoHeight
                disableSelectionOnClick
                disableColumnMenu
              />
            </div>
          </Grid>
        ) : (
          <div className="no-data">
            <span>Không có hóa đơn nào!</span>
          </div>
        )}
      </Grid>
    </div>
  );
}

EnergyRoomsBillUser.propTypes = {
  dispatch: PropTypes.func,
  getJobs: PropTypes.func.isRequired,
  changeStoreData: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
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

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(EnergyRoomsBillUser);
