/*
 * *
 *  * Created by vstymkovskyi on 12/5/18 3:06 PM.
 *
 */

import React, {Component} from 'react';
import { connect } from 'react-redux';

import {userActions} from "../../actions/user.actions";
import {Redirect} from "react-router-dom";

class Logout extends Component {
  render() {
    this.props.dispatch(userActions.logout());

    return <Redirect to={{ pathname: '/' }} />;
  }
}

export default connect(null)(Logout);