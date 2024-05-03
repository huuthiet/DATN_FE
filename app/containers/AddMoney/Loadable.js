/**
 *
 * Asynchronously loads the component for AddMoney
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
