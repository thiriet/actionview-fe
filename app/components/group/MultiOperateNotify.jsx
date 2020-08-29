import React, { PropTypes, Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import _ from 'lodash';
import { notify } from 'react-notify-toast';

const img = require('../../assets/images/loading.gif');

export default class MultiOperateNotify extends Component {
  constructor(props) {
    super(props);
    this.state = { ecode: 0 };
    this.confirm = this.confirm.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  static propTypes = {
    i18n: PropTypes.object.isRequired,
    collection: PropTypes.array.isRequired,
    ids: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    operate: PropTypes.string.isRequired,
    close: PropTypes.func.isRequired,
    cancelSelected: PropTypes.func.isRequired,
    multiDel: PropTypes.func.isRequired
  }

  async confirm() {
    const { multiDel, cancelSelected, ids=[], collection, operate, close } = this.props;

    if (ids.length <= 0) {
      return;
    }

    let ecode = 0, msg = '', newIds = [];
    if (operate == 'del') {
      newIds = _.map(_.filter(collection, (v) => (!v.directory || v.directory == 'self') && ids.indexOf(v.id) !== -1), (v) => v.id);
      ecode = await multiDel(newIds);
      msg = 'The user group has been deleted.';
    }

    if (ecode === 0) {
      close();
      cancelSelected();
      notify.show(msg, 'success', 2000);    
    }
    this.setState({ ecode: ecode });
  }

  cancel() {
    const { close, loading } = this.props;
    if (loading) {
      return;
    }
    this.setState({ ecode: 0 });
    close();
  }

  render() {
    const { i18n: { errMsg }, loading, ids, collection } = this.props;

    return (
      <Modal show onHide={ this.cancel } backdrop='static' aria-labelledby='contained-modal-title-sm'>
        <Modal.Header closeButton style={ { background: '#f0f0f0', height: '50px' } }>
          <Modal.Title id='contained-modal-title-la'>Batch User Group - User Group Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          After the user group is deleted, the of user group in the project is also deleted.<br/>
          A total of <span style={ { fontWeight: 'bold' } }>{ ids.length }</span> user group，
          Total <span style={ { fontWeight: 'bold', color: 'red' } }>{ _.filter(collection, (v) => (!v.directory || v.directory == 'self') && ids.indexOf(v.id) !== -1).length }</span> user group can be deleted.<br/>
          Delete？<br/><br/>
          Note：This operation is invalid for the of user group synchronized from an external user directory.
        </Modal.Body>
        <Modal.Footer>
          <span className='ralign'>{ this.state.ecode !== 0 && !loading && errMsg[this.state.ecode] }</span>
          <img src={ img } className={ loading ? 'loading' : 'hide' }/>
          <Button onClick={ this.confirm }>Submit</Button>
          <Button bsStyle='link' disabled={ loading } onClick={ this.cancel }>Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
