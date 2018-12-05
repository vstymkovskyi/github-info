/*
 * *
 *  * Created by vstymkovskyi on 11/23/18 2:48 PM.
 *
 */

import React, {Component} from 'react';
import {Navbar, Nav, NavItem, NavLink} from 'reactstrap';
import { connect } from 'react-redux';

function UserLinks(props) {
  if(props.loggedIn) {
    return (
      <NavItem>
        <NavLink href="/logout">Logout</NavLink>
      </NavItem>
    )
  } else {
    return (
      <NavItem>
        <NavLink href="/login">Sign in</NavLink>
      </NavItem>
    )
  }
}

class Navigation extends Component {
  render() {
    const { loggedIn, currentUser } = this.props;

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
              {loggedIn &&
                <NavItem>
                  <NavLink href="/search">Search</NavLink>
                </NavItem>
              }
              {loggedIn &&
                <NavItem>
                  <NavLink href={"/user/"+currentUser.id}>My profile</NavLink>
                </NavItem>
              }
              <UserLinks loggedIn={loggedIn} />
            </Nav>
          </Navbar>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.authentication.loggedIn,
  currentUser: state.authentication.currentUser,
});

export default connect(mapStateToProps)(Navigation);