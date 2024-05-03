/*
 * NotFoundPage Messages
 *
 * This contains all the text for the NotFoundPage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'MotelDetail.containers';

export default defineMessages({
    All: {
        id: `${scope}.All`,
        defaultMessage: 'Tất cả',
    },
    Rented: {
        id: `${scope}.Rented`,
        defaultMessage: 'Đã thuê',
    },
    Available: {
        id: `${scope}.Available`,
        defaultMessage: 'Vẫn còn trống',
    },
    Deposited: {
        id: `${scope}.Deposited`,
        defaultMessage: 'Đặt cọc',
    },
    soonExpireContract: {
        id: `${scope}.soonExpireContract`,
        defaultMessage: 'Sắp hết hợp đồng',
    },
});