/**
 *
 * SuccessPopup
 *
 */

import React from 'react';
import './style.scss';
import { Modal, ModalBody, Button } from 'reactstrap';
import ClassNames from 'classnames';

// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function SuccessPopup(props) {
  const {
    visible = false,
    btnText = 'OK',
    title = '',
    content = '',
    className = '',
    toggle = () => {},
  } = props;
  return (
    <Modal
      className={ClassNames('success-popup-wrapper', className)}
      isOpen={visible}
      size="lg"
      centered
    >
      <ModalBody className="body-wrapper">
        <div className="title">{title}</div>
        <div className="content">{content}</div>
        <div className="btn-wrapper">
          <Button
            className="btn-block"
            color="success"
            onClick={() => {
              toggle(visible);
            }}
          >
            {btnText}
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
}

SuccessPopup.propTypes = {};

export default SuccessPopup;
