/**
 *
 * ManagerEnergyBuildingsHost
 *
 */

import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { makeStyles } from '@material-ui/core/styles';
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

export function ManagerEnergyBuildingsHost(props) {
  useInjectReducer({ key: 'motelRoom', reducer });
  useInjectSaga({ key: 'motelRoom', saga });

  const currentUser = localStore.get('user') || {};
  const { role = [] } = currentUser;
  const history = useHistory();

  useEffect(() => {
    props.getMotelList();
  }, []);
  const { motelList } = props.motelRoom;

  return (
    <div className="user-profile-wrapper container">
      <Helmet>
        <title>Quản lý tiền điện nước các tòa</title>
        <meta name="description" content="Description of Profile" />
      </Helmet>
      <div className="title-abc">Quản lý tiền điện nước các tòa</div>

      {role.length === 2 && role[0] === 'host' ? (
        <div className="card-wrap">
          {motelList.length > 0 &&
            motelList.map((motel, key) => (
              <div className="motel-card" key={key}>
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
                      <span className="motel-name">
                        {motel.name.toUpperCase()}
                      </span>
                    </div>
                    <br />
                    <div className='card-motel-address'>
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
                  <div
                    className="detail-button"
                    onClick={() => {
                      history.push(
                        `/energy-billing-manage/${motel._id}/rooms`,
                        {
                          name: motel.name,
                        },
                      );
                    }}
                  >
                    Danh sách phòng
                  </div>
                </Card>
              </div>
            ))}
        </div>
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
  motelRoom: makeSelectManagerBuildingHost(),
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
