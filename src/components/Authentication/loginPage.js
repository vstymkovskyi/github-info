/*
 * *
 *  * Created by vstymkovskyi on 12/4/18 4:33 PM.
 *
 */

import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import {Container, Row, Col} from "reactstrap";

import { firebaseAuth, googleProvider, githubProvider } from '../../components/Firebase/firebase'
import { userActions } from '../../actions/user.actions';
import { modalActions } from '../../actions/notification';

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.firebaseLogin = this.firebaseLogin.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { username, password } = this.state;
    const { dispatch } = this.props;
    if (username && password) {
      dispatch(userActions.login(username, password, 'site'));
    }
  }

  firebaseLogin(e) {
    e.preventDefault();
    const loginType = e.target.dataset.type;
    const { dispatch } = this.props;
    const provider = loginType === 'google' ? googleProvider : githubProvider;

    firebaseAuth.signInWithPopup(provider)
    .then((result) => {
      let user = {
        id:       result.additionalUserInfo.profile.id,
        name:     result.additionalUserInfo.profile.name,
      };

      if(loginType === 'google') {
        user.username   = result.user.email;
        user.firstName  = result.additionalUserInfo.profile.given_name;
        user.lastName   = result.additionalUserInfo.profile.family_name;
        user.avatar_url = result.additionalUserInfo.profile.picture;
        user.html_url   = result.additionalUserInfo.profile.link;
      } else {
        const name      = result.additionalUserInfo.profile.name.split(' ');
        user.username   = result.additionalUserInfo.username;
        user.firstName  = name[0];
        user.lastName   = name[1];
        user.created_at = result.additionalUserInfo.profile.created_at;
        user.html_url   = result.additionalUserInfo.profile.html_url;
        user.bio        = result.additionalUserInfo.profile.bio;
        user.company    = result.additionalUserInfo.profile.company;
        user.avatar_url = result.additionalUserInfo.profile.avatar_url;
      }
      dispatch(userActions.loginWithFirebase(user.username, user, loginType));
    }).catch(reason => {
      dispatch(modalActions.openModal({
        type: 'custom',
        title: 'Error',
        content: reason.message
      }));
    });
  }

  componentWillUnmount() {
    if(this.props.loggedIn) {
      this.props.dispatch(modalActions.openModal({
        type: 'custom',
        content: 'You have successfully logged in.',
        onClose: () => console.log("fire at closing event"),
        onConfirm: () => console.log("fire at confirming event"),
      }));
    }
  }

  render() {
    const { loggingIn, loggedIn } = this.props;
    const { username, password, submitted } = this.state;

    if(loggedIn) {
      return <Redirect to={{ pathname: '/' }} />
    }

    return (
      <Container>
        <Row>
          <Col sm={12} md={"6 offset-md-3"}>
            <h2>Login</h2>
            <form name="form" onSubmit={this.handleSubmit}>
              <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                <label htmlFor="username">Username</label>
                <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
                {submitted && !username &&
                <div className="help-block">Username is required</div>
                }
              </div>
              <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                {submitted && !password &&
                <div className="help-block">Password is required</div>
                }
              </div>
              <div className="form-group">
                <button className="btn btn-primary">Login</button>
                {loggingIn &&
                <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" alt={"Login"} />
                }
                <Link to="/register" className="btn btn-link">Register</Link>
              </div>
              <div className={'form-group'}>
                <div className={"text-center"}>or</div>
              </div>
              <div className={'form-group'}>
                <button type={"button"} onClick={this.firebaseLogin} data-type="google"
                        className={"btn btn-block btn-lg btn-google"}><i className="fa fa-google"></i> Sign in using Google</button>
                <button type={"button"} onClick={this.firebaseLogin} data-type="github"
                        className={"btn btn-block btn-lg btn-github"}><i className="fa fa-github"></i> Sign in using GitHub</button>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  loggingIn: state.authentication.loggingIn,
  loggedIn: state.authentication.loggedIn
});

export default connect(mapStateToProps)(LoginPage);