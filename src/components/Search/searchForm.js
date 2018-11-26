import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { getUsers as findUserByName} from '../../actions/postactions';

class SearchForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchField: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange (event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.findUserByName(this.state.searchField);
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <Label for={"searchName"}>User name</Label>
          <Input type={"text"} id={"searchName"}
                 name={"searchField"}
                 onChange={event => this.handleChange(event)}
                 placeholder={"Enter github user name"} />
        </FormGroup>
        <Button>Search</Button>
      </Form>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  findUserByName: (userName) => dispatch(findUserByName(userName))
});

export default connect(null, mapDispatchToProps)(SearchForm);