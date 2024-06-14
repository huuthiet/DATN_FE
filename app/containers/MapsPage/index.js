/**
 *
 * MapsPage
 *
 */

import { Avatar } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useEffect, useState, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import GoogleMaps from '../../components/GoogleMaps';
import { SearchLocationContext } from "../../components/SearchLocationContext";
import { urlLink } from '../../helper/route';
import Money from '../App/format';
import { changeStoreData, getListRoom } from './actions';
import reducer from './reducer';
import saga from './saga';
import makeSelectMapsPage from './selectors';
import './style.scss';
import makeSelectProfile from '../Profile/selectors';
import { getProfile } from '../Profile/actions';
import { LocationOn, Phone } from '@material-ui/icons';
import GooglePlacesAutocomplete from 'react-google-autocomplete';

// import profileReducer from '../Profile/reducer';
// import profileSaga from '../Profile/saga';

export function MapsPage(props) {
  const history = useHistory();
  useInjectReducer({ key: 'mapsPage', reducer });
  useInjectSaga({ key: 'mapsPage', saga });

  const [ currentPosition, setCurrentPosition ] = useState({ lat: 10.856866, lng: 106.763324 })


  const { inputValue = "ho chi minh" } = props;

  const handlePlaceSelect = async (place) => {
    try {
      if(place === '') {
        place = 'Linh Trung, Thủ Đức'
      }
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${place}&key=AIzaSyCVwwlv1Q3FKlJUZTV-ab5hknaivIDv87o`
      );
      const data = await response.json();
      const { lat, lng } = data.results[0].geometry.location;
      setCurrentPosition({lat: lat, lng: lng});
      console.log("VỊ TRÍIIII", data);
      // setCoordinates({ lat, lng });
    } catch (error) {
      console.error('Error fetching coordinates:', error);
      setCurrentPosition({ lat: 10.856866, lng: 106.763324 });
    }
  };

  useEffect(() => {
    handlePlaceSelect(inputValue);
  }, [inputValue]);

  useEffect(() => {
    props.getListRoom();
    props.getProfile();
  }, []);

  const [windowHeight, setWindowHeight] = useState(0);
  const resizeWindow = () => {
    if (window.innerWidth < 576) {
      setWindowHeight(window.innerHeight * 0.01 - 57 * 0.01);
    } else {
      setWindowHeight(window.innerHeight * 0.01 - 100 * 0.01);
    }
  };
  useEffect(() => {
    resizeWindow();
    window.addEventListener('resize', resizeWindow);
    // loadImage();
    return () => window.removeEventListener('resize', resizeWindow);
  }, []);
  document.documentElement.style.setProperty('--vh', `${windowHeight}px`);
  const { listRoom = [], action1 } = props.mapsPage;
  

  const [room, setRoom] = useState({});

  // get img upload
  const [imageIds, setImageIds] = useState([]);

  const loadImage = async () => {
    const requestUrl = urlLink.api.serverUrl + urlLink.api.getuploadimg;
    try {
      const res = await fetch(requestUrl);
      const dataImg = await res.json();
      setImageIds(dataImg.data);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="maps-page-wrapper">
      <Helmet>
        <title>MapsPage</title>
        <meta name="description" content="Description of MapsPage" />
      </Helmet>
      <GoogleMaps
        listRoom={listRoom}
        setRoom={setRoom}
        // googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCIksTv7qGEGtgkWZG6BMeYJj6ot6Br1Ws&v=3.exp&libraries=geometry,drawing,places"
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCVwwlv1Q3FKlJUZTV-ab5hknaivIDv87o&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: '100%' }} />}
        containerElement={<div style={{ height: '100%' }} />}
        mapElement={<div style={{ height: '100%' }} />}
        position={currentPosition}
      />
      <div className="status-wrapper container">
        <div className="status">
          <div className="green-box" />
          Còn phòng
        </div>
        <div className="status">
          <div className="red-box" />
          Đã thuê
        </div>
        <div className="status">
          <div className="orange-box" />
          Sắp trống
        </div>
      </div>
      {Object.keys(room).length !== 0 && (
        <div className="detail-wrapper">
          <div className="container">
            <div className="row">
              <div className="col-12 full-image">
                {room.images ? (
                  <div className="col-12 image-container">
                    <div className="col-2 image">
                      {/* <img
                        alt="Avatar"
                        src={room.images}
                      >
                        N
                      </img> */}
                      <img className="image" src={room.images} alt="motel" />
                    </div>
                    <div className="col-8 card-content">
                      <div className="card-info">
                        <div className="title">{room.name}</div>
                        <div className="address">
                          <LocationOn className="address-icon" />
                          {room.address.address}
                        </div>
                        <div className="price">{Money(room.minPrice || 0)} - {Money(room.maxPrice || 0)} đ</div>
                        <div className="phone">
                          <Phone className="phone-icon" />
                          {room.contactPhone}
                        </div>
                      </div>
                      <div className="button-container">
                        <button
                          className="cancel-button"
                          onClick={() => {
                            setRoom({});
                          }}
                        >
                          Hủy
                        </button>
                        <button
                          className="detail-button"
                          onClick={() => {
                            /* eslint no-underscore-dangle: 0 */
                            history.push(`/motel/${room._id}`);
                          }}
                        >
                          Xem chi tiết
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="image-container">
                    <div className="col-4 image">
                      <img
                        alt="Avatar"
                        src="./defaul-room.jpg"
                      />
                    </div>
                    <div className="col-8 card-content">
                      <div className="card-info">
                        <div className="title">{room.name}</div>
                        <div className="address">
                          <LocationOn className="address-icon" />
                          {room.address.address}
                        </div>
                        <div className="price">{Money(room.minPrice || 0)} - {Money(room.maxPrice || 0)} đ</div>
                        <div className="phone">
                          <Phone className="phone-icon" />
                          {room.contactPhone}
                        </div>
                      </div>
                      <div className="button-container">
                        <button
                          className="cancel-button"
                          onClick={() => {
                            setRoom({});
                          }}
                        >
                          Hủy
                        </button>
                        <button
                          className="detail-button"
                          onClick={() => {
                            /* eslint no-underscore-dangle: 0 */
                            history.push(`/motel/${room._id}`);
                          }}
                        >
                          Xem chi tiết
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

MapsPage.propTypes = {
  getListRoom: PropTypes.func,
  mapsPage: PropTypes.object,
  changeStoreData: PropTypes.func,
  getProfile: PropTypes.func,
  profile: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  mapsPage: makeSelectMapsPage(),
  profile: makeSelectProfile(),
});

function mapDispatchToProps(dispatch) {
  return {
    getListRoom: () => {
      dispatch(getListRoom());
    },
    getProfile: () => {
      dispatch(getProfile());
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

export default compose(withConnect)(MapsPage);
