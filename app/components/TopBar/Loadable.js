/**
 *
 * Asynchronously loads the component for TopBar
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
