/*
 * *
 *  * Created by vstymkovskyi on 11/23/18 11:15 AM.
 *
 */

import React, {Component} from 'react';

import SearchForm from './searchForm';
import SearchList from './searchList';
import './search.css';

class SearchPage extends Component {

  render() {
    return (
      <div className="jumbotron">
        <h1>Search user on github by name</h1>
        <SearchForm />
        <SearchList />
      </div>
    );
  }
}

export default SearchPage;