/*
 * *
 *  * Created by vstymkovskyi on 12/13/18 3:35 PM.
 *
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {modalActions} from '../../actions/modal'
import Modal from './Modal'

class Modals extends Component {
  render() {
    const modals = this.props.modals.map((item,i) => <Modal item={item} key={i} zIndex={i} onClose={(item) => this.props.closeModal(item)}/>);

    return (
      <React.Fragment> {modals}</React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.modals
});

const mapDispatchToProps = (dispatch) => (
  bindActionCreators(modalActions, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Modals);