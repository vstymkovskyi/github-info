/*
 * *
 *  * Created by vstymkovskyi on 12/5/18 3:06 PM.
 *
 */

import React, {Component} from 'react';
import { connect } from 'react-redux';

import {Redirect} from "react-router-dom";
import { firebaseAuth } from '../../components/Firebase/firebase'

import {userActions} from "../../actions/user.actions";

class Logout extends Component {
  siteLogout() {
    this.props.dispatch(userActions.logout());
  }

  firebaseLogout() {
    console.log('firebaseLogout');
    const { dispatch } = this.props;
    firebaseAuth.signOut()
      .then(() => {
        dispatch(userActions.logout());
      });
  }

  render() {
    const { loginType } = this.props;
    console.log(loginType);
    loginType ? this.firebaseLogout() : this.siteLogout();

    // return false
    return <Redirect to={{ pathname: '/' }} />
  }
}

const mapStateToProps = state => ({
  loginType: state.authentication.loginType
});

export default connect(mapStateToProps)(Logout);