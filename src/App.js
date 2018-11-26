import React, { Component } from 'react';
import { Provider } from 'react-redux';

import logo from './logo.svg';
import './App.css';

import Navigation from './components/navigation'

import Routes from './routes'
import store from './store'

class App extends Component {
  render() {
    return (
        <Provider store={store}>
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
            </header>
            <Navigation/>
            <Routes/>
          </div>
        </Provider>
    );
  }
}


export default App;
