import React, { Component } from 'react';
// import { Provider } from 'react-redux';

import logo from './logo.svg';
import './App.css';

import Navigation from './components/navigation'

import Routes from './services/routes'
// import store from './store'
import {connect} from 'react-redux'

import { history } from './helpers/history';
import { alertActions } from './actions/alert.actions';


class App extends Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    history.listen((location, action) => {
      // clear alert on location change
      setTimeout(() => dispatch(alertActions.clear()), 1500);
      // dispatch(alertActions.clear());
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
        <Navigation/>
        <Routes/>
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