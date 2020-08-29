import React, { PropTypes, Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { notify } from 'react-notify-toast';

export default class ConfigNotify extends Component {
  constructor(props) {
    super(props);
    this.confirm = this.confirm.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  static propTypes = {
    close: PropTypes.func.isRequired,
    save: PropTypes.func,
    cancel: PropTypes.func
  }

  async confirm() {
    const { close, save=null, cancel=null } = this.props;
    close();

    if (cancel) {
      cancel();
    } else {
      const ecode = await save();
      if (ecode === 0) {
        notify.show('Saved', 'success', 2000);
      } else {
        notify.show('Save failed', 'error', 2000);
      }
    }
  }

  cancel() {
    const { close } = this.props;
    close();
  }

  render() {
    const { cancel } = this.props;

    return (
      <Modal show onHide={ this.cancel } backdrop='static' aria-labelledby='contained-modal-title-sm'>
        <Modal.Header closeButton style={ { background: '#f0f0f0', height: '50px' } }>
          <Modal.Title id='contained-modal-title-la'>{ cancel ? 'Configuration canceled' : 'Layout saved' }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <br/>
          { cancel ? 'Are you sure you want to abandon the modification?' : 'The configuration may not reach the of node. Are you sure you want to continue saving？' }
          <br/>
          <br/>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={ this.confirm }>Submit</Button>
          <Button bsStyle='link' onClick={ this.cancel }>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
