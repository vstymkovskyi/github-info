/*
 * *
 *  * Created by vstymkovskyi on 11/23/18 5:33 PM.
 *
 */

import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import { NavLink } from 'react-router-dom'

class HomePage extends Component {

  pageContentAnonymous = () => {
    return (
      <React.Fragment>
        <p>At first please sign in to your account or create a new account locally.</p>
        <p className="lead">
          <NavLink className="btn btn-primary btn-sm mr-2" to="/login">Sign in</NavLink>
          <NavLink className="btn btn-primary btn-sm" to="/register">Register</NavLink>
        </p>
      </React.Fragment>
    );
  };

  pageContentAuthorized = () => {
    return (
      <React.Fragment>
        <p>Now you can make some <NavLink className="btn btn-info btn-sm" to="/search">Search</NavLink> or go to
           your <NavLink className="btn btn-info btn-sm" to="/user">profile page</NavLink> and check your account
           details.</p>
      </React.Fragment>
    );
  };

  render() {
    const loggedIn = this.props.loggedIn;
    return (
      <Container>
        <Row className="justify-content-center">
          <Col col={12}>
            <div className="jumbotron">
              <h1 className="display-4">Hello</h1>
              <p className="lead">It's a pet project to show my knowledge in React, Redux, Github API, Firebase and etc.</p>
              <hr className="my-4" />
              {!loggedIn && this.pageContentAnonymous()}
              {loggedIn && this.pageContentAuthorized()}
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.authentication.loggedIn
});

export default connect(mapStateToProps)(HomePage);