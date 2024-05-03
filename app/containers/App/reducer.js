/*
 *
 * App reducer
 *
 */
import produce from 'immer';
import _ from 'lodash';
import {
  SAVE_CURRENT_USER,
  LOAD_REPOS,
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS_ERROR,
  CHANGE_APP_STORE_DATA,
  SEARCH_ADDRESSES_SUCCESS,
  SEARCH_ADDRESSES_SUCCESS_NULL,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  currentUser: {},
  showLogout: false,
  showSuccess: false,
  showAlert: false,
  content: '',
  title: '',
  alert: {
    title: '',
    content: '',
    callBack: '',
  },
  listroom: [],
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SAVE_CURRENT_USER:
        draft.currentUser = action.user;
        break;
      case LOAD_REPOS:
        draft.loading = true;
        draft.error = false;
        break;
      case LOAD_REPOS_SUCCESS:
        draft.loading = false;
        break;
      case LOAD_REPOS_ERROR:
        draft.loading = false;
        draft.error = true;
        break;
      case SEARCH_ADDRESSES_SUCCESS:
        draft.listroom = action.response;
        break;
      case SEARCH_ADDRESSES_SUCCESS_NULL:
        draft.listroom = [];
        break;
      case CHANGE_APP_STORE_DATA:
        if (_.isArray(action.key)) {
          draft.state.setIn(action.key, action.value);
        } else {
          draft[action.key] = action.value;
          break;
        }
    }
  });

export default appReducer;
