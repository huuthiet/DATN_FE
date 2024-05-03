/*
 *
 * MapsPage reducer
 *
 */
import produce from 'immer';
import { GET_LIST_ROOM_FAIL, GET_LIST_ROOM_SUCCESS } from './constants';

export const initialState = {
  listRoom: [],
  action1: 0,
};

/* eslint-disable default-case, no-param-reassign */
const mapsPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_LIST_ROOM_SUCCESS:
        draft.listRoom = action.response;
        draft.action1 = 1;
        break;
      case GET_LIST_ROOM_FAIL:
        draft.listRoom = action.error;
        break;
    }
  });

export default mapsPageReducer;
