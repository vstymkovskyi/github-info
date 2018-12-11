import React, {Component} from 'react';
import {connect} from 'react-redux';

class SearchUserHeader extends Component {

  headerWithAvatar = (userData) => {
    return (
      <React.Fragment>
        <div className="card hovercard">
          <div className="card-background">
            <img className="card-bkimg"
                 alt=""
                 src={userData.avatar_url} />
          </div>
          <div className="useravatar">
            <img alt="" src={userData.avatar_url} />
          </div>
          <div className="card-info">
            <span className="card-title">
              {userData.firstName} {userData.lastName}</span>
          </div>
        </div>
      </React.Fragment>
    )
  };

  render() {
    const {userData} = this.props;
    const userName = userData.login ? userData.login : userData.username;

    return (
      <React.Fragment>
        {userData.avatar_url && this.headerWithAvatar(userData)}
        {!userData.avatar_url && userName != null &&
          <div className=""><span className="">{userName}</span></div>
        }
      </React.Fragment>
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