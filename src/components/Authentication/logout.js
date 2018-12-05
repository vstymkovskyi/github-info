/*
 * *
 *  * Created by vstymkovskyi on 12/5/18 3:06 PM.
 *
 */

import React, {Component} from 'react';
import { connect } from 'react-redux';

import {Redirect} from "react-router-dom";
import {userActions} from "../../actions/user.actions";

class Logout extends Component {
  render() {
    this.props.dispatch(userActions.logout());
    return <Redirect to={{ pathname: '/' }} />;
  }
}

export default connect(null)(Logout);