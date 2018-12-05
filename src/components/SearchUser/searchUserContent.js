import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { TabContent, TabPane, Row, Col, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';

class SearchUserContent extends Component {
  static propTypes = {
    userData: PropTypes.instanceOf(Object).isRequired,
  };
  constructor(props) {
    super(props);

    this.state = {
      tabs:  ['Overview', 'Repositories', 'Followers', 'Following']
    };
  }

  render() {
    return <UserTabs tabs={this.state.tabs} activeTab={"0"} userData={this.props.userData} />
  }
}

class UserTabs extends Component {
  static propTypes = {
    activeTab: PropTypes.string.isRequired,
    tabs: PropTypes.instanceOf(Array).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      activeTab: props.activeTab
    };
  }


  switchTab = (tabIndex) => {
    if (this.state.activeTab !== tabIndex) {
      this.setState({
        activeTab: tabIndex.toString()
      });
    }
  };

  render() {
    return (
      <div>
        {this.renderTabs()}
        {this.renderTabsContent()}
      </div>
    );
  }

  renderTabs = () => {
    const {
      switchTab,
      props: {tabs, userData},
      state: {activeTab}
    } = this;

    return (
      <Nav tabs>
        {
          tabs.map((tab, index) => {
            return (
              <Tab
                activeTab={(activeTab === index.toString())}
                key={index}
                label={tab}
                userData={userData}
                onClick={() => {switchTab(index) }}
              />
            );
          })
        }
      </Nav>
    )
  };

  renderTabsContent = () => {
    const {
      props: {userData},
      state: {activeTab}
    } = this;

    return (
      <TabContent activeTab={activeTab}>
        <TabPane tabId="0">
          <Row>
            <Col sm="12">
              { userData.name ? (
                <h1>{userData.name} ({userData.login})</h1>
              ) : (
                <h1>{userData.login}</h1>
              )}
              <div className="p-note user-profile-id"><strong>ID:</strong> {userData.id}</div>
              <div className="p-note user-profile-type"><strong>Type:</strong> {userData.type}</div>
              <div className="p-note user-profile-admin"><strong>Admin:</strong> {userData.site_admin ? 'Yes' : 'No'}</div>
              <div className="p-note user-profile-created">
                <strong>Created date:</strong> {new Date(userData.created_at).toLocaleString('en-GB', {hour12: false})}
              </div>
              { userData.bio != null &&
                <div className="p-note user-profile-bio">
                  <strong>About: </strong><span>{userData.bio}</span>
                </div>
              }
              { userData.company != null &&
                <div className="p-note user-profile-company">
                  <strong>Company: </strong><span>{userData.company}</span>
                </div>
              }
              { userData.location != null &&
                <div className="p-note user-profile-location">
                  <svg className="octicon octicon-location m-2"
                       viewBox="0 0 12 16"
                       version="1.1"
                       width="12"
                       height="16"
                       aria-hidden="true">
                    <path fillRule="evenodd"
                          d="M6 0C2.69 0 0 2.5 0 5.5 0 10.02 6 16 6 16s6-5.98 6-10.5C12 2.5 9.31 0 6 0zm0 14.55C4.14 12.52 1 8.44 1 5.5 1 3.02 3.25 1 6 1c1.34 0 2.61.48 3.56 1.36.92.86 1.44 1.97 1.44 3.14 0 2.94-3.14 7.02-5 9.05zM8 5.5c0 1.11-.89 2-2 2-1.11 0-2-.89-2-2 0-1.11.89-2 2-2 1.11 0 2 .89 2 2z"></path>
                  </svg>
                  {userData.location}
                </div>
              }
              <a href={userData.html_url} target={"blank"} className={"btn btn-secondary btn-sm"}>view git profile</a>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="1">Repositories content</TabPane>
        <TabPane tabId="2">Followers content</TabPane>
        <TabPane tabId="3">Following content</TabPane>
      </TabContent>
    );
  }
}

class Tab extends Component {
  static propTypes = {
    userData: PropTypes.instanceOf(Object).isRequired,
    activeTab: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  render() {
    const {userData, onClick, activeTab, label} = this.props;

    return (
      <NavItem className={classnames('UnderlineNav-item', { selected: activeTab })}>
        <NavLink onClick={onClick}>
          {
            (() => {
              switch (label.toLowerCase()) {
                case 'repositories':
                  return <span>{label} <span className="counter">{userData.public_repos}</span></span>;
                case 'followers':
                  return <span>{label} <span className="counter">{userData.followers}</span></span>;
                case 'following':
                  return <span>{label} <span className="counter">{userData.following}</span></span>;
                default:
                  return <span>{label}</span>;
              }
            })()
          }
        </NavLink>
      </NavItem>
    );
  }
}

const mapStateToProps = state => ({
  userData: state.searchResults.userData
});

export default connect(mapStateToProps)(SearchUserContent);