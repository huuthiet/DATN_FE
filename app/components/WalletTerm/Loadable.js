/**
 *
 * Asynchronously loads the component for WalletTerm
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
