/*
 * *
 *  * Created by vstymkovskyi on 11/23/18 3:11 PM.
 *
 */

import React  from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePge from '../components/HomePage'
import SearchPage from '../components/Search/SearchPage'
import PostsPage from '../components/Posts';
import SearchUserPage from '../components/SearchUser/searchUserPage';
import UserPage from '../components/User/userPage';
import LoginPage from '../components/Authentication/loginPage';
import {logout} from '../components/Authentication/loginPage';
import RegistrationPage from '../components/Authentication/registrationPage';

const routes = [
  {
    path: "/",
    component: HomePge,
    exact: true
  },
  {
    path: "/posts",
    component: PostsPage
  },
  {
    path: "/search",
    component: SearchPage
  },
  {
    path: "/search-user/:userName",
    component: SearchUserPage
  },
  {
    path: "/user/:id",
    component: UserPage
  },
  {
    path: "/login",
    component: LoginPage
  },
  {
    path: "/logout",
    // component: LoginPage,
    render: logout
  },
  {
    path: "/register",
    component: RegistrationPage
  }
];


// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
function RouteWithSubRoutes(route) {

  return (
      <Route
          {...route}
      />
  );
}

function RouteConfig() {
  return (
      <Router>
        <div>
          {routes.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route} />
          ))}
        </div>
      </Router>
  );
}

export default RouteConfig;
