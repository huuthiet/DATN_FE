/*
 *
 * JobDetail actions
 *
 */

import {
  GET_JOB,
  GET_JOB_SUCCESS,
  GET_JOB_FAIL,
  POST_TRANSACTION,
  POST_TRANSACTION_SUCCESS,
  POST_TRANSACTION_FAIL,
  GET_DATA_SUCCESS,
  GET_DATA_FAIL,
  PUT_ACTIVE,
  PUT_ACTIVE_SUCCESS,
  PUT_ACTIVE_FAIL,
  PUT_RENEW_CONTRACT,
  PUT_RENEW_CONTRACT_SUCCESS,
  PUT_RENEW_CONTRACT_FAIL,
  PUT_CHECKOUT,
  PUT_CHECKOUT_SUCCESS,
  PUT_CHECKOUT_FAIL,
  CHANGE_STORE_DATA,
  PUT_JOB,
  PUT_JOB_SUCCESS,
  PUT_JOB_FAIL,
  PUT_DEPOSIT,
  PUT_DEPOSIT_SUCCESS,
  PUT_DEPOSIT_FAIL,
  GET_BANK_INFO,
  GET_BANK_INFO_SUCCESS,
  GET_BANK_INFO_FAIL,
} from './constants';


export function getBankInfo(id) {
  console.log("idroom in actions", id);
  return {
    type: GET_BANK_INFO,
    id,
  };
}

export function getBankInfoSuccess(response) {
  console.log("idroom in actions SUCCESS", response);
  return {
      type: GET_BANK_INFO_SUCCESS,
      response,
  };
}

export function getBankInfoFail(error) {
  console.log("idroom in actions FAIL", error);
  return {
      type: GET_BANK_INFO_FAIL,
      error,
  };
}

export function putJob(id) {
  return {
    type: PUT_JOB,
    id,
  };
}

export function putJobSuccess(response) {
  return {
    type: PUT_JOB_SUCCESS,
    response,
  };
}

export function putJobFail(error) {
  return {
    type: PUT_JOB_FAIL,
    error,
  };
}
export function postTransaction(payload) {
  return {
    type: POST_TRANSACTION,
    payload,
  };
}

export function postTransactionSuccess(response) {
  return {
    type: POST_TRANSACTION_SUCCESS,
    response,
  };
}

export function postTransactionFail(error) {
  return {
    type: POST_TRANSACTION_FAIL,
    error,
  };
}
export function getJob(id, idRoom) {
  return {
    type: GET_JOB,
    id, idRoom,
  };
}

export function getJobSuccess(response) {
  return {
    type: GET_JOB_SUCCESS,
    response,
  };
}

export function getJobFail(error) {
  return {
    type: GET_JOB_FAIL,
    error,
  };
}

export function getDataSuccess(response) {
  return {
    type: GET_DATA_SUCCESS,
    response,
  };
}

export function getDataFail(error) {
  return {
    type: GET_DATA_FAIL,
    error,
  };
}

export function putActive(id) {
  return {
    type: PUT_ACTIVE,
    id,
  };
}

export function putActiveSuccess(response) {
  return {
    type: PUT_ACTIVE_SUCCESS,
    response,
  };
}

export function putActiveFail(error) {
  return {
    type: PUT_ACTIVE_FAIL,
    error,
  };
}

export function putRenewContract(id, numberMon, idRoom) {
  return {
    type: PUT_RENEW_CONTRACT,
    id,
    numberMon,
    idRoom,
  };
}

export function putRenewContractSuccess(response) {
  return {
    type: PUT_RENEW_CONTRACT_SUCCESS,
    response,
  };
}

export function putRenewContractFail(error) {
  return {
    type: PUT_RENEW_CONTRACT_FAIL,
    error,
  };
}

export function putCheckOut(id, returnRoomDate) {
  return {
    type: PUT_CHECKOUT,
    id,
    returnRoomDate,
  };
}

export function putCheckOutSuccess(response) {
  return {
    type: PUT_CHECKOUT_SUCCESS,
    response,
  };
}

export function putCheckOutFail(error) {
  return {
    type: PUT_CHECKOUT_FAIL,
    error,
  };
}

export function changeStoreData(key, value) {
  return {
    type: CHANGE_STORE_DATA,
    key,
    value,
  };
}

export function putDeposit(payload) {
  return {
    type: PUT_DEPOSIT,
    payload,
  };
}

export function putDepositSuccess(response) {
  return {
    type: PUT_DEPOSIT_SUCCESS,
    response,
  };
}

export function putDepositFail(error) {
  return {
    type: PUT_DEPOSIT_FAIL,
    error,
  };
}
