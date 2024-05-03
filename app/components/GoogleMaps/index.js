/**
 *
 * GoogleMaps
 *
 */

import React from 'react';
import { compose } from 'recompose';
import './style.scss';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
import MarkerPrice from '../MarkerPrice';

const onClick = map => {
  const { latLng } = map;
  const lat = latLng.lat();
  const lng = latLng.lng();
};

const GoogleMaps = compose(
  withScriptjs,
  withGoogleMap,
)(props => {
  const { listRoom = [], setRoom = () => {} } = props;
  return (
    <GoogleMap
      defaultZoom={14}
      defaultCenter={{ lat: 10.856866, lng: 106.763324 }}
      onClick={onClick}
    >
      {listRoom.map((item, key) => (
        <MarkerPrice setRoom={setRoom} item={item} key={key} />
      ))}
    </GoogleMap>
  );
});

GoogleMaps.propTypes = {};
export default GoogleMaps;
