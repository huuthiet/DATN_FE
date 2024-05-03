/**
 *
 * Manager Energy
 *
 */

import React, { useEffect } from 'react';
import { useParams, useLocation, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';
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
import { Helmet } from 'react-helmet';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import reducer from '../../Motel/reducer';
import saga from '../../Motel/saga';
import makeSelectMotel from '../../Motel/selectors';
import { getMotel } from '../../Motel/actions';
import './style.scss';

const RoomManage = props => {
  const currentUser = localStore.get('user') || {};

  const { id } = useParams(); //Building id
  const location = useLocation();
  const { name = '' } = location.state;

  useInjectReducer({ key: 'motel', reducer });
  useInjectSaga({ key: 'motel', saga });

  useEffect(() => {
    props.getMotel(id);
  }, []);

  const { motel = {} } = props.motel;

  const { floors = [] } = motel;

  const StyledButton = styled.button`
    display: flex;
    background-color: white;
    border: 1px solid #18c3a5;
    color: #189e86;
    font-weight: bold;
    padding: 5px 30px;
    transition: background-color 0.5s;
    border-radius: 20px;
    margin: 10px 0;

    &:hover {
      background-color: #189e86;
      color: white;
      transition: background-color 0.5s;
    }
  `;

  return (
    <div className="container">
      <Helmet>
        <title>Quản lý tiền điện nước</title>
        <meta name="description" content="Description of Energy" />
      </Helmet>
      <div className="title-abc">Quản lý tiền điện nước tòa {name}</div>
      {currentUser.role.length === 2 && currentUser.role.includes('host') ? (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {floors.map((floor, floorIndex) => (
            <>
              <div key={floorIndex} style={{ marginBottom: '20px' }}>
                <Typography style={{ fontSize: 20, fontWeight: '600' }}>
                  {floor.name}
                </Typography>
                <Grid style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                  {floor.rooms.map((room, roomIndex) => (
                    <Card className="card-container" key={roomIndex}>
                      <CardContent>
                        <Typography style={{ fontSize: 14 }}>
                          Phòng: {room.name}
                        </Typography>
                        <Typography style={{ fontSize: 14 }}>
                          Trạng thái:{' '}
                          {room.status === 'available' ? 'Còn trống' : 'Đã thuê'}
                        </Typography>
                      </CardContent>
                      <CardActions style={{ justifyContent: 'center' }}>
                        <NavLink
                          to={`/energy-billing-manage/${id}/rooms/${room._id}`}
                          style={{ textDecoration: 'none' }}
                        >
                          <StyledButton className="detail-button">
                            Xem tiền điện nước
                          </StyledButton>
                        </NavLink>
                      </CardActions>
                    </Card>
                  ))}
                </Grid>
              </div>
            </>

          ))}
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

RoomManage.propTypes = {
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
export default compose(withConnect)(RoomManage);
