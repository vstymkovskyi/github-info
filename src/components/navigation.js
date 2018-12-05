/*
 * *
 *  * Created by vstymkovskyi on 11/23/18 2:48 PM.
 *
 */

import React, {Component} from 'react';
import {Navbar, Nav, NavItem, NavLink} from 'reactstrap';
import { connect } from 'react-redux';

const navigationLinks = (userID = null) => {
  return [
    {
      link: '/',
      name: 'Home'
    },
    {
      link: '/posts',
      name: 'Posts'
    },
    {
      link: '/search',
      name: 'Search',
      userLoggedIn: true
    },
    {
      link: '/user/'+userID,
      name: 'My profile',
      userLoggedIn: true
    },
    {
      link: '/login',
      name: 'Sign in',
      userLoggedIn: false
    },
    {
      link: '/logout',
      name: 'Logout',
      userLoggedIn: true
    }
  ]
};

function RenderLink(props) {
  const {item} = props;
  return (
      <NavItem>
        <NavLink href={item.link}>{item.name}</NavLink>
      </NavItem>
  )
}

class Navigation extends Component {
  render() {
    const { loggedIn, currentUser } = this.props;
    const navItemsArray = navigationLinks(currentUser.id);

    const navItems = navItemsArray.map((item, index) => {
      if (item.userLoggedIn !== undefined) {
        if(item.userLoggedIn && loggedIn) {
          return <RenderLink key={index} item={item} />
        } else if(!item.userLoggedIn && !loggedIn) {
          return <RenderLink key={index} item={item} />
        }
        return false;
      } else {
        return <RenderLink key={index} item={item} />
      }
    });

    return (
        <div>
          <Navbar color={"light"} light expand="md">
            <Nav navbar>
              {navItems}
            </Nav>
          </Navbar>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.authentication.loggedIn,
  currentUser: state.authentication.currentUser || {},
});

export default connect(mapStateToProps)(Navigation);