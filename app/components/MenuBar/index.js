/**
 *
 * MenuBar
 *
 */

import React from 'react';
import './style.scss';

function MenuBar({ setActiveTab, activeTab }) {
  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div className="menu-bar-wrapper">
      <div
        className="menu-item-wrapper"
        onClick={() => {
          toggle('1');
        }}
      >
        <div className="menu-item food">
          <div className="text">Đồ ăn</div>
        </div>
      </div>
      <div
        className="menu-item-wrapper"
        onClick={() => {
          toggle('2');
        }}
      >
        <div className="menu-item drink">
          <div className="text">Thức uống</div>
        </div>
      </div>
    </div>
  );
}

MenuBar.propTypes = {};

export default MenuBar;
