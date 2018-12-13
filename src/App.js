import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';

import Routes from './services/routes'
import {connect} from 'react-redux'
import Modals from "./components/Modals/Modals";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>

        <Routes />

        <Modals />
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