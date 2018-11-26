/*
 * *
 *  * Created by vstymkovskyi on 11/23/18 5:52 PM.
 *  
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import { getUserInfo } from '../actions/postactions';

class UserPage extends Component {

  componentWillMount() {
    this.props.getUserInfo(this.props.match.params.userName);
  }

  render() {
    console.log(this.props.userData);
    return (
        <div>
          User Page
        </div>
    );
  }
}

const mapStateToProps = state => ({
  userData: state.searchResults.userData
});

const mapDispatchToProps = dispatch => ({
  getUserInfo: (userName) => dispatch(getUserInfo(userName))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);