/*
 *
 * RoomBill reducer
 *
 */
import produce from 'immer';
import moment from 'moment';
import {
  GET_LIST_ROOM_FAIL_USER,
  GET_LIST_ROOM_SUCCESS_USER,
  POST_EXPORT_BILL_USER_SUCCESS,
  POST_EXPORT_BILL_USER_FAIL,
} from './constants';
export const initialState = {
  listMotelRoom: [],
  billData: {},
  errorFile: '',
  fileSuccess: {},
};
const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min;
const getRandomString = (length, base) => {
  let result = '';
  const baseLength = base.length;

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < length; i++) {
    const randomIndex = getRandomInt(0, baseLength);
    result += base[randomIndex];
  }

  return result;
};
const getRandomHex2 = () => {
  const baseString =
    '0123456789QƯERTYUIOPASDFGHJKLZXCVBNMqưertyuiopasdfghjklzxcvbnm';
  const ma = `${getRandomString(12, baseString)}`;
  return ma;
};

/* eslint-disable default-case, no-param-reassign */
const roomBillReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_LIST_ROOM_SUCCESS_USER:
        const dateNow = new Date();
        draft.listMotelRoom = action.response;
        console.log({ data: action.response });
        const dataJson = {
          idElectricMetter: null,
          idBill: '',
          dateBill: moment(dateNow).format('DD/MM/YYYY'),
          nameMotel: '',
          nameRoom: '',
          nameUser: '',
          phoneUser: '',
          address: '',
          imgRoom: '',
          emailOwner: '',
          totalAndTaxAll: 0,
          totalAll: 0,
          totalTaxAll: 0,
          typeTaxAll: 0,

          expenseRoom: '',
          typeRoom: 0,
          unitPriceRoom: 0,
          totalRoom: 0,
          unitPriceRoomAction: 0,

          expenseElectricity: '',
          typeElectricity: 0,
          unitPriceElectricity: 0,
          totalElectricity: 0,

          expenseWater: '',
          typeWater: 0,
          unitPriceWater: 0,
          totalWater: 0,

          expenseGarbage: '',
          typeGarbage: 0,
          unitPriceGarbage: 0,
          totalGarbage: 0,

          expenseWifi: '',
          typeWifi: 0,
          unitPriceWifi: 0,
          totalWifi: 0,

          expenseOther: '',
          typeOther: 0,
          unitPriceOther: 0,
          totalOther: 0,
        };
        for (let index = 0; index < action.response.length; index++) {
          const element = action.response[index];
          dataJson.idElectricMetter = element.room.idElectricMetter;
          dataJson.nameMotel = element.motelRoomData.name;
          dataJson.emailOwner = element.motelRoomData.emailOwner;
          dataJson.nameRoom = element.room.key + element.room.name;
          dataJson.nameUser = `${element.user.lastName} ${
            element.user.firstName
          }`;
          dataJson.phoneUser = `0${element.user.phoneNumber.number}`;
          dataJson.address = element.user.address;
          if (element.room.images) {
            if (element.room.images.length > 0) {
              dataJson.imgRoom = element.room.images[0];
            } else {
              dataJson.imgRoom = '';
            }
          } else {
            dataJson.imgRoom = '';
          }

          dataJson.expenseRoom = 'Chi Phí Phòng';
          dataJson.typeRoom = 30;
          dataJson.unitPriceRoom = element.bail;
          dataJson.totalRoom = element.bail;
          dataJson.unitPriceRoomAction = element.bail;

          dataJson.expenseElectricity = 'Chi Phí Điện';
          // dataJson.typeElectricity = 1;
          dataJson.typeElectricity = element.electricNumber ? element.electricNumber : 0;
          // dataJson.typeElectricity = element.numberOfElectric ? element.numberOfElectric : 0;
          dataJson.unitPriceElectricity = element.room.electricityPrice;
          dataJson.totalElectricity =
            element.room.electricityPrice * dataJson.typeElectricity;
          dataJson.dayStart = element.dayStart;
          dataJson.dayEnd = element.dayEnd;
          dataJson.kWhData = element.kWhData;
          dataJson.labelTime = element.labelTime;

          dataJson.expenseWater = 'Chi Phí Nước';
          dataJson.typeWater = element.room.person ? element.room.person : 0;
          dataJson.unitPriceWater = element.room.waterPrice;
          dataJson.totalWater = element.room.waterPrice * dataJson.typeWater;

          dataJson.expenseGarbage = 'Phí Dịch Vụ';
          dataJson.typeGarbage = 1;
          dataJson.unitPriceGarbage = element.room.garbagePrice;
          dataJson.totalGarbage = element.room.garbagePrice;

          dataJson.expenseWifi = 'Chi Phí Xe';
          dataJson.typeWifi = element.room.vihicle ? element.room.vihicle : 0;
          dataJson.unitPriceWifi = element.room.wifiPrice;
          dataJson.totalWifi = element.room.wifiPrice;

          dataJson.expenseOther = 'Tiện Ích Khác';
          dataJson.typeOther = 0;
          dataJson.unitPriceOther = 1;
          dataJson.totalOther = dataJson.typeOther * dataJson.unitPriceOther;

          dataJson.totalAndTaxAll =
            dataJson.totalOther +
            dataJson.totalWifi +
            dataJson.totalGarbage +
            dataJson.totalWater +
            dataJson.totalElectricity +
            dataJson.unitPriceRoomAction;
          dataJson.totalTaxAll = dataJson.typeTaxAll * dataJson.totalAndTaxAll;
          dataJson.totalAll = dataJson.totalAndTaxAll + dataJson.totalTaxAll;
          draft.billData = dataJson;
          break;
        }
        break;
      case GET_LIST_ROOM_FAIL_USER:
        draft.listMotelRoom = action.error;
        break;
      case 'UPDATE_TOTAL_ELECTRICITY':
        const _billData = draft.billData;
        const typeElectricity = action.response;
        const totalElectricity =
          typeElectricity * _billData.unitPriceElectricity;
        const totalAndTaxAll =
          _billData.totalOther +
          _billData.totalWifi +
          _billData.totalGarbage +
          _billData.totalWater +
          totalElectricity +
          _billData.unitPriceRoomAction;
        const totalTaxAll = _billData.typeTaxAll * totalAndTaxAll;
        const totalAll = totalAndTaxAll + totalTaxAll;
        draft.billData.typeElectricity = typeElectricity;
        draft.billData.totalElectricity = totalElectricity;
        draft.billData.totalAndTaxAll = totalAndTaxAll;
        draft.billData.totalTaxAll = totalTaxAll;
        draft.billData.totalAll = totalAll;
        break;
      case POST_EXPORT_BILL_USER_SUCCESS:
        draft.fileSuccess = action.response;
        break;
      case POST_EXPORT_BILL_USER_FAIL:
        draft.errorFile = action.error;
        break;
    }
  });

export default roomBillReducer;
