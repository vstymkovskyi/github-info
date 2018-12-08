/*
 * *
 *  * Created by vstymkovskyi on 11/23/18 3:11 PM.
 *
 */

import React  from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import Navigation from "../components/Navigation";
import HomePge from '../components/HomePage'
import SearchPage from '../components/Search/SearchPage'
import PostsPage from '../components/Posts';
import SearchUserPage from '../components/SearchUser/searchUserPage';
import UserPage from '../components/User/userPage';
import LoginPage from '../components/Authentication/loginPage';
import Logout from '../components/Authentication/logout';
import RegistrationPage from '../components/Authentication/registrationPage';
import AdminPage from '../components/Admin/AdminPage';

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
    private: true,
    redirect: '/login',
    component: SearchPage
  },
  {
    path: "/search-user/:userName",
    component: SearchUserPage
  },
  {
    path: "/user",
    exact: true,
    private: true,
    redirect: '/login',
    component: UserPage
  },
  {
    path: "/user/:id",
    private: true,
    redirect: '/login',
    component: UserPage
  },
  {
    path: "/admin",
    private: true,
    redirect: '/login',
    component: AdminPage
  },
  {
    path: "/login",
    component: LoginPage
  },
  {
    path: "/logout",
    private: true,
    redirect: '/login',
    component: Logout
  },
  {
    path: "/register",
    component: RegistrationPage
  }
];

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('currentUser')
            ? <Component {...props} />
            : <Redirect to={{ pathname: rest.redirect, state: { from: props.location } }} />
    )} />
);

// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
function RouteWithSubRoutes(route) {
  if(route.private) {
    return (
        <PrivateRoute
            {...route}
        />
    )
  } else {
    return (
        <Route
            {...route}
        />
    );
  }
}

function RouteConfig() {
  return (
      <Router>
        <div>
          <Navigation />
          {routes.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route} />
          ))}
        </div>
      </Router>
  );
}

export default RouteConfig;
