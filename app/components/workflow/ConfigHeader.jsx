import React, { PropTypes, Component } from 'react';
import { Button, Label } from 'react-bootstrap';
import { Link } from 'react-router';
import _ from 'lodash';
import { notify } from 'react-notify-toast';

const CreateStepModal = require('./CreateStepModal');
const ConfigNotify = require('./ConfigNotify');
const PreviewModal = require('./PreviewModal');
const img = require('../../assets/images/loading.gif');

export default class ConfigHeader extends Component {
  constructor(props) {
    super(props);
    this.state = { isChanged: false, createStepModalShow: false, saveNotify: false, previewModalShow: false };
    this.createStepModalClose = this.createStepModalClose.bind(this);
    this.saveNotifyClose = this.saveNotifyClose.bind(this);
    this.cancelNotifyClose = this.cancelNotifyClose.bind(this);
    this.previewModalClose = this.previewModalClose.bind(this);
    this.save = this.save.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  static propTypes = {
    pathname: PropTypes.string.isRequired,
    workflowName: PropTypes.string,
    ecode: PropTypes.number.isRequired,
    collection: PropTypes.array.isRequired,
    collection2JSON: PropTypes.string.isRequired,
    saveLoading: PropTypes.bool.isRequired,
    options: PropTypes.object.isRequired,
    setConfigChanged: PropTypes.func.isRequired,
    save: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired,
    createStep: PropTypes.func.isRequired
  }

  createStepModalClose() {
    this.setState({ createStepModalShow: false });
  }

  saveNotifyClose() {
    this.setState({ saveNotifyShow: false });
  }

  cancelNotifyClose() {
    this.setState({ cancelNotifyShow: false });
  }

  previewModalClose() {
    this.setState({ previewModalShow: false });
  }

  dfsVisit(treeNodes, nodeId, vistedNodes) {
    if (_.indexOf(vistedNodes, nodeId) !== -1) {
      return;
    }

    vistedNodes.push(nodeId);

    const DestNodes = treeNodes[nodeId];
    const nodeNum = DestNodes.length;
    for (let i = 0; i < nodeNum; i++) {
      this.dfsVisit(treeNodes, DestNodes[i], vistedNodes);
    }
  }

  saveConfig() {
    const { collection } = this.props;

    const allSteps = [];
    const stepTree = {}; 

    const stepNum = collection.length;
    for (let i = 0; i < stepNum; i++) {
      allSteps.push(collection[i].id);
      stepTree[collection[i].id] = [];

      if (!collection[i].actions || collection[i].actions.length <= 0) {
        continue;
      }

      _.map(collection[i].actions, function(v) {
        _.map(v.results, function(v2) {
          stepTree[collection[i].id].push(v2.step);
        });
      });
    }

    const visitedSteps = [];
    this.dfsVisit(stepTree, 1, visitedSteps);

    if (_.xor(allSteps, visitedSteps).length > 0) {
      this.setState({ saveNotifyShow: true });
      return;
    } else {
      this.save();
    }
  }

  async save() {
    const { save, collection } = this.props;

    const initialActions = { id : 0, name: 'initial_action', results: [{ step: collection[0].id, status: 'Finished' }] };

    const ecode = await save({ contents : { initial_action: initialActions, steps: collection } });
    if (ecode === 0) {
      notify.show('Saved successfuly.', 'success', 2000);
    } else {
      notify.show('Save failed, please try again.', 'error', 2000);
    }
  }

  cancelConfig() {
    this.setState({ cancelNotifyShow: true });
  }

  cancel() {
    const { cancel } = this.props;
    cancel();
  }

  componentWillReceiveProps(nextProps) {
    const newCollection2JSON = JSON.stringify(nextProps.collection);
    const { collection2JSON, setConfigChanged } = this.props;

    const isChanged = (newCollection2JSON != nextProps.collection2JSON);
    this.setState({ isChanged });
    setConfigChanged(isChanged);
  }

  render() {
    const { createStep, options, pathname, collection, collection2JSON, workflowName, saveLoading } = this.props;

    return (
      <div>
        { this.state.isChanged && collection.length > 0 && 
        <div className='workflow-config-notice'>
          <span><i className='fa fa-exclamation-triangle'></i>&nbsp;&nbsp;The configuration has been modified and needs to be saved to take effect.</span>
          <Button 
            onClick={ this.saveConfig.bind(this) } 
            disabled={ saveLoading }>
            <i className='fa fa-save'></i>&nbsp;Save
          </Button>
          <Button
            bsStyle='link'
            onClick={ this.cancelConfig.bind(this) } >
            Cancel edit
          </Button>
          <img src={ img } className={ saveLoading ? 'loading' : 'hide' }/>
        </div> }
        <div style={ { marginTop: '5px' } }>
          <Link to={ pathname.substr(0, pathname.lastIndexOf('/')) }>
            <Button className='create-btn'><i className='fa fa-reply'></i>&nbsp;Back</Button>
          </Link>
          <Button 
            className='create-btn' 
            onClick={ () => { this.setState({ previewModalShow: true }); } } 
            disabled={ collection.length <= 0 }>
            <i className='fa fa-search-plus'></i>&nbsp;Preview
          </Button>
          <Button 
            className='create-btn' 
            onClick={ () => { this.setState({ createStepModalShow: true }); } }>
            <i className='fa fa-plus'></i>&nbsp;New step
          </Button>
          <span style={ { float: 'right', marginTop: '20px', marginRight: '10px', fontWeight: 'bold' } }>{ workflowName }</span>
          <span style={ { float: 'right', marginTop: '20px' } }>Workflow name：</span>
        </div>
        <div className='info-col'>
          <div className='info-icon'>
            <i className='fa fa-info-circle'></i>
          </div>
          <div className='info-content'>
            When configuring a workflow, you should first New workflow step, and then add related of actions. The state of each step is defined in the state module.
          </div>
        </div>
        { this.state.createStepModalShow && 
          <CreateStepModal 
            show 
            close={ this.createStepModalClose } 
            create={ createStep } 
            options={ options } 
            collection={ collection }/> }
        { this.state.saveNotifyShow &&
          <ConfigNotify
            show
            close={ this.saveNotifyClose }
            save={ this.save } /> }
        { this.state.cancelNotifyShow &&
          <ConfigNotify
            show
            close={ this.cancelNotifyClose }
            cancel={ this.cancel } /> }
        { this.state.previewModalShow && 
          <PreviewModal 
            show 
            close={ this.previewModalClose } 
            collection={ collection } 
            name={ workflowName } /> }
      </div>
    );
  }
}
