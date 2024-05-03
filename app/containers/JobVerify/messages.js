/*
 * JobVerify Messages
 *
 * This contains all the text for the JobVerify container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.JobVerify';

export default defineMessages({
    header: {
        id: `${scope}.header`,
        defaultMessage: 'This is the JobVerify container!',
    },
    IdentutyVerification: {
        id: `${scope}.IdentutyVerification`,
        defaultMessage: 'Xác minh danh tính',
    },
    IdToIdentutyVerification: {
        id: `${scope}.IdToIdentutyVerification`,
        defaultMessage: 'Vui lòng cung cấp chứng minh nhân dân để xác minh danh tính',
    },
    Front: {
        id: `${scope}.Front`,
        defaultMessage: 'Mặt trước',
    },
    BackSide: {
        id: `${scope}.BackSide`,
        defaultMessage: 'Mặt sau',
    },
    ErrSizeImage: {
        id: `${scope}.ErrSizeImage`,
        defaultMessage: 'Kích thước phải dưới 2mb',
    },
    Finish: {
        id: `${scope}.Finish`,
        defaultMessage: 'Hoàn thành',
    },
});