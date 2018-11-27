import React, {Component} from 'react';
import {connect} from 'react-redux';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';

class UserContent extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      tabs: {
        items: ['Overview', 'Repositories', 'Followers', 'Following']
      },
      activeTab: 0
    };
  }

  toggle(tab) {
    console.log(tab);
    console.log(this.state);
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    //const tabs = RenderTabs(this.state.tabs);
    return (
      <div>
        <RenderTabs tabs={this.state.tabs} toggle={this.toggle} activeTab={this.state.activeTab} />
        <RenderTabsContent />
      </div>
    );
  }
}

function RenderTabs (props) {
  const {tabs} = props;

  function outputTab(index, tab) {
    return (
      <NavItem key={index}>
        <NavLink
          className={classnames({ active: props.activeTab === index })}
          onClick={(e) => { props.toggle(index) }}
        >
          <span className="glyphicon glyphicon-star" aria-hidden="true"></span>
          <span className="hidden-xs">{tab}</span>
        </NavLink>
      </NavItem>
    )
  }

  function outputLink() {

  }

  return (
    <Nav tabs>
      {
        tabs.items.map((item, index) =>
          outputTab(index, item)
        )
      }
    </Nav>
  )
}

function RenderTabsContent () {
  return <div className="well">
    <div className="tab-content">
      <div className="tab-pane fade in active" id="tab1">
        <h3>This is tab 1</h3>
      </div>
      <div className="tab-pane fade in" id="tab2">
        <h3>This is tab 2</h3>
      </div>
      <div className="tab-pane fade in" id="tab3">
        <h3>This is tab 3</h3>
      </div>
      <div className="tab-pane fade in" id="tab4">
        <h3>This is tab 3</h3>
      </div>
    </div>
  </div>
}

const mapStateToProps = state => ({
  userData: state.searchResults.userData
});

export default connect(mapStateToProps)(UserContent);