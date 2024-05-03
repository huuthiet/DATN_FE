/**
 *
 * Asynchronously loads the component for JobDetail
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
