/**
 *
 * Profile
 *
 */

import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import {
  Avatar,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  colors,
} from '@material-ui/core';
import { Table, Col, Row } from 'reactstrap';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import AddIcon from '@material-ui/icons/Add';
import ContactsIcon from '@material-ui/icons/Contacts';
import DeleteIcon from '@material-ui/icons/Delete';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import PhoneIcon from '@material-ui/icons/Phone';
import RoomIcon from '@material-ui/icons/Room';
import TocIcon from '@material-ui/icons/Toc';
import ReportIcon from '@material-ui/icons/Report';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import localStore from 'local-storage';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router-dom';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import AlertDialog from '../../components/AlertDialog/Loadable';
import PaperWrapper from '../../components/PaperWrapper/Loadable';
import SuccessPopup from '../../components/SuccessPopup';
import WarningPopup from '../../components/WarningPopup';
import Money from '../../helper/format';
import { changeStoreData, getJobs } from './actions';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import makeSelectProfile from './selectors';
import './style.scss';
import { urlLink } from '../../helper/route';
import axios from 'axios';
import localStoreService from 'local-storage';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { set } from 'lodash';

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
export function ManagerEnergyRoomsUser(props) {
  const classes = useStyles();
  // useInjectReducer({ key: 'profile', reducer });
  // useInjectSaga({ key: 'profile', saga });
  // const [urlImgCloud, setUrlImgCloud] = useState('');
  const currentUser = localStore.get('user') || {};

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
          const { _id } = job;
          console.log({_id});

          const totalKWhApi =
            `${urlLink.api.serverUrl +
            urlLink.api.getDataEnergyPerDayV2}${_id}`;

            console.log({totalKWhApi});
          const response = await axios.get(totalKWhApi, {
            headers: {
              Authorization: `Bearer ${localStoreService.get('user').token}`,
            },
          });

          const { data } = response.data;

          if (data !== null) {
            const totalKWh = data.toFixed(2);
            console.log('totalKWh', totalKWh);

            return totalKWh;
          }
          console.log('Chưa có dữ liệu');
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
  // const handleFileInputChange = e => {
  //   const abcfile = e.target.files[0];
  //   // check mb file size
  //   if (abcfile.size <= TenMegaBytes) {
  //     const formData = new FormData();
  //     formData.append('file', abcfile);
  //     try {
  //       const data = {
  //         // eslint-disable-next-line no-underscore-dangle
  //         id: profile._id,
  //         formData,
  //       };
  //       apiPostImg(data);
  //     } catch (error) { }
  //   }
  // };
  // const apiPostImg = async payload => {
  //   const { id, formData } = payload;
  //   // eslint-disable-next-line no-useless-concat
  //   const requestUrl =
  //     `${urlLink.api.serverUrl}/v1/uploading` + `/img/${id}/user`;
  //   const config = {
  //     headers: {
  //       'content-type': 'multipart/form-data',
  //       Authorization: `Bearer ${localStoreService.get('user').token}`,
  //     },
  //   };
  //   try {
  //     const response = await axios.post(requestUrl, formData, config);
  //     if (response.data.data.images) {
  //       setUrlImgCloud(response.data.data.images.imageUrl);
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  useEffect(() => {
    props.getJobs();
  }, []);
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

  return (
    <div className="user-profile-wrapper container">
      <Helmet>
        <title>Energy Rooms</title>
        <meta name="description" content="Description of Profile" />
      </Helmet>
      <Grid container align="center">
        <>
          <Grid item xs={12} className="user-room-container">
            <div className="table-responsive">
              <table striped className="user-room-table">
                <thead>
                  <tr>
                    <th>Người thuê</th>
                    <th>Số điện thoại</th>
                    <th>Phòng</th>
                    <th>Số đồng hồ đã sử dụng</th>
                    <th>Số điện tháng hiện tại (kWh)</th>
                    <th>Chi tiết</th>
                  </tr>
                </thead>

                <tbody>
                  {jobs.map((job, index) => (
                    <tr key={job._id}>
                      <td>{job.fullName || 'Chưa có dữ liệu'}</td>
                      <td>{job.phoneNumber || 'Chưa có dữ liệu'}</td>
                      <td>{job.room.name || 'Chưa có dữ liệu'}</td>
                      <td>{(job.room.listIdElectricMetter)? job.room.listIdElectricMetter.length : 0 }</td>
                      <td>
                        {dataEnergyPerMonth[index]
                          ? `${dataEnergyPerMonth[index]}`
                          : 'Chưa có dữ liệu'}
                      </td>
                      <td>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            history.push(
                              `/follow-energy/${job.room._id}/${job.room.name}`,
                            );
                            // /follow-energy/:id/:roomId/:idMetter/:name"
                          }}
                        >
                          Xem
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Grid>
        </>
      </Grid>
    </div>
  );
}

ManagerEnergyRoomsUser.propTypes = {
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

export default compose(withConnect)(ManagerEnergyRoomsUser);
