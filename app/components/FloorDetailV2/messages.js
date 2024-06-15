/*
 * NotFoundPage Messages
 *
 * This contains all the text for the NotFoundPage container.
 */
import { add } from 'lodash';
import { defineMessages } from 'react-intl';

export const scope = 'FloorDetail.containers';

export default defineMessages({
    All: {
        id: `${scope}.All`,
        defaultMessage: 'Tất cả',
    },
    addRoom: {
        id: `${scope}.addRoom`,
        defaultMessage: 'Thêm phòng',
    },
    Floor: {
        id: `${scope}.Floor`,
        defaultMessage: 'Tầng',
    },

});