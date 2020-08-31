import React, { PropTypes, Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { notify } from 'react-notify-toast';

export default class DelNotify extends Component {
  constructor(props) {
    super(props);
    this.confirm = this.confirm.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  static propTypes = {
    close: PropTypes.func.isRequired,
    reset: PropTypes.func,
    del: PropTypes.func,
    data: PropTypes.object.isRequired
  }

  async confirm() {
    const { close, del=null, reset=null, data } = this.props;
    let ecode = 0;
    close();
    if (reset) {
      ecode = await reset(data.id);
      if (ecode === 0) {
        notify.show('The reset is complete.', 'success', 2000);
      } else {
        notify.show('The reset failed.', 'error', 2000);
      }
    } else {
      ecode = await del(data.id);
      if (ecode === 0) {
        notify.show('Deletion complete', 'success', 2000);
      } else {
        notify.show('Deletion failed', 'error', 2000);
      }
    }
  }

  cancel() {
    const { close } = this.props;
    close();
  }

  render() {
    const { reset=null, del=null, data } = this.props;

    return (
      <Modal show onHide={ this.cancel } backdrop='static' aria-labelledby='contained-modal-title-sm'>
        <Modal.Header closeButton style={ { background: '#f0f0f0', height: '50px' } }>
          <Modal.Title id='contained-modal-title-la'>{ reset ? 'Reset' : 'Delete' }Role - { data.name }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { reset ? 'Confirm the reset of role permissions？' : 'Confirm the deletion of role？' }
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={ this.confirm }>Submit</Button>
          <Button bsStyle='link' onClick={ this.cancel }>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
