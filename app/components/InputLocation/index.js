/**
 *
 * InputLocation
 *
 */

import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import Autocomplete from 'react-google-autocomplete';
import ClassNames from 'classnames';
import './style.scss';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function InputLocation(props) {
  const { onChange = place => {}, onSelect = address => {} } = props;
  return (
    <div className={ClassNames('input-location-wrapper', props.className)}>
      <FormGroup>
        {props.label && (
          <Label for={props.name} className="label-input">
            {props.label}:
          </Label>
        )}
        <div
          className={ClassNames(
            'input-form',
            { 'add-icon': props.icon },
            { 'no-edit': props.edit },
          )}
        >
          {props.icon && (
            <div className="icon-append">
              <i className={props.icon} />
            </div>
          )}
          <Autocomplete
            className="form-control"
            placeholder={
              _.isEmpty(props.placeholder)
                ? 'Enter a location'
                : props.placeholder
            }
            onPlaceSelected={place => {
              onSelect(place);
            }}
            name={props.name}
            id={props.name}
            value={props.value}
            types={['address']}
            componentRestrictions={{ country: 'vn' }}
            onBlur={props.onBlur}
            onChange={props.onChange}
          />
        </div>
        {props.error && props.touched && (
          <span className="error">
            <i className="fa fa-exclamation-triangle" /> {props.error}
          </span>
        )}
      </FormGroup>
    </div>
  );
}

InputLocation.propTypes = {};

export default InputLocation;
