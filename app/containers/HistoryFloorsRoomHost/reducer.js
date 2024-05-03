/*
 *
 * HistoryFloorsRoomHost reducer
 *
 */
import produce from 'immer';
import { GET_MOTEL_ROOM_SUCCESS } from './constants';
export const initialState = {
  MotelRoom: [],
  MotelRoomNone: [],
  error: [],
};
const typeStatusRoom = e => {
  if (e === 'rented' || e === 'deposited') {
    return 'Đã Thuê';
  }
  return 'Chưa Thuê';
};

const actionStatusRoom = e => {
  if (e === 'rented' || e === 'deposited') {
    return 'action';
  }
  return '';
};

/* eslint-disable default-case, no-param-reassign */
const historyFloorsRoomHostReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_MOTEL_ROOM_SUCCESS:
        // eslint-disable-next-line no-case-declarations
        const listRoom = [];
        // eslint-disable-next-line no-case-declarations
        const data = action.response.floors;
        const motelRoomId = action.response._id;
        // eslint-disable-next-line no-case-declarations
        let i = 1;
        // eslint-disable-next-line no-plusplus
        for (let index = 0; index < data.length; index++) {
          const element = data[index].rooms;
          // eslint-disable-next-line no-plusplus
          for (let indexR = 0; indexR < element.length; indexR++) {
            const elementR = element[indexR];
            // eslint-disable-next-line no-plusplus

            elementR.motelRoomId = motelRoomId;
            elementR.stt = i++;
            elementR.roomName = elementR.key;
            elementR.action = actionStatusRoom(elementR.status);
            elementR.status = typeStatusRoom(elementR.status);

            if (elementR.images.length > 1) {
              // eslint-disable-next-line prefer-destructuring
              elementR.image1 = elementR.images[0];
              // eslint-disable-next-line prefer-destructuring
              elementR.image2 = elementR.images[1];
            } else {
              // eslint-disable-next-line prefer-destructuring
              elementR.image1 = elementR.images[0];
            }

            listRoom.push(elementR);
          }
        }
        draft.MotelRoom = listRoom;
        break;
    }
  });

export default historyFloorsRoomHostReducer;
