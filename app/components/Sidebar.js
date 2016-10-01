import React, { PropTypes, Component } from 'react';
import TreeView from 'treeview-react-bootstrap';
import ProjectModal from './ProjectModal';
import CreateIssueModal from './issue/CreateModal';
import { Label } from 'react-bootstrap';

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = { projctModalShow: false, issueModalShow: false };
    this.projectModalClose = this.projectModalClose.bind(this);
    this.issueModalClose = this.issueModalClose.bind(this);
  }

  static propTypes = {
    indexImg: PropTypes.any.isRequired,
    project: PropTypes.object.isRequired,
    createIssue: PropTypes.func,
    createProject: PropTypes.func
  }

  projectModalClose() {
    this.setState({ projectModalShow: false });
  }

  issueModalClose() {
    this.setState({ issueModalShow: false });
  }

  render() {
    const { indexImg, project, createProject, createIssue } = this.props;
    const styles = { backgroundImage: 'url(' + indexImg + ')' };

    const data = [
      {
        text: '项目概述',
        nodes: [
          {
            text: '问题',
            href: '/project/' + project.item.key + '/issue'
          },
          {
            text: '路线图',
            href: '/project/' + project.item.key + '/roadmap'
          },
          {
            text: '报告',
            href: '/project/' + project.item.key + '/report'
          },
          {
            text: '版本',
            href: '/project/' + project.item.key + '/version'
          },
          {
            text: '模块',
            href: '/project/' + project.item.key + '/module'
          }
        ]
      },
      {
        text: '项目管理',
        nodes: [
          {
            text: '问题类型',
            href: '/project/' + project.item.key + '/type'
          },
          {
            text: '工作流',
            href: '/project/' + project.item.key + '/workflow'
          },
          {
            text: '字段',
            href: '/project/' + project.item.key + '/field'
          },
          {
            text: '界面',
            href: '/project/' + project.item.key + '/screen'
          },
          {
            text: '状态',
            href: '/project/' + project.item.key + '/state'
          },
          {
            text: '解决结果',
            href: '/project/' + project.item.key + '/resolution'
          },
          {
            text: '优先级',
            href: '/project/' + project.item.key + '/priority'
          },
          {
            text: '角色权限',
            href: '/project/' + project.item.key + '/role'
          }
        ]
      }
    ];

    return (
      <div className='col-sm-3 sidebar-box'>
        <div className='cover-img' style={ styles }></div>
        { project.item.key &&
          <div className='sidebar-header'>
            <h3>{ project.item.name }</h3>
          </div>
        }
        { project.item.key &&
          <div className='treeview-div'>
            <TreeView data={ data } enableLinks highlightSelected={ false } nodeIcon={ '' } backColor = { 'rgba(0, 0, 0, 0)' } color={ 'white' } showBorder= { false }/>
          </div>
        }
        <div className='bottom-block'>
          <p style={ { marginBottom: '16px' } }>ActionView，一个开源、类 Jira 、轻量级的问题跟踪管理工具。<Label bsStyle='success'>刘旭</Label></p>
          { project.item.key && 
            <button className='btn btn-primary btn-lg btn-success' onClick={ () => this.setState({ issueModalShow: true }) }><i className='fa fa-plus'></i>&nbsp;&nbsp;创建问题</button>
          }
        </div>
        { this.state.issueModalShow && <CreateIssueModal show close={ this.issueModalClose } config={ project.options.config } create={ createIssue }/> }
      </div>
    );
  }
}
