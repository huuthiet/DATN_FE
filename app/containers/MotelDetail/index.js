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
import makeSelectMotelDetail from './selectors';
import reducer from './reducer';
import saga from './saga';
import './style.scss';
import ClassNames from 'classnames';
import { getMotel } from '../Motel/actions';
import FloorDetail from '../../components/FloorDetail';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import ModalComponent from './modal';
import { Button } from 'reactstrap';

export function MotelDetail(props) {
  const { id } = useParams();
  const [status, setStatus] = useState('0');
  const [modal, setModal] = useState(false);
  useInjectReducer({ key: 'motelDetail', reducer });
  useInjectSaga({ key: 'motelDetail', saga });
  useEffect(() => {
    props.getMotel(id);
  }, []);
  const { motel = {} } = props.motelDetail;

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
      <FloorDetail {...props} owner={motel.owner} status={status} />
    </div>
  );
}

MotelDetail.propTypes = {
  dispatch: PropTypes.func,
  getMotel: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  motelDetail: makeSelectMotelDetail(),
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

export default compose(withConnect)(MotelDetail);
