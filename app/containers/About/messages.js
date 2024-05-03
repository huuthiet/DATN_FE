/*
 * About Messages
 *
 * This contains all the text for the About container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.About';

export default defineMessages({
    header: {
        id: `${scope}.header`,
        defaultMessage: 'This is the About container!',
    },
    Introduce: {
        id: `${scope}.Introduce`,
        defaultMessage: 'Giới thiệu',
    },
    company: {
        id: `${scope}.company`,
        defaultMessage: 'CÔNG TY CỔ PHẦN CÔNG NGHỆ MEKONG',
    },
    adrress: {
        id: `${scope}.adrress`,
        defaultMessage: 'Địa chỉ:',
    },
    adrressText: {
        id: `${scope}.adrressText`,
        defaultMessage: '102/4A đường 17, khu phố 3, Phường Linh Chiểu, Quận Thủ Đức, TP Hồ Chí Minh.',
    },
    phone: {
        id: `${scope}.phone`,
        defaultMessage: 'Số điện thoại:',
    },
});