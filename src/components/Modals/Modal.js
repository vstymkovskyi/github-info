/*
 * *
 *  * Created by vstymkovskyi on 12/13/18 12:58 PM.
 *
 */

import React, {Component} from 'react';

class Modal extends Component {
  onClose(){
    if(this.props.item.onClose){
      this.props.item.onClose();
      this.props.onClose(this.props.item);
    } else {
      this.props.onClose(this.props.item);
    }
  }

  onConfirm(){
    if(this.props.item.onConfirm){
      this.props.item.onConfirm();
      this.props.onClose(this.props.item);
    }
  }

  render() {
    const { zIndex } = this.props;
    const { type } = this.props.item;
    if (type === 'confirmation') {
      const { text } = this.props.item;
      return (
          <div className="modal-wrapper" style={{zIndex: (zIndex+1)*10}}>
            <div className="modal">
              <div className="text">{text}</div>
              <div className="buttons">
                <button className="modal-button" onClick={() => this.onConfirm()}>Confirm</button>
                <button className="modal-button" onClick={() => this.onClose()}>Close</button>
              </div>
            </div>
          </div>
      )
    } else if (type === 'custom') {
      const { title, content } = this.props.item;
      return (
          <div className="modal-wrapper" style={{zIndex: (zIndex+1)*10}}>
            <div className="modal">
              <button className="close" onClick={() => this.onClose()}>&times;</button>
              {title &&
                <h3>{title}</h3>
              }
              <div>{content}</div>
            </div>
          </div>
      )
    }
    return (
        <React.Fragment>

        </React.Fragment>
    );
  }
}

export default Modal;
