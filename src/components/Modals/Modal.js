/*
 * *
 *  * Created by vstymkovskyi on 12/13/18 12:58 PM.
 *
 */

import React, {Component} from 'react';
import classnames from 'classnames';

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

  modalTemplate = (propsItem) => {
    const { type, title, content } = propsItem;
    return (
      <div className={classnames('modal fade show', { error: (type === 'error') })}
           tabIndex="-1"
           role="dialog"
           style={{display:'block'}}>
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            {title &&
              <div className="modal-header">
                <h5 className="modal-title">{title}</h5>
                <button type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                        onClick={() => this.onClose()}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
            }
            <div className="modal-body">
              {content}
            </div>
            <div className="modal-footer">
              <button type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                      onClick={() => this.onClose()}>Close
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  };

  render() {
    const { zIndex } = this.props;

    return (
      <div className="modal-overlay" style={{zIndex: (zIndex+1)*10}}>
        {this.modalTemplate(this.props.item)}
      </div>
    )

  }
}

export default Modal;
