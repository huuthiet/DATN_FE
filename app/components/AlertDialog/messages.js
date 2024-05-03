/*
 * AlertDialog Messages
 *
 * This contains all the text for the AlertDialog component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.AlertDialog';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the AlertDialog component!',
  },
});
