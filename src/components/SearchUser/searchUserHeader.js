import React, {Component} from 'react';

class SearchUserHeader extends Component {

  headerWithAvatar = (userData) => {
    let displayName;
    if (userData.firstName && userData.lastName) {
      displayName = userData.firstName+' '+userData.lastName;
    } else {
      displayName = userData.name;
    }
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
            { displayName && <span className="card-title">{displayName}</span> }
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
          <div><span className="">{userName}</span></div>
        }
      </React.Fragment>
    );
  }
}

export default SearchUserHeader;