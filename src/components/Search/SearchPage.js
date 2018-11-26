/*
 * *
 *  * Created by vstymkovskyi on 11/23/18 11:15 AM.
 *
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { findUserByName } from '../../actions/uiactions';

import SearchList from './searchList';
import './search.css';

class SearchPage extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    // console.log('SearchPage -- componentWillReceiveProps');
    // console.log(this.props);
    // this.props.getUsers('Elizabet');
  }
  componentWillReceiveProps(nextProps) {
    console.log('SearchPage -- componentWillReceiveProps');
    console.log(this.props);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('click');
    console.log(e);
    console.log(e.target);
    console.log(e.target.value);
    // this.props.findUserByName('Pol');
  };


  render() {
    return (
        <div>
          <h1>Search user on github by name</h1>
          <Form>
            <FormGroup>
              <Label for={"searchName"}>User name</Label>
              <Input type={"text"} id={"searchName"} name={"searchName"} placeholder={"Enter github user name"} />
            </FormGroup>
            <Button onClick={this.handleSubmit}>Search</Button>
          </Form>
          <SearchList />
        </div>
    );
  }
}



SearchPage.propTypes = {
  searchResults: PropTypes.array.isRequired
};

const mapDispatchToProps = dispatch => ({
  findUserByName: (userName) => dispatch(findUserByName(userName))
});


const mapStateToProps = state => ({
  searchResults: state.searchResults.users.items,
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);