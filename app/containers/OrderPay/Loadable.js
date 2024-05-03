/**
 *
 * Asynchronously loads the component for OrderPay
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
