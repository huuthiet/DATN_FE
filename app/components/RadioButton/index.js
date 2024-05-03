/**
 *
 * RadioButton
 *
 */

import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function RadioButton(props) {
  return (
    <div className="radio-button-wrapper">
      <FormGroup check>
        <Label check>
          <Input
            type="radio"
            name={props.name}
            checked={props.checked}
            onChange={props.onChange}
            value={props.value}
            onBlur={props.onBlur}
          />{' '}
          {props.label}
        </Label>
      </FormGroup>
    </div>
  );
}

RadioButton.propTypes = {};

export default RadioButton;
