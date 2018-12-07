/*
 * *
 *  * Created by vstymkovskyi on 12/4/18 2:56 PM.
 *  
 */

import React, {Component} from 'react';
import { connect } from 'react-redux';

import { userActions } from '../../actions/user.actions';
import { alertActions } from '../../actions/alert.actions';

class UserPage extends Component {

  componentDidMount() {
    this.props.dispatch(userActions.getAllUsers());
  }

  handleDeleteUser(id) {
    return () => {
      if(id === this.props.currentUser.id) {
        this.props.dispatch(alertActions.error('You can not delete your self :-)'));
        return false;
      }
      return this.props.dispatch(userActions.deleteUser(id));
    }
  }

  render() {
    const { currentUser, users } = this.props;

    return (
        <div className="jumbotron">
          <div className="col-md-6 col-md-offset-3">
            <h1>Hi {currentUser.firstName}!</h1>
            <p>You're logged in with React!!</p>
            {users.items && users.items.length > 0 &&
              <h3>All registered users:</h3>
            }
            {users.loading && <em>Loading users...</em>}
            {users.items && users.items.length > 0 &&
              <ul className={"list-group list-group-flush"}>
                {users.items.map((user) =>
                    <li key={user.id} className={"list-group-item"}>
                      {user.firstName + ' ' + user.lastName}
                      {
                        user.deleting ? <em> - Deleting...</em>
                            : user.deleteError ? <span className="error"> - ERROR: {user.deleteError}</span>
                            : <span className={"float-right"}><button type={"button"} className={"btn btn-sm btn-danger"} onClick={this.handleDeleteUser(user.id)}>Delete</button></span>
                      }
                    </li>
                )}
              </ul>
            }
          </div>
        </div>
    );
  }
}

function mapStateToProps(state) {
  const { users, authentication, alert } = state;
  const { currentUser } = authentication;
  return {
    alert,
    currentUser,
    users
  };
}

export default connect(mapStateToProps)(UserPage);
