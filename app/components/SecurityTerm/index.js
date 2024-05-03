/**
 *
 * SecurityTerm
 *
 */

import React, { memo } from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

function SecurityTerm() {
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>
        <strong><FormattedMessage {...messages.Text} /></strong>
      </h1>
      <p>
        <strong>
          <FormattedMessage {...messages.Text1} />
        </strong>
      </p>
      <p>
        <a href="https://homeslands.net/">https://homeslands.net/</a> {' '}
        <FormattedMessage {...messages.Text1_1} />{' '}
        <a href="https://homeslands.net/">https://homeslands.net/</a>
        <FormattedMessage {...messages.Text1_2} />
        <a href="https://homeslands.net/">https://homeslands.net/</a>{' '}
        <FormattedMessage {...messages.Text1_3} />{' '}
        <a href="https://homeslands.net/">https://homeslands.net/</a>
      </p>
      <p>
        <FormattedMessage {...messages.Text1_4} />{' '}
        <a href="https://homeslands.net/">https://homeslands.net/</a>
        <FormattedMessage {...messages.Text1_5} />{' '}
      </p>
      <p>
        <strong><FormattedMessage {...messages.Text2} /></strong>
      </p>
      <p>
        <FormattedMessage {...messages.Text2_1} />
      </p>
      <p>
        <FormattedMessage {...messages.Text2_2} />
        <a href="https://homeslands.net/">https://homeslands.net/</a>
        <FormattedMessage {...messages.Text2_3} />
      </p>
      <p>
        <FormattedMessage {...messages.Text2_4} />{' '}
        <a href="https://homeslands.net/">https://homeslands.net/</a>
        <FormattedMessage {...messages.Text2_5} />
      </p>
      <p>
        <FormattedMessage {...messages.Text2_6} />
      </p>
      <p>
        <FormattedMessage {...messages.Text2_7} />
      </p>
      <p>
        <FormattedMessage {...messages.Text2_8} />{' '}
        <a href="https://homeslands.net/">https://homeslands.net/</a>.
      </p>
      <p>
        <FormattedMessage {...messages.Text2_9} />
      </p>
      <p>
        <FormattedMessage {...messages.Text2_10} />,{' '}
        <a href="https://homeslands.net/">https://homeslands.net/</a>
        <FormattedMessage {...messages.Text2_11} />
      </p>
      <p>
        <strong> <FormattedMessage {...messages.Text3} /></strong>
      </p>
      <p>
        <FormattedMessage {...messages.Text3_1} />
      </p>
      <p>
        <FormattedMessage {...messages.Text3_2} />{' '}
        <a href="https://homeslands.net/">https://homeslands.net/</a>
        <FormattedMessage {...messages.Text3_3} />{' '}
        <a href="https://homeslands.net/">https://homeslands.net/</a>.
      </p>
      <p>
        <strong><FormattedMessage {...messages.Text3_4} /> Homes Keys</strong>
      </p>
      <p><FormattedMessage {...messages.company} /></p>
      <p>
        <FormattedMessage {...messages.adrress} /> <FormattedMessage {...messages.adrressText} />
      </p>
      <p><FormattedMessage {...messages.phone} /> 0888022200</p>
      <p>
        Email:&nbsp;<a href="mailto:%20info@metek.co"> info@metek.co</a>
      </p>
      <p>
        &nbsp;
        <strong>
          <FormattedMessage {...messages.Text5} />
        </strong>
      </p>
      <p>
        <FormattedMessage {...messages.Text5_1} />{' '}
        <a href="https://homeslands.net/">https://homeslands.net/</a>.
        <FormattedMessage {...messages.Text5_2} />{' '}
        <a href="https://homeslands.net/">https://homeslands.net/</a>
        <FormattedMessage {...messages.Text5_3} />
      </p>
      <p>
        <strong>
          <FormattedMessage {...messages.Text6} />
        </strong>
      </p>
      <p>
        &nbsp;- <a href="https://homeslands.net/">https://homeslands.net/</a>{' '}
        <FormattedMessage {...messages.Text6_1} />{' '}
        <a href="https://homeslands.net/">https://homeslands.net/</a>.
      </p>
      <p>
        <FormattedMessage {...messages.Text6_2} />
      </p>
      <p>
        <FormattedMessage {...messages.Text6_3} />{' '}
        <a href="https://homeslands.net/">https://homeslands.net/</a>
        <FormattedMessage {...messages.Text6_4} />
      </p>
      <p>
        <FormattedMessage {...messages.Text6_5} />{' '}
        <a href="https://homeslands.net/">https://homeslands.net/</a>
        <FormattedMessage {...messages.Text6_6} />{' '}
        <a href="https://homeslands.net/">https://homeslands.net/</a>
        <FormattedMessage {...messages.Text6_7} />{' '}
        <a href="https://homeslands.net/">https://homeslands.net/</a>.
      </p>
      <p>
        <FormattedMessage {...messages.Text6_8} />
      </p>
      <ul>
        <li>
          <FormattedMessage {...messages.Text6_9} />{' '}
          <a href="https://homeslands.net/">https://homeslands.net/</a>;
        </li>
        <li>
          <FormattedMessage {...messages.Text6_10} />
        </li>
        <li>
          <FormattedMessage {...messages.Text6_11} />
        </li>
        <li>
          <FormattedMessage {...messages.Text6_12} />
        </li>
        <li>
          <FormattedMessage {...messages.Text6_13} />{' '}
          <a href="https://homeslands.net/">https://homeslands.net/</a>.
        </li>
      </ul>
      <p>
        <strong> <FormattedMessage {...messages.Text6_14} /></strong>
       {' '}
        <a href="https://homeslands.net/">https://homeslands.net/</a>
        <FormattedMessage {...messages.Text6_15} />
      </p>
    </div>
  );
}

SecurityTerm.propTypes = {};

export default memo(SecurityTerm);
