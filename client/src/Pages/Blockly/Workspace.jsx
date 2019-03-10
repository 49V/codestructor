import React, {Component} from 'react';
import axios from 'axios';

import BlocklyDrawer from 'react-blockly-drawer';
import Library from './Library.jsx'

class Workspace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      problem: {},
      path: props.path,
      workspaceXML: [props.workspaceXML || '']
    }
  }


  componentDidMount() {
    if(this.state.path) {
      axios.get(`http://localhost:3001/admin/v1/${this.props.path}.json`)
      .then(response => {
        this.setState({ problem: response.data });
      })
      .catch(error => console.log(error))
    }
  } 

  getWorkspaceCode = (code, workspace) => {
    // if (this.props.solution && eval(code) === this.props.solution) {
      // console.log('solved');
    // }
    this.props.sendOutput(eval(code))
  }



  render() {
    return (
      <div>
        <h3>Problem: {this.state.problem.id || 'NEW'}</h3>
        <p>
        {this.state.problem.description || '' }
          <br/>
        {this.state.problem.statement || '' }
        </p>

        <BlocklyDrawer
          workspaceXML={this.props.workspaceXML}
          onChange={this.getWorkspaceCode}
        >
          <Library />
        </BlocklyDrawer>
      </div>
    );
  }
}

export default Workspace