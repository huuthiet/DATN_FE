/**
 *
 * FloorDetailV2
 *
 */

import React, { useEffect, useState } from 'react';
import './style.scss';
import ClassNames from 'classnames';
import localStore from 'local-storage';
import axios from 'axios';
import _ from 'lodash';
import { useHistory } from 'react-router-dom';
import localStoreService from 'local-storage';
import Room from '../Room';
import { FormattedMessage } from 'react-intl';
import { Add } from '@material-ui/icons';
import { urlLink } from '../../helper/route';

function FloorDetailV2(props) {
  const { floors = [] } = props.motelDetail.motel;
  const currentURL = new URL(window.location.href);
  const currentIndex = currentURL.searchParams.get('floor') || 0;
  const [index, setIndex] = useState(currentIndex);
  const isEdit =
    localStore.get('user') === null
      ? false
      : props.owner === localStore.get('user')._id
        ? true
        : localStore.get('user').role.length == 1;
  let isHost = false;
  if (localStore.get('user') && localStore.get('user').role) {
    if (localStore.get('user').role.length) {
      for (let index = 0; index < localStore.get('user').role.length; index++) {
        const element = localStore.get('user').role[index];
        if (element == 'host') {
          isHost = true;
        }
      }
    }
  }
  // console.log(localStore.get('user').role.length);

  const [listRoom, setListRoom] = useState([]);
  const [idMotel, setIdMotel] = useState(props.idMotel || null);
  const [loading, setLoading] = useState(false);

  const startLoading = () => {
    setLoading(true);
  };

  const stopLoading = () => {
    setLoading(false);
  };

  const history = useHistory();

  console.log("v2222", props);
  console.log("floors", floors);
  console.log("idMotell", props.idMotel);

  const motelId = props.motelDetail.motel._id;

  // get params from url

  // Effect to update the URL when index changes
  useEffect(() => {
    console.log("GỌI LẤYYYYYYY")
    // Get the current URL
    const currentURL = new URL(window.location.href);

    // Insert the key into the URL
    currentURL.searchParams.set('floor', index);

    // Update the URL without triggering a page reload
    window.history.pushState({ path: currentURL.href }, '', currentURL.href);
    setIdMotel(props.motelDetail.motel._id);
    if (idMotel) {
      getData();
    }
  }, [index]); // Run this effect whenever 'index' changes

  const getData = async () => {
    try {
      startLoading();
      const url = urlLink.api.serverUrl + urlLink.api.motelDetailOneFloor + idMotel + '/' + index;
      const response = await axios.get(url);
      console.log("uuuuu", response);
      setListRoom(response.data.data);
      console.log({ listRoom });
      stopLoading();
    } catch (error) {
      stopLoading();
      console.log({ error });
    }
  }

  return (
    <div className="floor-detail-wrapper">
      {loading && <div className="loading-overlay" />}
      <div className="topnav">
        {floors.map((item, key) => (
          <div
            key={key}
            className={ClassNames('item', { active: index == key })}
            onClick={() => {
              if (index !== key) {
                setIndex(key);
              }
            }}
          >
            Tầng {key + 1}
          </div>
        ))}
      </div>
      <div className="room-list">
        {localStoreService.get('user') === null
          ? history.push(`/auth/login`)
          : localStoreService.get('user').role.length > 1 && (
            <button
              className={ClassNames('button-add', { hidden: !isEdit })}
              onClick={() => {
                // console.log(floors[index]._id,

                history.push(`/createroom/${floors[index]}`);
              }}
            >
              <Add className='add-icon' />
              Thêm phòng
              {/* <FormattedMessage {...messages.addRoom} /> */}
              {/* <img src="/icon_add.png" /> */}
            </button>
          )}

        <div className="room-wrapper">
          <div className={ClassNames('room-container')}>
            {/* {floors[index] &&
              floors[index].rooms &&
              floors[index].rooms.map((item, key) => (
                <Room
                  key={key}
                  isHost={isHost}
                  isEdit={isEdit}
                  item={item}
                  status={props.status}
                />
              ))} */}
            {listRoom &&
              listRoom.length > 0 &&
              listRoom.map((item, key) => (
                <Room
                  key={key}
                  isHost={isHost}
                  isEdit={isEdit}
                  item={item}
                  status={props.status}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

FloorDetailV2.propTypes = {};

export default FloorDetailV2;
