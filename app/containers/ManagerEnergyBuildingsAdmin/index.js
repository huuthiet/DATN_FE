import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
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
import { useParams } from 'react-router';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

export function ManagerEnergyBuildingsAdmin(props) {
  useInjectReducer({ key: 'motelprofileList', reducer });
  useInjectSaga({ key: 'motelprofileList', saga });

  const { id, name } = useParams();

  const currentUser = localStore.get('user') || {};
  const { role = [] } = currentUser;
  const history = useHistory();

  useEffect(() => {
    props.getMotelList(id);
  }, []);
  console.log('props', props);
  const { motelList } = props.profile;
  console.log('motelList', motelList);

  return (
    <div className="user-profile-wrapper container">
      <Helmet>
        <title>Profile</title>
        <meta name="description" content="Description of Profile" />
      </Helmet>
      <div className="title-abc">
        <FormattedMessage {...messages.Header} />
        <div>
          <FormattedMessage {...messages.HostName} /> {name}
        </div>
      </div>

      {role.length === 2 && role.includes('master') ? (
        <>
          <div className="card-wrap">
            {motelList !== undefined ? (
              motelList.length > 0 ? (
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
                          {motel.addressName}
                        </div>
                      </div>
                      <div className='button-container'>
                        <button
                          className="detail-button"
                          onClick={() => {
                            history.push(
                              `/admin/manager-energy-rooms-admin/${motel._id}/${motel.name
                              }`,
                            );
                          }}
                        >
                          <FormattedMessage {...messages.Detail} />
                        </button>
                      </div>
                    </Card>
                  </div>
                ))
              ) : (
                <p className="text-center">
                  <FormattedMessage {...messages.NoData} />
                </p>
              )
            ) : (
              ''
            )}
          </div>
        </>
      ) : (
        ''
      )}
    </div>
  );
}

ManagerEnergyBuildingsAdmin.propTypes = {
  dispatch: PropTypes.func,
  getRoomList: PropTypes.func,
  changeStoreData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  profile: makeSelectManagerBuildingHost(),
});

function mapDispatchToProps(dispatch) {
  return {
    getMotelList: id => {
      dispatch(getMotelList(id));
    }
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ManagerEnergyBuildingsAdmin);

