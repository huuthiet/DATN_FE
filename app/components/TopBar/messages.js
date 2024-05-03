/*
 * TopBar Messages
 *
 * This contains all the text for the TopBar component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.TopBar';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the TopBar component!',
  },
});
