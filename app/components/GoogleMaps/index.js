/**
 *
 * GoogleMaps
 *
 */

import React, { useEffect, useState } from 'react';
import { compose } from 'recompose';
import './style.scss';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
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
  const {
    position = { lat: 10.856866, lng: 106.763324 },
    listRoom = [],
    setRoom = () => {}
  } = props;

  console.log("listRoom GGG", listRoom);
  console.log("position GGG", position);


  return (
    <GoogleMap
      defaultZoom={12}
      defaultCenter={{ lat: 10.856866, lng: 106.763324 }}
      // defaultCenter={position}
      center={position}
      onClick={onClick}
    >
      <Marker position={position} />
      {listRoom.map((item, key) => (
        <MarkerPrice setRoom={setRoom} item={item} key={key} />
      ))}
    </GoogleMap>
  );
});

GoogleMaps.propTypes = {};
export default GoogleMaps;
