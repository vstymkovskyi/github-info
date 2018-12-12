import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';

import Routes from './services/routes'
import {connect} from 'react-redux'

import { history } from './helpers/history';
import { notification } from './actions/notification';


class App extends Component {
  constructor(props) {
    super(props);

    //const { dispatch } = this.props;
    //history.listen((location, action) => {
    //  // clear alert on location change
    //  dispatch(notification.clear());
    //});
  }

  render() {
    //const { notification } = this.props;
    return (
      <div className="App">
        {/*{notification.message &&*/}
          {/*<div className={`notification ${notification.type}`}>{notification.message}</div>*/}
        {/*}*/}
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>

        <Routes />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { notification } = state;
  return {
    notification
  };
}

export default connect(mapStateToProps)(App);