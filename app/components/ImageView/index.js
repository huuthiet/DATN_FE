/**
 *
 * ImageView
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import './style.scss';

function ImageView(props) {
  return (
    <div className="image-view-wrapper">
      <button type="button" className="btn close" onClick={props.removeImage}>
        <span aria-hidden="true">×</span>
      </button>
      <img src={props.src} alt="image" />
    </div>
  );
}

ImageView.propTypes = {};

export default ImageView;
