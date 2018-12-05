/*
 * *
 *  * Created by vstymkovskyi on 12/4/18 2:56 PM.
 *  
 */

import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { Link } from 'react-router-dom';
import { userActions } from '../../actions/user.actions';

class UserPage extends Component {
  componentWillMount() {
    //TODO: redirect before render

    // let user = localStorage.getItem('user');
    // if(user === null) {
    //   return <Redirect to={{ pathname: '/login' }} />
    // }
  }

  componentDidMount() {
    this.props.dispatch(userActions.getAllUsers());
  }

  handleDeleteUser(id) {
    return () => this.props.dispatch(userActions.deleteUser(id));
  }

  render() {
    const { user, users } = this.props;

    if(!user) {
      return <Redirect to={{ pathname: '/login' }} />
    }

    return (
        <div className="col-md-6 col-md-offset-3">
          <h1>Hi {user.firstName}!</h1>
          <p>You're logged in with React!!</p>
          <h3>All registered users:</h3>
          {users.loading && <em>Loading users...</em>}
          {users.items &&
          <ul>
            {users.items.map((user) =>
                <li key={user.id}>
                  {user.firstName + ' ' + user.lastName}
                  {
                    user.deleting ? <em> - Deleting...</em>
                        : user.deleteError ? <span className="error"> - ERROR: {user.deleteError}</span>
                        : <span> - <a href={'#!'} onClick={this.handleDeleteUser(user.id)}>Delete</a></span>
                  }
                </li>
            )}
          </ul>
          }
          <p>
            <Link to="/logout">Logout</Link>
          </p>
        </div>
    );
  }
}

function mapStateToProps(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return {
    user,
    users
  };
}

export default connect(mapStateToProps)(UserPage);
