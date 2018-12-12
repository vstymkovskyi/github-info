/*
 *
 *  * *
 *  *  * Created by vstymkovskyi on 12/12/18 10:35 AM.
 *  *
 *  
 */

import React, {Component} from 'react';
import { connect } from 'react-redux';

class Popup extends Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };

    this.closeModal = this.closeModal.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  //showModal = () => {
  //  this.setState({ isOpen: true });
  //};
  //
  //hideModal = () => {
  //  this.setState({ isOpen: false });
  //};

  closeModal = () => {
    this.toggleModal();
  };

  render() {
    const {show, children} = this.props;
    const showHideClassName = show ? "modal show" : "modal hide";

    this.toggleModal(show);

    // The gray background
    const backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      padding: 50
    };

    // The modal "window"
    const modalStyle = {
      backgroundColor: '#fff',
      borderRadius: 5,
      maxWidth: 500,
      minHeight: 300,
      margin: '0 auto',
      padding: 30
    };

    return (
      <React.Fragment>
        <div className={showHideClassName} style={{backdropStyle}}>
          <section className="modal modal-main" style={{modalStyle}}>
            {children}
            <button onClick={this.toggleModal}>close</button>
          </section>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  //show: state.notification.show
  //children: state.notification.children,
});

export default connect(mapStateToProps)(Popup);