/**
 *
 * WalletTerm
 *
 */

import React, { memo } from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

function WalletTerm() {
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>
        <strong>
          <FormattedMessage {...messages.Text} /> HOMESLANDS
        </strong>
      </h1>
      <p>
        <strong>
          I. <FormattedMessage {...messages.Text} />
          HOMESLANDS
        </strong>
      </p>
      <p>
        <strong><FormattedMessage {...messages.Text1_1} /> </strong>
      </p>
      <p>
        <FormattedMessage {...messages.Text1_2} />
        <a href="https://homeslands.net/">https://homeslands.net/</a>
        <FormattedMessage {...messages.Text1_3} />
      </p>
      <p>
        <strong><FormattedMessage {...messages.Text1_2_1} /> </strong>
      </p>
      <p>
        <FormattedMessage {...messages.Text1_2_2} />
        <a href="https://homeslands.net/">https://homeslands.net/</a>
        <FormattedMessage {...messages.Text1_2_3} />
      </p>
      <p>
        <strong><FormattedMessage {...messages.Text1_3_1} /></strong>
      </p>
      <p>
        <FormattedMessage {...messages.Text1_3_2} />{' '}
        <a href="https://homeslands.net/">https://homeslands.net/</a>
      </p>
      <p>
        <strong>
          <FormattedMessage {...messages.Text2} />
        </strong>
        <br /> <strong><FormattedMessage {...messages.Text2_1} /> </strong>
      </p>
      <p>
        <FormattedMessage {...messages.Text2_2} />
        <a href="https://homeslands.net/">https://homeslands.net/</a>,
        <FormattedMessage {...messages.Text2_5} />&nbsp;<strong><FormattedMessage {...messages.Text2_4} /></strong>&nbsp;
        <FormattedMessage {...messages.Text2_3} />{' '}
        <a href="https://homeslands.net/">https://homeslands.net/</a>.
      </p>
      <p>
        <FormattedMessage {...messages.Text2_6} />
      </p>
      <p>
        - <FormattedMessage {...messages.Text2_7} />
        <br /> - <FormattedMessage {...messages.Text2_8} />
        <br /> - <FormattedMessage {...messages.Text2_9} />
        <br /> - <FormattedMessage {...messages.Text2_10} />
      </p>
      <p>
        <strong><FormattedMessage {...messages.Text2_11} /></strong>
      </p>
      <p>
        <FormattedMessage {...messages.Text2_12} />{' '}
        <a href="https://homeslands.net/">https://homeslands.net/</a>.
      </p>
      <p>
        <strong><FormattedMessage {...messages.Text2_13} /></strong>
      </p>
      <p>
        <FormattedMessage {...messages.Text2_14} />
      </p>
      <p>
        <br /> <FormattedMessage {...messages.Text2_15} />
        <br /> <strong><FormattedMessage {...messages.Text2_16} /></strong><strong>HOMESLANDS</strong>
        <br /> <FormattedMessage {...messages.Text2_17} />
        <br /> <FormattedMessage {...messages.Text2_18} /> 0888022200
      </p>
    </div>
  );
}

WalletTerm.propTypes = {};

export default memo(WalletTerm);
