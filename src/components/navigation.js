/*
 * *
 *  * Created by vstymkovskyi on 11/23/18 2:48 PM.
 *
 */

import React, {Component} from 'react';
import {Navbar, Nav, NavItem, NavLink} from 'reactstrap';

class Navigation extends Component {
  render() {
    return (
        <div>
          <Navbar color={"light"} light expand="md">
            <Nav navbar>
              <NavItem>
                <NavLink href="/">Home</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/posts">Posts</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/search">Search</NavLink>
              </NavItem>
            </Nav>
          </Navbar>
        </div>
    );
  }
}

export default Navigation;