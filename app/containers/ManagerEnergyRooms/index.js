/**
 *
 * Manager Energy
 *
 */

import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import localStore from 'local-storage';
import { createStructuredSelector } from 'reselect';

import {
  Grid, 
  Paper,
  Card, 
  CardActions,
  CardContent,
  CardMedia, 
  Button,
  Typography
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { NavLink, useHistory } from 'react-router-dom';

import axios, { AxiosResponse } from 'axios';

import messages from './messages';
import { urlLink } from '../../helper/route';
import './style.scss';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  changeStoreData,
  getListDeviceEnergy,
} from './actions';

import reducer from './reducer';
import saga from './saga';
import makeSelectListDeviceEnergy from './selectors';


const ManagerEnergyRooms = props => {
  const currentUser = localStore.get('user') || {};

  useInjectReducer({ key: 'listDeviceEnergy', reducer });
  useInjectSaga({ key: 'listDeviceEnergy', saga });

  // const [roomList, setRoomList] = useState([]);

  const {listDeviceEnergy = [] } = props.listDeviceEnergy;

  useEffect(() => {
    props.getListDeviceEnergy();
  }, []);

  console.log("listDeviceEnergy", listDeviceEnergy)
  

  // const [dataLineChart, setDataLineChart] = useState([]);


// const fetchData = async () => {
//   const apiUrl = urlLink.api.serverUrl + urlLink.api.getListDeviceEnergy;
//   try {
//     const response = await axios.get(apiUrl);

//     setRoomList(response.data.data);

//     console.log('dataa', roomList);
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
// };

// useEffect(() => {
//   fetchData();
// }, []);

  const layouts = [
    { i: '1', x: 0, y: 0, w: 1, h: 1 },
    { i: '2', x: 1, y: 0, w: 1, h: 1 },
    { i: '3', x: 2, y: 0, w: 1, h: 1 },
    // Thêm các ô khác tương tự
  ];

  const inlineStyles = {
    color: 'blue',
    fontSize: '16px',
    border: '1px solid #ccc',
    padding: '10px',
    backgroundColor: 'lightgray',
    height: '100px',
  };

  return (
    <div className="container">
      
      {/* {!_.isEmpty(currentUser) ? ( */}
        <>
        <Helmet>
          <title>Energy</title>
          <meta name="description" content="Description of Energy" />
        </Helmet>
        <div className="title-abc">Quản lý năng lượng các phòng</div>
      {/* {currentUser.role.includes('host') && ( */}
        <Grid lg={12} container spacing={2}>
        {listDeviceEnergy.map((room, index) => (
          <>
          <Grid key={index} item lg={3} md={4} sm={6} xs={12}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image="../../images/air_conditioner.png"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {room.Name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Id đồng hồ: {room.Id}
                </Typography>
              </CardContent>
              <CardActions style={{ justifyContent: 'center' }}>
                <Link to={`/admin/follow-energy/${room.Id}/${room.Name}`}>
                  <Button variant="contained" size="small">Xem chi tiết</Button>
                </Link>
              </CardActions>
            </Card>
        </Grid>
          </>
        ))}
      </Grid>
      {/* )} */}
        </>
      {/* ) : (
        <h1>Không có quyền truy cập</h1>
      )} */}
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  listDeviceEnergy: makeSelectListDeviceEnergy(),
});

function mapDispatchToProps(dispatch) {
  return {
    getListDeviceEnergy: () => {
      dispatch(getListDeviceEnergy());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);


// export default ManagerEnergyRooms;
export default compose(withConnect)(ManagerEnergyRooms);
