/**
 *
 * MotelDetail
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { useParams } from 'react-router';
import ClassNames from 'classnames';

import { FormattedMessage } from 'react-intl';
import { Button } from 'reactstrap';

// import { getMotel } from '../Motel/actions';
import { getMotelDetail } from './actions';
import FloorDetail from '../../components/FloorDetail';
import FloorDetailV2 from '../../components/FloorDetailV2';
import messages from './messages';
import ModalComponent from './modal';
import makeSelectMotelDetail from './selectors';
import reducer from './reducer';
import saga from './saga';
import './style.scss';

export function motelDetailV2(props) {
  const { id } = useParams();
  const [status, setStatus] = useState('0');
  const [modal, setModal] = useState(false);
  useInjectReducer({ key: 'motelDetail', reducer });
  useInjectSaga({ key: 'motelDetail', saga });
  useEffect(() => {
    props.getMotelDetail(id);
  }, []);
  const { motel = {} } = props.motelDetail;

  const idMotel = motel._id;

  console.log('motel', motel);

  const {
    totalRoom = '',
    rentedRoom = '',
    availableRoom = '',
    depositedRoom = '',
    soonExpireContractRoom = '',
  } = motel;

  const homelandContent = {
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    color: '#000',
  };
  return (
    <div className="motel-detail-wrapper">
      <Helmet>
        <title>Motel Detail</title>
        <meta name="description" content="Description of MotelDetail" />
      </Helmet>

      {/* STATUS BAR */}
      <div className="status-bar">
        <div
          className={ClassNames('status-item total', {
            active: status === '0',
          })}
          onClick={() => {
            status !== '0' && setStatus('0');
          }}
        >
          <div style={homelandContent}>
            <div className="content">
              <FormattedMessage {...messages.All} />
            </div>
            <div className="quantity">({totalRoom})</div>
          </div>
        </div>

        <div
          className={ClassNames('status-item rented', {
            active: status === '1',
          })}
          onClick={() => {
            status !== '1' && setStatus('1');
          }}
        >
          <div style={homelandContent}>
            <div className="content">
              <FormattedMessage {...messages.Rented} />
            </div>
            <div className="quantity">({rentedRoom})</div>
          </div>
        </div>

        <div
          className={ClassNames('status-item available', {
            active: status === '2',
          })}
          onClick={() => {
            status !== '2' && setStatus('2');
          }}
        >
          <div style={homelandContent}>
            <div className="content">
              <FormattedMessage {...messages.Available} />
            </div>
            <div className="quantity">({availableRoom})</div>
          </div>
        </div>

        <div
          className={ClassNames('status-item deposited', {
            active: status === '3',
          })}
          onClick={() => {
            status !== '3' && setStatus('3');
          }}
        >
          <div style={homelandContent}>
            <div className="content">
              <FormattedMessage {...messages.Deposited} />
            </div>
            <div className="quantity">({depositedRoom})</div>
          </div>
        </div>

        <div
          className={ClassNames('status-item soonExpireContract', {
            active: status === '4',
          })}
          onClick={() => {
            status !== '4' && setStatus('4');
            console.log({ status });
          }}
        >
          <div style={homelandContent}>
            <div className="content">
              <FormattedMessage {...messages.soonExpireContract} />
            </div>
            <div className="quantity">({soonExpireContractRoom})</div>
          </div>
        </div>
      </div>
      {idMotel && (
        <FloorDetailV2 {...props} idMotel={idMotel} owner={motel.owner} status={status} />
      )
      }
    </div>
  );
}

motelDetailV2.propTypes = {
  dispatch: PropTypes.func,
  getMotelDetail: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  motelDetail: makeSelectMotelDetail(),
});

function mapDispatchToProps(dispatch) {
  return {
    getMotelDetail: id => {
      dispatch(getMotelDetail(id));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(motelDetailV2);
