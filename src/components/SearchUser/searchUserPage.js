/*
 * *
 *  * Created by vstymkovskyi on 11/23/18 5:52 PM.
 *  
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import { searchActions } from '../../actions/search';

import Header from './searchUserHeader'
import Content from './searchUserContent'
import './userpage.css';

class SearchUserPage extends Component {

  componentWillMount() {
    this.props.getUserInfo(this.props.match.params.userName);
  }

  render() {
    const {userData} = this.props;

    return (
      <Container>
        <Row>
          {this.props.userData ? (
              <Col sm={12} lg={12}>
                <Header userData={userData} />
                <Content userData={userData} />
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
  getUserInfo: (userName) => dispatch(searchActions.getUserInfo(userName))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchUserPage);