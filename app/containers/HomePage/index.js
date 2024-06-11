/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import GoogleMaps from '../../components/GoogleMaps';

export default function HomePage() {
  return (
    <div>
      <h1>
        {/* <FormattedMessage {...messages.header} /> */}
        {/* <GoogleMaps
          isMarkerShown
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCIksTv7qGEGtgkWZG6BMeYJj6ot6Br1Ws&libraries=drawing,places"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        /> */}
      </h1>
      <GoogleMaps
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCVwwlv1Q3FKlJUZTV-ab5hknaivIDv87o&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}
