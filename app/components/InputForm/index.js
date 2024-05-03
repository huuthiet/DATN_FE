/**
 *
 * InputForm
 *
 */

import React, { useState } from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import ClassNames from 'classnames';
import './style.scss';

function InputForm(props) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className={ClassNames('input-form-wrapper', props.className)}>
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
          {props.type === 'password' && props.value && props.value.length > 0 && (
            <div
              className="icon-eye"
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            >
              {!showPassword ? (
                <i className="fa fa-eye" />
              ) : (
                <i className="fa fa-eye-slash" />
              )}
            </div>
          )}
          <Input
            type={!showPassword ? props.type : 'text'}
            name={props.name}
            id={props.name}
            placeholder={props.placeholder}
            invalid={!!(props.touched && props.error)}
            min={props.min}
            max={props.max}
            onChange={props.onChange}
            onBlur={props.onBlur}
            value={props.value}
            onClick={props.onClick}
            onKeyDown={props.onKeyDown}
            disabled={props.disabled}
            readOnly={props.readOnly}
            autoComplete={props.autoComplete}
            accept={props.accept}
            multiple={props.multiple}
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

InputForm.propTypes = {};

export default InputForm;
