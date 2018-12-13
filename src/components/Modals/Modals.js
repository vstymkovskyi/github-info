/*
 * *
 *  * Created by vstymkovskyi on 12/13/18 3:35 PM.
 *
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import {modalActions} from '../../actions/notification'
import Modal from './Modal'

class Modals extends Component {
  render() {
    const modals = this.props.modals.map((item,i) => <Modal item={item} key={i} zIndex={i} onClose={(item) => this.props.closeModal(item)}/>);

    return (
        <div className={classnames('modal-overlay', { active: modals.length })}>
          {modals}
        </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.notification
});

const mapDispatchToProps = (dispatch) => (
  bindActionCreators(modalActions, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Modals);