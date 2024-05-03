/**
 *
 * TopBar
 *
 */

import React from 'react';
import './style.scss';
import { Nav, NavItem, NavLink } from 'reactstrap';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function TopBar() {
  return (
    <section className="top-bar-wrapper">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6">
            <div className="contact-info">
              <Nav pills>
                <NavItem>
                  <NavLink href="tel:0909 123 144">
                    <i className="fa fa-phone" />
                    0909 123 144
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="mailto:phamquangthien.it@gmail.com">
                    <i className="fa fa-envelope" />
                    phamquangthien.it@gmail.com
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="social-contact">
              <div className="social-icons">
                <Nav pills>
                  <NavItem>
                    <NavLink href="#">
                      <i className="fa fa-facebook" />
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="#">
                      <i className="fa fa-twitter" />
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="#">
                      <i className="fa fa-linkedin" />
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="#">
                      <i className="fa fa-dribbble" />
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="#">
                      <i className="fa fa-google-plus" />
                    </NavLink>
                  </NavItem>
                </Nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

TopBar.propTypes = {};

export default TopBar;
