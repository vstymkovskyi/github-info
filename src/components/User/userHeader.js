import React, {Component} from 'react';
import {connect} from 'react-redux';

class UserHeader extends Component {
  render() {
    return (
      <div className="card hovercard">
        <div className="card-background">
          <img className="card-bkimg"
               alt=""
               src={this.props.userData.avatar_url} />
        </div>
        <div className="useravatar">
          <img alt="" src={this.props.userData.avatar_url} />
        </div>
        <div className="card-info"><span className="card-title">{this.props.userData.login}</span></div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userData: state.searchResults.userData
});

export default connect(mapStateToProps)(UserHeader);