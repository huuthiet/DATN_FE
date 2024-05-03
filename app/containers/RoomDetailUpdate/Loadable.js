/**
 *
 * Asynchronously loads the component for CreateMotel
 *
 */

import loadable from 'utils/loadable';

export default loadable(() =>
    import ('./index'));