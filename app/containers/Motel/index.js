/**
 *
 * Motel
 *
 */

import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import localStore from 'local-storage';
import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { Button, Col, Container, Row, UncontrolledCarousel } from 'reactstrap';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import SuccessPopup from '../../components/SuccessPopup';
import WarningPopup from '../../components/WarningPopup';
import Money from '../App/format';
import { changeStoreData, getMotel, getMotelInfor, postFloor } from './actions';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import makeSelectMotel from './selectors';
import './style.scss';
import defaultRoomImage from '../../images/defaul-room.jpg';
import { Edit } from '@material-ui/icons';
import { Add } from '@material-ui/icons';

export function Motel(props) {
  const { id } = useParams();
  const history = useHistory();
  useInjectReducer({ key: 'motel', reducer });
  useInjectSaga({ key: 'motel', saga });
  useEffect(() => {
    props.getMotelInfor(id);
  }, []);
  const [formData, setFormData] = useState('');
  const {
    motelInfor = {},
    showSuccessPopup,
    showErrorPopup,
    showWarningPopup,
  } = props.motel;
  console.log('motelInfor', motelInfor);
  const isEdit =
    localStore.get('user') === null
      ? false
      : motelInfor.owner === localStore.get('user')._id;
  const { images = [] } = motelInfor;
  const items = [];
  const {
    _id,
    name = '',
    totalFloor = '',
    totalRoom = '',
    price = '',
    description = '',
    address = {},
    minPrice = '',
    maxPrice = '',
  } = motelInfor;

  const homelandFloor = {
    display: 'flex',
    flexDirection: 'column',
  };

  return (
    <div className="motel-wrapper">
      <Helmet>
        <title>Motel</title>
        <meta name="description" content="Description of Motel" />
      </Helmet>
      <UncontrolledCarousel className="image-slider" items={items} />
      <div className='container'>
        <div className="content">
          <Col>
            <Col xs={12}>
              <div className='title'>
                {name}
              </div>
              {images && images.length > 0 ? (
                <div className="image-container">
                  <img
                    className="image"
                    src={images[0]}
                    alt="motel"
                  />
                </div>
              ) : (
                <div className="image-container">
                  <img
                    className="image"
                    src={defaultRoomImage}
                    alt="motel"
                  />
                </div>
              )}
            </Col>
          </Col>
          <Col className='building-container'>
            <div className='information'>
              <FormattedMessage {...messages.Information} />
            </div>
            <div className="details" style={homelandFloor}>
              <div className="detail totalFloor">
                <FormattedMessage {...messages.NumberofFloors} />{' '}
                <span className="bold">{totalFloor}</span>{' '}
                <FormattedMessage {...messages.Floor} />
              </div>
              <div className="detail totalRoom">
                <FormattedMessage {...messages.All} />{' '}
                <span className="bold">{totalRoom}</span>{' '}
                <FormattedMessage {...messages.Room} />
              </div>
            </div>
            <div className="price detail">
              <FormattedMessage {...messages.PriceFluctuates} />{' '}
              <span className="red-price">{Money(minPrice)} - {Money(maxPrice)}</span>
            </div>
            <div className="detail description">
              <FormattedMessage {...messages.description} /> {description}
            </div>
            <div className="detail address">
              <FormattedMessage {...messages.address} /> {address.address}
            </div>
            <div className='btn-container'>
              {isEdit && (
                <>
                  <div
                    className="edit-button"
                    onClick={() => {
                      history.push(`/update-motel/${_id}`);
                    }}
                  >
                    <Edit className='edit-icon' />
                    <FormattedMessage {...messages.edit} />
                  </div>
                  <div
                    className="add-button"
                    onClick={() => {
                      const data = {
                        motelRoomId: id,
                        name: `Tầng ${totalFloor + 1}`,
                        description: '',
                      };
                      setFormData(data);
                      props.changeStoreData('showWarningPopup', true);
                    }}
                  >
                    <Add className='add-icon' />
                    <FormattedMessage {...messages.add} />
                  </div>
                </>
              )}
              <button
                className="btn-detail"
                onClick={() => {
                  history.push(`/motel-detail-v2/${_id}`);
                }}
              >
                <FormattedMessage {...messages.Detail} />
              </button>
            </div>
          </Col>
        </div>
      </div>
      <SuccessPopup
        visible={showSuccessPopup}
        content={<FormattedMessage {...messages.AddedFloorSuccessfully} />}
        toggle={() => {
          props.changeStoreData('showSuccessPopup', !showSuccessPopup);
        }}
      />
      <WarningPopup
        visible={showWarningPopup}
        content={<FormattedMessage {...messages.addFloor} />}
        callBack={() => props.postFloor(id, formData)}
        toggle={() => {
          props.changeStoreData('showWarningPopup', false);
        }}
      />
    </div>
  );
}

Motel.propTypes = {
  dispatch: PropTypes.func,
  getMotelInfor: PropTypes.func,
  postFloor: PropTypes.func,
  changeStoreData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  motel: makeSelectMotel(),
});

function mapDispatchToProps(dispatch) {
  return {
    getMotelInfor: id => {
      dispatch(getMotelInfor(id));
    },
    postFloor: (id, formData) => {
      dispatch(postFloor(id, formData));
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

export default compose(withConnect)(Motel);
