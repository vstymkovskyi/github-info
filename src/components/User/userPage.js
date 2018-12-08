/*
 * *
 *  * Created by vstymkovskyi on 12/4/18 2:56 PM.
 *  
 */

import React, {Component} from 'react';
import { connect } from 'react-redux';

import { userActions } from '../../actions/user.actions';
import { alertActions } from '../../actions/alert.actions';
import { Container, Row, Col } from 'reactstrap';
import Header from "./UserHeader";
import Content from "./UserContent";

class UserPage extends Component {

  componentDidMount() {

  }

  render() {
    const { currentUser } = this.props;
    console.log(currentUser);

    return (
      <Container>
        <Row>
          {currentUser ? (
            <Col sm={12} lg={12}>
              <Header />
              <Content userData={currentUser} />
            </Col>
          ) : (
            <Col sm={12} className={"text-center"}> Loading ... </Col>
          )}
        </Row>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  const { authentication, alert } = state;
  const { currentUser } = authentication;
  return {
    alert,
    currentUser
  };
}

export default connect(mapStateToProps)(UserPage);
