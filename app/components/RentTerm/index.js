/**
 *
 * RentTerm
 *
 */

import React, { memo } from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

function RentTerm() {
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>

        <strong>{<FormattedMessage {...messages.home} />}</strong>
      </h1>
      <h2>
        {<FormattedMessage {...messages.Text1} />}
      </h2>
      <ol>
        <li>
          {<FormattedMessage {...messages.Text1_1} />}
        </li>
        <li>
          {<FormattedMessage {...messages.Text1_2} />}
        </li>
        <li>
          {<FormattedMessage {...messages.Text1_3} />}
        </li>
        <li>
          {<FormattedMessage {...messages.Text1_4} />}
        </li>
        <li>
          {<FormattedMessage {...messages.Text1_5} />}
        </li>
        <li>
          {<FormattedMessage {...messages.Text1_6} />}
        </li>
        <li>
          {<FormattedMessage {...messages.Text1_7} />}
        </li>
        <li>
          {<FormattedMessage {...messages.Text1_8} />}
          <ul>
            <li>
              {<FormattedMessage {...messages.Text1_9} />}
            </li>
            <li>
              {<FormattedMessage {...messages.Text1_10} />}
            </li>
            <li>
              {<FormattedMessage {...messages.Text1_11} />}
            </li>
          </ul>
        </li>
      </ol>
      <p>&nbsp;</p>
      <h2> {<FormattedMessage {...messages.Text3} />}</h2>
      <ol>
        <li>
          {<FormattedMessage {...messages.Text3_1} />}
          <ul>
            <li>
              <em>
                {<FormattedMessage {...messages.Text3_1_1} />}
              </em>
            </li>
          </ul>
        </li>
      </ol>
      <p> {<FormattedMessage {...messages.Text3_1_2} />}</p>
      <ul>
        <li>
          {<FormattedMessage {...messages.Text3_2} />}
        </li>
      </ul>
      <ol start="2">
        <li>
          {<FormattedMessage {...messages.Text3_2} />}
        </li>
        <li>{<FormattedMessage {...messages.Text3_3} />}</li>
      </ol>
      <ul>
        <li>
          {<FormattedMessage {...messages.Text3_3_1} />}
        </li>
        <li>
          {<FormattedMessage {...messages.Text3_3_2} />}
        </li>
        <li>
          {<FormattedMessage {...messages.Text3_3_3} />}
        </li>
        <li>
          {<FormattedMessage {...messages.Text3_3_4} />}
        </li>
      </ul>
    </div>
  );
}

RentTerm.propTypes = {};

export default memo(RentTerm);
