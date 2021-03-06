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
    del: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
  }

  async confirm() {
    const { close, del, data } = this.props;
    close();
    const ecode = await del(data.id);
    if (ecode === 0) {
      notify.show('Deletion complete', 'success', 2000);
    } else {
      notify.show('Deletion failed', 'error', 2000);
    }
  }

  cancel() {
    const { close } = this.props;
    close();
  }

  render() {
    const { data } = this.props;

    return (
      <Modal show onHide={ this.cancel } backdrop='static' aria-labelledby='contained-modal-title-sm'>
        <Modal.Header closeButton style={ { background: '#f0f0f0', height: '50px' } }>
          <Modal.Title id='contained-modal-title-la'>删除字段 - { data.name }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          该字段被删除后，问题中相关字段信息都将被删除，且不可恢复，请慎重。<br/>
          确认要删除此字段？
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={ this.confirm }>Submit</Button>
          <Button bsStyle='link' onClick={ this.cancel }>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
