/*
 * Terms Messages
 *
 * This contains all the text for the Terms container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Terms';

export default defineMessages({
    header: {
        id: `${scope}.header`,
        defaultMessage: 'This is the Terms container!',
    },
    InternalWalletUsagePolicy: {
        id: `${scope}.InternalWalletUsagePolicy`,
        defaultMessage: 'Chính sách sử dụng ví nội bộ',
    },
    PrivacyPolicy: {
        id: `${scope}.PrivacyPolicy`,
        defaultMessage: 'Bảo mật chính sách',
    },
    RentalTerms: {
        id: `${scope}.RentalTerms`,
        defaultMessage: 'Điều khoản cho thuê',
    },
    TermsOfAgreement: {
        id: `${scope}.TermsOfAgreement`,
        defaultMessage: 'Điều khoản thỏa thuận',
    },
    ResolveComplaints: {
        id: `${scope}.ResolveComplaints`,
        defaultMessage: 'Giải quyết khiếu nại',
    },
});