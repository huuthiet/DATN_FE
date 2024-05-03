/**
 *
 * Asynchronously loads the component for MapsPage
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
