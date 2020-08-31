import React, { PropTypes, Component } from 'react';
import { Button, FormControl } from 'react-bootstrap';
import _ from 'lodash';

const CreateModal = require('./CreateModal');
const SortCardsModal = require('../share/SortCardsModal');

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { createModalShow: false, sortCardsModalShow: false };
    this.createModalClose = this.createModalClose.bind(this);
  }

  static propTypes = {
    i18n: PropTypes.object.isRequired,
    isSysConfig: PropTypes.bool.isRequired,
    create: PropTypes.func.isRequired,
    setSort: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    indexLoading: PropTypes.bool.isRequired,
    collection: PropTypes.array.isRequired
  }

  createModalClose() {
    this.setState({ createModalShow: false });
  }

  sortCardsModalClose() {
    this.setState({ sortCardsModalShow: false });
  }

  render() {
    const { i18n, isSysConfig, create, setSort, loading, indexLoading, collection } = this.props;

    return (
      <div>
        <div style={ { marginTop: '5px' } }>
          <Button className='create-btn' onClick={ () => { this.setState({ createModalShow: true }); } } disabled={ indexLoading }>
            <i className='fa fa-plus'></i>&nbsp;New status
          </Button>
          { !indexLoading &&
          <Button
            className='create-btn'
            onClick={ () => { this.setState({ sortCardsModalShow: true }); } }>
            <i className='fa fa-pencil'></i>&nbsp;Edit order
          </Button> }
        </div>
        <div className='info-col'>
          <div className='info-icon'><i className='fa fa-info-circle'></i></div>
          <div className='info-content'>
            <span>Status refers to the status of the issue during the execution of the workflow, which is bound to a certain step when defining the workflow.<br/>Can only delete ones not associated with a workflow{ isSysConfig && '（Including custom workflows for each project）' }And did not apply to the status of the project issue</span>
          </div>
        </div>
        { this.state.createModalShow && 
          <CreateModal 
            show 
            close={ this.createModalClose } 
            create={ create } 
            collection={ collection } 
            i18n={ i18n }/> }
        { this.state.sortCardsModalShow &&
          <SortCardsModal
            show
            model='Status'
            close={ this.sortCardsModalClose.bind(this) }
            cards={ collection }
            setSort={ setSort }
            sortLoading={ loading }
            i18n={ i18n }/> }
      </div>
    );
  }
}
