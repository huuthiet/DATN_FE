/**
 *
 * Asynchronously loads the component for AlertDialog
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
