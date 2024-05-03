/**
 *
 * ComplainTerm
 *
 */

import React, { memo } from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
function ComplainTerm() {
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>

        <strong> {<FormattedMessage {...messages.Home} />} HomesLands</strong>
      </h1>
      <p>
        <strong>
          <em>{<FormattedMessage {...messages.Text2} />}</em>
        </strong>
        <br /> -&nbsp;&nbsp; &nbsp;{<FormattedMessage {...messages.Text3} />}
        <br /> <br /> -&nbsp;&nbsp; {<FormattedMessage {...messages.Text4} />}
        <br /> <br /> -&nbsp;&nbsp; &nbsp;{<FormattedMessage {...messages.Text5} />}
        <br /> <br /> -&nbsp;&nbsp; &nbsp;{<FormattedMessage {...messages.Text6} />}
        <br /> <br /> -&nbsp;&nbsp; &nbsp;{<FormattedMessage {...messages.Text7} />}
        <br /> <br /> -&nbsp;&nbsp; &nbsp;{<FormattedMessage {...messages.Text8} />}
        <br /> <br /> -&nbsp;&nbsp; &nbsp;{<FormattedMessage {...messages.Text9} />}
        <br />{' '}
        <strong>
          <em>
            {<FormattedMessage {...messages.Text1} />}
          </em>
        </strong>
        <br /> <br /> -&nbsp;&nbsp; &nbsp;{<FormattedMessage {...messages.Text18} />}
        <br /> Hotline: 0888022200
      </p>
      <p>
        Email: info@metek.co
        <br /> <br /> -&nbsp;&nbsp; &nbsp;{<FormattedMessage {...messages.Text10} />}
        <br /> <br /> -&nbsp;&nbsp; &nbsp;{<FormattedMessage {...messages.Text11} />}
        <br /> <br /> -&nbsp;&nbsp; &nbsp;{<FormattedMessage {...messages.Text12} />}
        <br /> <br /> -&nbsp;&nbsp; &nbsp;{<FormattedMessage {...messages.Text13} />}
        <br /> <br /> -&nbsp;&nbsp; &nbsp;{<FormattedMessage {...messages.Text14} />}
        <br /> <br /> {<FormattedMessage {...messages.Text15} />}
        <br /> <br /> {<FormattedMessage {...messages.Text16} />}
        <br /> <br /> {<FormattedMessage {...messages.Text17} />}
      </p>
    </div>
  );
}

ComplainTerm.propTypes = {};

export default memo(ComplainTerm);
