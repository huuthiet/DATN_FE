/**
 *
 * Manager Energy
 *
 */

import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import PropTypes from 'prop-types';
import _ from 'lodash';
import localStore from 'local-storage';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import Tooltip from '@material-ui/core/Tooltip';
import { MoreHoriz, Speed } from '@material-ui/icons';

import {
  Grid,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { AccessTime } from '@material-ui/icons';
import './style.scss';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';

// import reducer from '../Motel/reducer';
// import saga from '../Motel/saga';
// import makeSelectMotel from '../Motel/selectors';

// import { getMotel } from '../Motel/actions';

import { getMotelInfor } from '../ManagerEnergyRoomsHost/actions';
import reducer from '../ManagerEnergyRoomsHost/reducer';
import saga from '../ManagerEnergyRoomsHost/saga';
import makeSelectMotelListRoom from '../ManagerEnergyRoomsHost/selectors';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

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
  background-color: #F2F2F2;
  border: none;
  color: gray;
  font-weight: semi-bold;
  font-size: 15px;
  width: 160px;
  height: 37px;
  padding: 5px 12px;
  transition: background-color 0.5s;
  border-radius: 10px;
  margin: 40px 0 20px 0;
  &:hover {
    background-color: #dedede;
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
  display: 'flex',
  justifyContent: 'start',
  gap: '4px',
  color: '#7B7B7B',
  fontSize: '20px',
  fontWeight: 'bold',
};

const cardContentStyle = {
  margin: '0px 0px 0px 0px',
  pađing: '0px 0px 0px 0px',
}

const ManagerEnergyRoomsAdmin = props => {
  const currentUser = localStore.get('user') || {};

  const { id, name } = useParams();

  useInjectReducer({ key: 'motelListRoom', reducer });
  useInjectSaga({ key: 'motelListRoom', saga });

  useEffect(() => {
    props.getMotelInfor(id);
  }, []);

  const { listFloor = [] } = props.motelListRoom;
  console.log({ listFloor })

  // const { motel = {} } = props.motel;
  // console.log('motel haha', motel);


  // const { floors = [] } = motel;
  // console.log('floors haha', floors);

  const cardStyle = {
    border: 'none',
    boxShadow: 'none',
    background: '#FAFAFA',
    maxWidth: '100%',
    borderRadius: '10px',
    padding: '0px 0px 10px 0px',
  };

  return (
    <div className="container">
      <Helmet>
        <title>Energy</title>
        <meta name="description" content="Description of Energy" />
      </Helmet>
      <div className="title-abc">
        <FormattedMessage {...messages.Header} /> {name}
      </div>
      {currentUser.role.length === 2 && currentUser.role.includes('master') ? (
        <Grid lg={12} container spacing={2}>
          {/* {floors.map((floor, floorIndex) => */}
          {listFloor.length > 0 && listFloor.map((floor, floorIndex) =>
            floor.rooms.map((room, roomIndex) => (
              <Grid key={roomIndex} item lg={3} md={4} sm={6} xs={12}>
                <div div style={cardIcon}>
                  <AccessTime style={{ color: 'white' }} />
                </div>
                <Card style={cardStyle}>
                  <CardContent style={cardContentStyle}>
                    <Typography
                      style={{ display: 'flex', justifyContent: 'flex-end' }}
                    >
                      <Tooltip title={<FormattedMessage {...messages.EnergyHistory} />} placement='top' arrow>
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
                      <FormattedMessage {...messages.RoomName} />{' '}{room.name}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      <FormattedMessage {...messages.MeterQuantity} /> &nbsp;
                      {/* <Speed style={{ fontSize: '22px', marginRight: '5px' }} /> */}
                      <span style={electricMetterStyled(room)}>
                        {!room.listIdElectricMetter ||
                          (room.listIdElectricMetter && room.listIdElectricMetter.length === 0) ? (
                          <span style={{ fontWeight: 'bold' }}>
                            <FormattedMessage {...messages.NoMeter} />
                          </span>
                        ) : (
                          room.listIdElectricMetter.length
                        )}
                      </span>
                    </Typography>
                  </CardContent>
                  <CardActions style={{ justifyContent: 'center', height: '50px', margin: '10px 0' }}>
                    <Link
                      to={`/admin/follow-energy/${id}/${room._id}/${room.name
                        }`}
                      style={{ textDecoration: 'none' }}
                    >
                      <StyledButton>
                        <FormattedMessage {...messages.Detail} />
                      </StyledButton>
                    </Link>
                  </CardActions>
                </Card>
              </Grid>
            )),
          )}
        </Grid>
      ) : (
        ''
      )}
    </div>
  );
};

ManagerEnergyRoomsAdmin.propTypes = {
  dispatch: PropTypes.func,
  // getMotel: PropTypes.func,
  getMotelInfor: PropTypes.func,
  changeStoreData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  // motel: makeSelectMotel(),
  motelListRoom: makeSelectMotelListRoom(),
});

function mapDispatchToProps(dispatch) {
  return {
    // getMotel: id => {
    //   dispatch(getMotel(id));
    // },
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
export default compose(withConnect)(ManagerEnergyRoomsAdmin);
