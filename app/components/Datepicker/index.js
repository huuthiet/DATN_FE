/**
 *
 * Datepicker
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import InputForm from '../InputForm';

const InputDatepicker = props => (
  <div className="input-date-picker-wrapper">
    <InputForm {...props} readOnly />
  </div>
);

function Datepicker(props) {
  const {
    isHidden = false,
    className = '',
    selected,
    touched = false,
    error = '',
    minDate,
    maxDate,
    // ------------Time---------
    minTime,
    maxTime,
    showTimeSelectOnly = false,
    showTimeSelect = false,
    // ----------Month-----------
    showMonthDropdown = false,
    // -----------Year--------------
    showYearDropdown = false,
    scrollableYearDropdown = true,
    yearDropdownItemNumber = 15,
    dateFormat = 'MM/dd/yyyy',
    placeholderText = 'Select a date',
    popperPlacement = 'bottom-start',
    prependLabel = '',
    onSelect = e => {},
  } = props;

  const ExampleCustomInput = props => (
    <InputDatepicker {...props} {...this.props} />
  );

  return (
    <div className="date-picker-wrapper">
      <DatePicker
        prependLabel={prependLabel}
        selected={selected}
        minDate={minDate}
        maxDate={maxDate}
        minTime={minTime}
        maxTime={maxTime}
        placeholderText={placeholderText}
        // Time
        showTimeSelect={showTimeSelect}
        showTimeSelectOnly={showTimeSelectOnly}
        timeFormat="HH:mm"
        timeIntervals={30}
        timeCaption="Time"
        // Month
        showMonthDropdown={showMonthDropdown}
        dropdownMode="select"
        // Year
        showYearDropdown={showYearDropdown}
        scrollableYearDropdown={scrollableYearDropdown}
        yearDropdownItemNumber={yearDropdownItemNumber}
        //--------
        customInput={<ExampleCustomInput />}
        dateFormat={dateFormat}
        onSelect={date => {
          onSelect(date);
        }}
        onChange={date => {
          onSelect(date);
        }}
      />
    </div>
  );
}

Datepicker.propTypes = {};

export default Datepicker;
