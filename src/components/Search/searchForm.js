import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button, Form, FormGroup, Label, Input, Col, CustomInput, Dropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';
import { searchActions } from '../../actions/search';
import { modalActions } from "../../actions/modal";

class SearchForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchField:       '',
      searchBy:          ['fullname'],
      sortBy:            'best_match',
      orderBy:           'desc',
      searchFormBlocked: false,
      orderListOpen:     false,
      sortListOpen:      false
    };

    this.handleSubmit     = this.handleSubmit.bind(this);
    this.handleSelect     = this.handleSelect.bind(this);
    this.checkSearchBy    = this.checkSearchBy.bind(this);
    this.toggleOrderList  = this.toggleOrderList.bind(this);
    this.toggleSortList   = this.toggleSortList.bind(this);
    this.outputSelectList = this.outputSelectList.bind(this);

    this.sortOptions = {
      'best_match':   'Best match',
      'followers':    'Followers',
      'repositories': 'Repositories',
      'joined':       'Joined'
    };

    this.orderOptions = {
      'asc':  'ASC',
      'desc': 'DESC'
    };
  }

  toggleSortList() {
    this.setState(prevState => ({
      sortListOpen: !prevState.sortListOpen
    }));
  }

  toggleOrderList() {
    this.setState(prevState => ({
      orderListOpen: !prevState.orderListOpen
    }));
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
    let value = event.target.value.trim();

    this.setState({[event.target.name]: value});
  }

  handleSelect (event) {
    if(this.state.searchField) {
      this.setState({[event.target.name]: event.target.value}, this.handleSubmit);
    } else {
      this.setState({[event.target.name]: event.target.value});
    }
  }

  handleSubmit = (e) => {
    if(e) e.preventDefault();
    if(this.state.searchField) {
      this.props.findUserByName({
        userName: this.state.searchField,
        searchBy: this.state.searchBy,
        sortBy:   this.state.sortBy,
        orderBy:  this.state.orderBy
      });
    } else {
      this.props.openModal({
        type: 'custom',
        title: 'Error',
        content: 'Search filed can not be empty'
      });
    }
  };


  outputSelectList (type, isOpen, options) {
    const self = this;
    const toggleFunc = (type === 'orderBy') ? this.toggleOrderList : this.toggleSortList;

    return (
      <Dropdown isOpen={isOpen} toggle={toggleFunc}>
        <DropdownToggle caret>{options[self.state[type]]}</DropdownToggle>
        <DropdownMenu>
          {Object.keys(options).map((key, i) => {
            return (
              <DropdownItem key={i}
                            onClick={self.handleSelect}
                            name="sortBy"
                            value={key}
                            disabled={(self.state[type] === key)}
              >
                {options[key]}
              </DropdownItem>
            );
          })}
        </DropdownMenu>
      </Dropdown>
    )
  }

  render() {
    const self = this;

    return (
      <React.Fragment>
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
            <Col md={2} className={""}>
              <label>Sort by</label>
              <Dropdown isOpen={this.state.sortListOpen} toggle={this.toggleSortList}>
                <DropdownToggle caret>{self.sortOptions[self.state.sortBy]}</DropdownToggle>
                <DropdownMenu>
                  {Object.keys(this.sortOptions).map((key, i) => {
                    return (
                      <DropdownItem key={i}
                                    onClick={self.handleSelect}
                                    name="sortBy"
                                    value={key}
                                    disabled={(self.state.sortBy === key)}
                      >
                        {self.sortOptions[key]}
                      </DropdownItem>
                    );
                  })}
                </DropdownMenu>
              </Dropdown>
            </Col>
            <Col md={2}>
              <label>Order</label>
              <Dropdown isOpen={this.state.orderListOpen} toggle={this.toggleOrderList}>
                <DropdownToggle caret>{self.orderOptions[self.state.orderBy]}</DropdownToggle>
                <DropdownMenu>
                  {Object.keys(this.orderOptions).map((key, i) => {
                    return (
                      <DropdownItem key={i}
                                    onClick={self.handleSelect}
                                    name="orderBy"
                                    value={key}
                                    disabled={(self.state.orderBy === key)}>
                        {self.orderOptions[key]}
                      </DropdownItem>
                    );
                  })}
                </DropdownMenu>
              </Dropdown>
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