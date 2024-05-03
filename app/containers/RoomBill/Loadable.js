/**
 *
 * Asynchronously loads the component for RoomBill
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
