import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';

import Routes from './services/routes'
import {connect} from 'react-redux'

import { history } from './helpers/history';
import { alertActions } from './actions/alert.actions';


class App extends Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }

  render() {
    const { alert } = this.props;
    return (
      <div className="App">
        {alert.message &&
          <div className={`alert ${alert.type}`}>{alert.message}</div>
        }
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>

        <Routes />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}

export default connect(mapStateToProps)(App);