import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Form, FormGroup, Label, Input, Col, CustomInput } from 'reactstrap';
import { searchActions } from '../../actions/search';
import { modalActions } from "../../actions/modal";

class SearchForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchField: '',
      searchBy: ['fullname'],
      searchFormBlocked: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkSearchBy = this.checkSearchBy.bind(this);
  }

  checkSearchBy(selected) {
    const index = this.state.searchBy.indexOf(selected);
    if (index < 0) {
      this.state.searchBy.push(selected);
    } else {
      this.state.searchBy.splice(index, 1);
    }

    this.setState({ searchFormBlocked: (this.state.searchBy.length === 0) });
    this.setState({ searchBy: [...this.state.searchBy] });
  }

  handleChange (event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if(this.state.searchField) {
      this.props.findUserByName({
        userName: this.state.searchField,
        searchBy: this.state.searchBy,
      });
    } else {
      this.props.openModal({
        type: 'custom',
        title: 'Error',
        content: 'Search filed can not be empty'
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        <Form>

        </Form>

        <Form onSubmit={this.handleSubmit}>
          <FormGroup row>
            <Col md={12}>
              <Label for={"searchBy"}>Search by</Label>
              <FormGroup check>
                <CustomInput type="checkbox" id="searchByLogin" label="Login" inline
                             onChange={() => this.checkSearchBy('login')}
                             checked={this.state.searchBy.includes('login')} />
                <CustomInput type="checkbox" id="searchByName" label="Name" inline
                             onChange={() => this.checkSearchBy('fullname')}
                             checked={this.state.searchBy.includes('fullname')} />
                <CustomInput type="checkbox" id="searchByEmail" label="Email" inline
                             onChange={() => this.checkSearchBy('email')}
                             checked={this.state.searchBy.includes('email')} />
              </FormGroup>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col md={6}>
                <Label for={"searchName"}>User name</Label>
                <Input type={"text"} id={"searchName"}
                       name={"searchField"}
                       onChange={event => this.handleChange(event)}
                       placeholder={"Enter github user name"} />
            </Col>
          </FormGroup>
          <Button disabled={this.state.searchFormBlocked}>Search</Button>
        </Form>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  findUserByName: (params) => dispatch(searchActions.findUser(params)),
  openModal: (params) => dispatch(modalActions.openModal(params))
});

export default connect(null, mapDispatchToProps)(SearchForm);