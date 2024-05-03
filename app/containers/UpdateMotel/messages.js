/*
 * NotFoundPage Messages
 *
 * This contains all the text for the NotFoundPage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'UpdateMotel.containers';
export const scopeCreateModel = 'CreateMotel.containers';

export default defineMessages({
  errorwifiPrice: {
    id: `${scopeCreateModel}.errorwifiPrice`,
    defaultMessage: 'Vui lòng nhập giá xe',
  },
  errorgarbagePrice: {
    id: `${scopeCreateModel}.errorgarbagePrice`,
    defaultMessage: 'Vui lòng nhập phí Dịch Vụ',
  },
  wifiPrice: {
    id: `${scopeCreateModel}.wifiPrice`,
    defaultMessage: 'Giá xe',
  },
  garbagePrice: {
    id: `${scopeCreateModel}.garbagePrice`,
    defaultMessage: 'Phí Dịch Vụ',
  },

  errorName: {
    id: `${scope}.errorName`,
    defaultMessage: 'Vui lòng nhập tên nhà trọ',
  },
  errorAddress: {
    id: `${scope}.errorAddress`,
    defaultMessage: 'Vui lòng nhập địa chỉ',
  },
  errorMinPrice: {
    id: `${scope}.errorMinPrice`,
    defaultMessage: 'Vui lòng nhập giá thấp nhất',
  },
  errorMaxPrice: {
    id: `${scope}.errorMaxPrice`,
    defaultMessage: 'Vui lòng nhập giá cao nhất',
  },
  errorRoomAcreage: {
    id: `${scope}.errorRoomAcreage`,
    defaultMessage: 'Vui lòng nhập diện tích',
  },
  errorContactPhone: {
    id: `${scope}.errorContactPhone`,
    defaultMessage: 'Vui lòng nhập số điện thoại liên hệ',
  },
  errorDescription: {
    id: `${scope}.errorDescription`,
    defaultMessage: 'Vui lòng nhập mô tả',
  },
  errorMotelName: {
    id: `${scope}.errorMotelName`,
    defaultMessage: 'Vui lòng tên nhà trọ',
  },
  erroreLectricityPrice: {
    id: `${scope}.erroreLectricityPrice`,
    defaultMessage: 'Vui lòng nhập giá điện',
  },
  errorWaterPrice: {
    id: `${scope}.errorWaterPrice`,
    defaultMessage: 'Vui lòng nhập giá nước',
  },
  electricityPrice: {
    id: `${scope}.electricityPrice`,
    defaultMessage: 'Giá điện',
  },
  waterPrice: {
    id: `${scope}.waterPrice`,
    defaultMessage: 'Giá nước',
  },
  minPrice: {
    id: `${scope}.minPrice`,
    defaultMessage: 'Giá thấp nhất',
  },
  maxPrice: {
    id: `${scope}.maxPrice`,
    defaultMessage: 'Giá cao nhất',
  },
  enterDescription: {
    id: `${scope}.enterDescription`,
    defaultMessage: 'Nhập mô tả',
  },
  enterMotelName: {
    id: `${scope}.enterMotelName`,
    defaultMessage: 'Nhập tên nhà trọ',
  },
  EnterNumberPhone: {
    id: `${scope}.EnterNumberPhone`,
    defaultMessage: 'Nhập số điện thoại',
  },
  Address: {
    id: `${scope}.Address`,
    defaultMessage: 'Địa chỉ',
  },
  Update: {
    id: `${scope}.Update`,
    defaultMessage: 'Cập Nhật',
  },
  SizeImage: {
    id: `${scope}.SizeImage`,
    defaultMessage: 'Kích thước phải dưới 2mb',
  },
});
