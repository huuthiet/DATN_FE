/**
 *
 * MarkerPrice
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { OverlayView } from 'react-google-maps';
import localStore from 'local-storage';
import Money from '../../containers/App/format';

function MarkerPrice(props) {
  console.log("TIEMMMMMMM",)
  const { item, setRoom } = props;
  // console.log('item', item);
  let address = {};
  if (item && item.address && item.address.geometry && item.address.geometry.location) {
    address = {
      lat: item.address.geometry.location.lat,
      lng: item.address.geometry.location.lng,
    };
  } else {
    return null;
  }

  const listReview = JSON.parse(localStorage.getItem('listReview'));
  const [backgroundColor, setBackgroundColor] = useState('green');
  useEffect(() => {
    /* eslint no-underscore-dangle: 0 */
    if (listReview && listReview.includes(item._id)) {
      setBackgroundColor('grey');
    } else if (item.availableRoom > 0) {
      setBackgroundColor('green');
    } else if (item.depositedRoom > 0) {
      setBackgroundColor('orange');
    } else {
      setBackgroundColor('red');
    }
  }, [listReview]);
  return (
    <OverlayView
      position={address}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
    >
      <div className="marker-price-wrapper" style={{ color: backgroundColor }}>
        <div
          className="marker-price"
          style={{ backgroundColor }}
          title={item.description}
          onClick={() => {
            setRoom(item);
            if (listReview) {
              if (!listReview.includes(item)) {
                /* eslint no-underscore-dangle: 0 */
                localStore.set('listReview', [...listReview, item._id]);
              }
            } else {
              /* eslint no-underscore-dangle: 0 */
              localStore.set('listReview', [item._id]);
            }
            setBackgroundColor('grey');
          }}
          role="presentation"
        >
          {/* {Money(item.price)} */}
          {Money(item.minPrice)}
        </div>
      </div>
    </OverlayView>
  );
}

MarkerPrice.propTypes = {
  item: PropTypes.object,
  setRoom: PropTypes.func,
};

export default MarkerPrice;
