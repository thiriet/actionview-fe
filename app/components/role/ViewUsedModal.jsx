import React, { PropTypes, Component } from 'react';
import { Modal, Button, Table, Label } from 'react-bootstrap';
import { Link } from 'react-router';
import _ from 'lodash';

const img = require('../../assets/images/loading.gif');

export default class ViewUsedModal extends Component {
  constructor(props) {
    super(props);
    this.handleCancel = this.handleCancel.bind(this);
  }

  static propTypes = {
    close: PropTypes.func.isRequired,
    view: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    data: PropTypes.object.isRequired,
    projects: PropTypes.array.isRequired
  }

  componentWillMount() {
    const { view, data } = this.props;
    view(data.id);
  }

  handleCancel() {
    const { close } = this.props;
    close();
  }

  render() {
    const { projects, data, loading } = this.props;

    return (
      <Modal show onHide={ this.handleCancel } backdrop='static' aria-labelledby='contained-modal-title-sm'>
        <Modal.Header closeButton style={ { background: '#f0f0f0', height: '50px' } }>
          <Modal.Title id='contained-modal-title-la'>{ 'View project applications - ' + data.name }</Modal.Title>
        </Modal.Header>
        <Modal.Body style={ { height: '420px', overflow: 'auto' } }>
          { loading &&
          <div style={ { marginTop: '150px', textAlign: 'center' } }>
            <img src={ img } className='loading'/>
          </div> }
          { !loading &&
          <div style={ { marginBottom: '10px' } }>
            { projects.length > 0 ?
            <span>a total of<strong>{ projects.length }</strong> applications</span>
            :
            <span>No application in project</span> }
          </div> }
          { !loading && projects.length > 0 &&
          <Table condensed hover responsive>
            <thead>
              <tr>
                <th>Project name</th>
              </tr>
            </thead>
            <tbody>
            { _.map(projects, (v, key) => {
              return (
                <tr key={ key }>
                  <td>
                    { v.status === 'active' ?
                    <span><Link to={ '/project/' + v.key + '/team' }>{ v.name }</Link></span>
                    :
                    <span>{ v.name }(Closed)</span> }
                  </td>
                </tr> ); 
            }) }
            </tbody>
          </Table> }
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={ this.handleCancel }>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

