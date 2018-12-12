/*
 * *
 *  * Created by vstymkovskyi on 12/4/18 2:56 PM.
 *  
 */

import React, {Component} from 'react';
import { connect } from 'react-redux';

import { Container, Row, Col } from 'reactstrap';
import Header from "../SearchUser/searchUserHeader";

class UserPage extends Component {

  componentDidMount() {

  }

  render() {
    const { currentUser } = this.props;
    const loginTypeValues = {
      google: 'Google',
      github: 'GitHub',
      local: 'Local registration'
    };

    return (
      <Container>
        <Row>
          {currentUser ? (
            <Col sm={12} lg={12}>
              <Header />
              <Container>
                <Row>
                  <Col sm="12">
                    <h1>{currentUser.name}</h1>
                    <div className="p-note user-profile-id"><strong>ID:</strong> {currentUser.id}</div>
                    <div className="p-note user-profile-id"><strong>Username:</strong> {(currentUser.username != null) ? currentUser.username : currentUser.name}</div>
                    <div className="p-note user-profile-type"><strong>Login type:</strong> {loginTypeValues[currentUser.loginType]}</div>
                    {currentUser.created_at != null &&
                      <div className="p-note user-profile-created">
                        <strong>Created date:</strong> {new Date(currentUser.created_at).toLocaleString('en-GB', {hour12: false})}
                      </div>
                    }
                    { currentUser.bio != null &&
                      <div className="p-note user-profile-bio">
                        <strong>About: </strong><span>{currentUser.bio}</span>
                      </div>
                    }
                    { currentUser.company != null &&
                      <div className="p-note user-profile-company">
                        <strong>Company: </strong><span>{currentUser.company}</span>
                      </div>
                    }
                    <a href={currentUser.html_url} target={"blank"} className={"btn btn-secondary btn-sm"}>view profile</a>
                  </Col>
                </Row>
              </Container>
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
  const { authentication, notification } = state;
  const { currentUser } = authentication;
  return {
    notification,
    currentUser
  };
}

export default connect(mapStateToProps)(UserPage);
