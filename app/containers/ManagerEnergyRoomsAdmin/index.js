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
import { MoreHoriz } from '@material-ui/icons';

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

import reducer from '../Motel/reducer';
import saga from '../Motel/saga';
import makeSelectMotel from '../Motel/selectors';

import { getMotel } from '../Motel/actions';

const electricMetterStyled = room => ({
  color:
    room.idElectricMetter === '0' || !room.idElectricMetter ? 'red' : 'green',
  fontWeight: room.idElectricMetter === '0' || 'bold',
  border:
    room.idElectricMetter === '0' || !room.idElectricMetter
      ? '1px solid red'
      : '1px solid green',
  padding: room.idElectricMetter === '0' || '5px',
  borderRadius: room.idElectricMetter === '0' || '5px',
  backgroundColor:
    room.idElectricMetter === '0' || !room.idElectricMetter
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
  alignItems: 'center',
  justifyContent: 'center',
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

  useInjectReducer({ key: 'motel', reducer });
  useInjectSaga({ key: 'motel', saga });

  useEffect(() => {
    props.getMotel(id);
  }, []);

  const { motel = {} } = props.motel;
  console.log('motel haha', motel);


  const { floors = [] } = motel;
  console.log('floors haha', floors);

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
      <div className="title-abc">Quản lý năng lượng các phòng tòa {name}</div>
      {currentUser.role.length === 2 && currentUser.role.includes('master') ? (
        <Grid lg={12} container spacing={2}>
          {floors.map((floor, floorIndex) =>
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
                      <Tooltip title="Xem lịch sử số điện" placement='top' arrow>
                        <Link to={`/energy-billing-manage/${motel._id}/rooms/${room._id}`}>
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
                      {room.name}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      ID đồng hồ: &nbsp;
                      <span style={electricMetterStyled(room)}>
                        {room.idElectricMetter === '0' ||
                          !room.idElectricMetter ? (
                          <span style={{ fontWeight: 'bold' }}>
                            Chưa được đặt
                          </span>
                        ) : (
                          room.idElectricMetter
                        )}
                      </span>
                    </Typography>
                  </CardContent>
                  <CardActions style={{ justifyContent: 'center', height: '50px', margin: '10px 0' }}>
                    <Link
                      to={`/admin/follow-energy/${motel._id}/${room._id}/${room.idElectricMetter}/${room.name
                        }`}
                      style={{ textDecoration: 'none' }}
                    >
                      <StyledButton>Xem chi tiết</StyledButton>
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
  getMotel: PropTypes.func,
  changeStoreData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  motel: makeSelectMotel(),
});

function mapDispatchToProps(dispatch) {
  return {
    getMotel: id => {
      dispatch(getMotel(id));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

// export default ManagerEnergyRooms;
export default compose(withConnect)(ManagerEnergyRoomsAdmin);