import React, { PropTypes, Component } from 'react';
import { Modal, Button, FormControl } from 'react-bootstrap';

export default class ShareLinkModal extends Component {
  constructor(props) {
    super(props);
    const urls = window.location.href.split('?');
    this.state = { url: urls.shift() + '?' + 'no=' + props.issue.no };
  }

  static propTypes = {
    close: PropTypes.func.isRequired,
    issue: PropTypes.object.isRequired
  }

  copy() {
    document.getElementById('url').select();
    document.execCommand('Copy');

    const { close } = this.props;
    close();
  }

  render() {
    const { issue, close } = this.props;

    return (
      <Modal { ...this.props } onHide={ close } backdrop='static' aria-labelledby='contained-modal-title-sm'>
        <Modal.Header closeButton style={ { background: '#f0f0f0', height: '50px' } }>
          <Modal.Title id='contained-modal-title-la'>分享链接 - { issue.no }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormControl
            id='url'
            componentClass='textarea'
            style={ { height: '100px' } }
            value={ this.state.url } />
        </Modal.Body>
        <Modal.Footer>
          <span className='ralign' style={ { fontSize: '12px' } }>若当前浏览器不支持此复制功能，可手动复制以上链接。</span>
          <Button onClick={ this.copy.bind(this) }>复制</Button>
          <Button bsStyle='link' onClick={ close }>关闭</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
