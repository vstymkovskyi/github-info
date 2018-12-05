/*
 * *
 *  * Created by vstymkovskyi on 11/23/18 2:48 PM.
 *
 */

import React, {Component} from 'react';
import {Navbar, Nav, NavItem, NavLink} from 'reactstrap';
import { connect } from 'react-redux';

const navigationLinks = () => {
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
      link: '/user',
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
    const { loggedIn } = this.props;
    const navItemsArray = navigationLinks();

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
  loggedIn: state.authentication.loggedIn
});

export default connect(mapStateToProps)(Navigation);