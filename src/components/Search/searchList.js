/*
 * *
 *  * Created by vstymkovskyi on 11/23/18 11:10 AM.
 *
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Container, Row } from 'reactstrap';

import SearchListItem from './searchListItem';

class SearchList extends Component {

  render() {
    let userItems;
    if(this.props.searchResults.length) {
      userItems = this.props.searchResults.map(item => (
          <SearchListItem userObj={item} key={item.id} />
      ));
    }

    return (
      <Container fluid>
        <Row>
          { userItems }
        </Row>
      </Container>
    );
  }
}

SearchList.propTypes = {
  searchResults: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  searchResults: state.searchResults.users.items,
});

export default connect(mapStateToProps, {})(SearchList);