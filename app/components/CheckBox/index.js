/**
 *
 * CheckBox
 *
 */

import React from 'react';
import { Input, FormGroup, Label } from 'reactstrap';
import ClassNames from 'classnames';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function CheckBox(props) {
  return (
    <div className={ClassNames('check-box-wrapper', props.className)}>
      <FormGroup check>
        <Label check>
          <Input
            name={props.name}
            type="checkbox"
            onChange={props.onChange}
            checked={props.checked}
          />
          {props.label}
        </Label>
      </FormGroup>
    </div>
  );
}

CheckBox.propTypes = {};

export default CheckBox;
