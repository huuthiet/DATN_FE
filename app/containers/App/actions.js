/*
 *
 * App actions
 *
 */

import {
  CHANGE_APP_STORE_DATA,
  DEFAULT_ACTION,
  LOAD_REPOS,
  LOAD_REPOS_ERROR,
  LOAD_REPOS_SUCCESS,
  LOGOUT,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  SAVE_CURRENT_USER,
  SEARCH_ADDRESSES,
  SEARCH_ADDRESSES_FAIL,
  SEARCH_ADDRESSES_SUCCESS,
  SEARCH_ADDRESSES_SUCCESS_NULL,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function loadRepos() {
  return {
    type: LOAD_REPOS,
  };
}

export function reposLoaded(repos, username) {
  return {
    type: LOAD_REPOS_SUCCESS,
    repos,
    username,
  };
}

export function repoLoadingError(error) {
  return {
    type: LOAD_REPOS_ERROR,
    error,
  };
}

export function saveCurrentUser(user) {
  return {
    type: SAVE_CURRENT_USER,
    user,
  };
}

export function getLogout() {
  return {
    type: LOGOUT,
  };
}

export function getLogoutSuccess(response) {
  return {
    type: LOGOUT_SUCCESS,
    response,
  };
}

export function getLogoutFail(error) {
  return {
    type: LOGOUT_FAIL,
    error,
  };
}

export function changeAppStoreData(key, value) {
  return {
    type: CHANGE_APP_STORE_DATA,
    key,
    value,
  };
}

// search
export function Search_Addresses(value) {
  return {
    type: SEARCH_ADDRESSES,
    value,
  };
}

export function Search_AddressesSuccess(response) {
  return {
    type: SEARCH_ADDRESSES_SUCCESS,
    response,
  };
}
export function Search_AddressesSuccessNull(response) {
  return {
    type: SEARCH_ADDRESSES_SUCCESS_NULL,
    response,
  };
}

export function Search_AddressesFail(error) {
  return {
    type: SEARCH_ADDRESSES_FAIL,
    error,
  };
}
