/*
 * *
 *  * Created by vstymkovskyi on 12/4/18 4:33 PM.
 *
 */

import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

import { firebaseAuth, googleProvider, githubProvider } from '../../components/Firebase/firebase'
import { userActions } from '../../actions/user.actions';
import { alertActions } from '../../actions/alert.actions';

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
          username: result.user.email,
      };

      if(loginType === 'google') {
        user.id = result.additionalUserInfo.profile.id;
        user.firstName = result.additionalUserInfo.profile.given_name;
        user.lastName = result.additionalUserInfo.profile.family_name;
        user.picture = result.additionalUserInfo.profile.picture;
      } else {
          const name = result.additionalUserInfo.profile.name.split(' ');
          user.id = result.additionalUserInfo.profile.id;
          user.firstName = name[0];
          user.lastName = name[1];
          user.picture = result.additionalUserInfo.profile.avatar_url;
      }
      dispatch(userActions.loginWithFirebase(user.username, user, loginType));
    }).catch(reason => {
      dispatch(alertActions.error(reason.message));
    });
  }

  render() {
    const { loggingIn, loggedIn } = this.props;
    const { username, password, submitted } = this.state;

    if(loggedIn) {
      return <Redirect to={{ pathname: '/user' }} />
    }

    return (
      <div className="col-md-6 col-md-offset-3">
        <h2>Login</h2>
        <form name="form" onSubmit={this.handleSubmit}>
          <div className={'form-group'}>
            <button type={"button"} onClick={this.firebaseLogin} data-type="google">Sign in using Google</button>
            <button type={"button"} onClick={this.firebaseLogin} data-type="github">Sign in using GitHub</button>
          </div>
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
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggingIn: state.authentication.loggingIn,
  loggedIn: state.authentication.loggedIn
});

export default connect(mapStateToProps)(LoginPage);