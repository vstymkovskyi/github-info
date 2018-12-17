/*
 * *
 *  * Created by vstymkovskyi on 11/23/18 11:15 AM.
 *
 */

import React, {Component} from 'react';
import { connect } from 'react-redux';

import { searchActions } from '../../actions/search';
import SearchForm from './searchForm';
import SearchList from './searchList';
import './search.css';

class SearchPage extends Component {

  componentWillMount() {
    //clear previous results
    this.props.dispatch(searchActions.clearResults());
  }

  render() {
    return (
      <div className="jumbotron">
        <h1>Search user on github</h1>
        <SearchForm />
        <SearchList />
      </div>
    );
  }
}

export default connect(null)(SearchPage);