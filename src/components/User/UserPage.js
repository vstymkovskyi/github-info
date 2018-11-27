/*
 * *
 *  * Created by vstymkovskyi on 11/23/18 5:52 PM.
 *  
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import { getUserInfo } from '../../actions/postactions';

import Header from './userHeader'
import Content from './userContent'
import './userpage.css';

class UserPage extends Component {

  componentWillMount() {
    this.props.getUserInfo(this.props.match.params.userName);
  }

  render() {
    return (
      <Container>
        <Row>
          {this.props.userData ? (
              <Col sm={12} lg={12}>
                <Header />
                <Content />
              </Col>
          ) : (
            <Col sm={12} className={"text-center"}> Loading ... </Col>
          )}
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  userData: state.searchResults.userData
});

const mapDispatchToProps = dispatch => ({
  getUserInfo: (userName) => dispatch(getUserInfo(userName))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);