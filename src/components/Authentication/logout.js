/*
 * *
 *  * Created by vstymkovskyi on 12/5/18 3:06 PM.
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import {Redirect} from "react-router-dom";
import { firebaseAuth } from '../../components/Firebase/firebase'

import {userActions} from "../../actions/user.actions";

function Logout(props) {

  function siteLogout() {
    props.dispatch(userActions.logout());
  }

  function firebaseLogout() {
    const { dispatch } = props;
    firebaseAuth.signOut()
      .then(() => {
        dispatch(userActions.logout());
      });
  }

  return (() => {
    const { loginType } = props;
    loginType ? firebaseLogout() : siteLogout();

    return <Redirect to={{ pathname: '/' }} />
  })();
}

const mapStateToProps = state => ({
  loginType: state.authentication.loginType
});

export default connect(mapStateToProps)(Logout);