/**
 *
 * InputRoom
 *
 */

import React from 'react';
import { Row, Col } from 'reactstrap';
import InputForm from '../InputForm';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function InputRoom({ onChangeRoom, key }) {
  return (
    <Row>
      <Col xs={3}>
        <InputForm
          key={key}
          label="Tầng"
          type="number"
          onChange={e => {
            onChangeRoom(key);
          }}
        />
      </Col>
      <Col xs={3}>
        <InputForm
          key={key}
          label="Phòng"
          type="number"
          onChange={onChangeRoom}
        />
      </Col>
      <Col xs={6}>
        <DatePicker
          dateFormat="dd/MM/yyyy"
          selected={startDate}
          onChange={date => {}}
          customInput={<InputForm label="Trống từ" />}
        />
      </Col>
    </Row>
  );
}

InputRoom.propTypes = {};

export default InputRoom;
