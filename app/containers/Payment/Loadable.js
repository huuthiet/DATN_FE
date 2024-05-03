/**
 *
 * Asynchronously loads the component for Payment
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
