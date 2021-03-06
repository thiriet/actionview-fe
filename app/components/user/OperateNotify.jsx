import React, { PropTypes, Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { notify } from 'react-notify-toast';

export default class OperateNotify extends Component {
  constructor(props) {
    super(props);
    this.state = { ecode: 0 };
    this.confirm = this.confirm.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  static propTypes = {
    close: PropTypes.func.isRequired,
    operate: PropTypes.string.isRequired,
    renew: PropTypes.func.isRequired,
    del: PropTypes.func.isRequired,
    invalidate: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
  }

  async confirm() {
    const { close, operate, renew, del, invalidate, data } = this.props;
    close();

    let ecode = 0, msg = '';
    if (operate === 'renew') {
      ecode = await renew(data.id);
      msg = '密码已重置。'; 
    } else if (operate === 'del') {
      ecode = await del(data.id);
      msg = '用户已删除。'; 
    } else if (operate === 'validate') {
      ecode = await invalidate(data.id, 0);
      msg = '用户已启用。'; 
    } else if (operate === 'invalidate') {
      ecode = await invalidate(data.id, 1);
      msg = '用户已禁用。'; 
    } else {
      return;
    }
    if (ecode === 0) {
      notify.show(msg, 'success', 2000);    
    } else {
      notify.show('Operation failed。', 'error', 2000);
    }
  }

  cancel() {
    const { close } = this.props;
    close();
  }

  render() {
    const { operate, data } = this.props;
    let operateTitle = '';
    if (operate === 'renew') {
      operateTitle = 'Reset password';
    } else if (operate === 'del') {
      operateTitle = 'Delete user'
    } else if (operate === 'validate') {
      operateTitle = 'User enabled';
    } else if (operate === 'invalidate') {
      operateTitle = 'User disabled';
    } else {
      return <div/>;
    }

    return (
      <Modal show onHide={ this.cancel } backdrop='static' aria-labelledby='contained-modal-title-sm'>
        <Modal.Header closeButton style={ { background: '#f0f0f0', height: '50px' } }>
          <Modal.Title id='contained-modal-title-la'>{ operateTitle }</Modal.Title>
        </Modal.Header>
        { operate === 'renew' && 
        <Modal.Body>
          Reset password for user: { data.first_name }？
        </Modal.Body> }
        { operate === 'del' && 
        <Modal.Body>
          After a user is deleted, the user of the project is also deleted<br/>
          Delete user: { data.first_name }？
        </Modal.Body> }
        { operate === 'validate' &&
        <Modal.Body>
          Enable the user { data.first_name }？
        </Modal.Body> }
        { operate === 'invalidate' &&
        <Modal.Body>
          Disable the user { data.first_name }？
        </Modal.Body> }
        <Modal.Footer>
          <Button onClick={ this.confirm }>Submit</Button>
          <Button bsStyle='link' onClick={ this.cancel }>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
