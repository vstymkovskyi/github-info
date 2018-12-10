import React, {Component} from 'react';
import {connect} from 'react-redux';

class SearchUserHeader extends Component {
  render() {
    const {userData} = this.props;

    return (
      <div className="card hovercard">
        <div className="card-background">
          <img className="card-bkimg"
               alt=""
               src={userData.avatar_url} />
        </div>
        <div className="useravatar">
          <img alt="" src={userData.avatar_url} />
        </div>
        {userData.login != null &&
          <div className="card-info"><span className="card-title">{userData.login}</span></div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  const userData = (state.searchResults.userData) ? state.searchResults.userData : state.authentication.currentUser;
  return {
    userData: userData
  }
};

export default connect(mapStateToProps)(SearchUserHeader);