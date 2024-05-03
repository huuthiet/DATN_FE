/**
 *
 * FloorDetail
 *
 */

import React, { useEffect, useState } from 'react';
import './style.scss';
import ClassNames from 'classnames';
import localStore from 'local-storage';
import _ from 'lodash';
import { useHistory } from 'react-router-dom';
import localStoreService from 'local-storage';
import Room from '../Room';

function FloorDetail(props) {
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
  const history = useHistory();
  // get params from url

  // Effect to update the URL when index changes
  useEffect(() => {
    // Get the current URL
    const currentURL = new URL(window.location.href);

    // Insert the key into the URL
    currentURL.searchParams.set('floor', index);

    // Update the URL without triggering a page reload
    window.history.pushState({ path: currentURL.href }, '', currentURL.href);
  }, [index]); // Run this effect whenever 'index' changes

  console.log("prop status: ", props.status);
  return (
    <div className="floor-detail-wrapper">
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
            {item.name}
          </div>
        ))}
      </div>
      <div className="room-list">
        {localStoreService.get('user') === null
          ? history.push(`/auth/login`)
          : localStoreService.get('user').role.length > 1 && (
              <div
                className={ClassNames('button-add', { hidden: !isEdit })}
                onClick={() => {
                  // console.log(floors[index]._id,

                  history.push(`/createroom/${floors[index]._id}`);
                }}
              >
                <img src="/icon_add.png" />
              </div>
            )}

        <div className="room-wrapper">
          <div className={ClassNames('room-container')}>
            {floors[index] &&
              floors[index].rooms &&
              floors[index].rooms.map((item, key) => (
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

FloorDetail.propTypes = {};

export default FloorDetail;
