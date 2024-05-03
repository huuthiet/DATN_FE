/**
 *
 * Asynchronously loads the component for Motel
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
