import React, {Component} from 'react';
import axios from 'axios';

import BlocklyDrawer from 'react-blockly-drawer';
import Library from './Library.jsx'

class Workspace extends Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      problem: {},
      path: props.path,
      teacher: props.teacher,
      workspaceXML: [props.workspaceXML || '']
    }
  }

  componentDidMount() {
    if(this.state.path) {
      axios.get(`http://localhost:3001/admin/v1${this.state.path}.json`)
      .then(response => {
        this.setState({ problem: response.data });
      })
      .catch(error => console.log(error))
    }
  } 

  getWorkspaceCode = (code, workspace) => {

    let solution = eval(code);

    if(typeof solution !== 'string') {
      solution = solution.toString(10);
    }

    let solved = (solution === this.state.problem.solution)
    if (solved && !this.state.teacher && this.state.teacher !== undefined) {
      axios.post(`http://localhost:3001/admin/v1${this.state.path}`, { solution: workspace })
      .catch(error => console.log(error))
    }
    this.props.sendOutput(eval(code), workspace, solved)
  }



  render() {
    return (
      <React.Fragment>

        <div className="problem">  
          <h1> Problem </h1> 
          <div className="header">
            <h3>
              {this.state.problem.description}
            </h3>
          </div>

          <div className="body">
            {this.state.problem.statement}
          </div>

        </div>

        <div className="workspace">
          <h1>
            Workspace
          </h1>
          <BlocklyDrawer
            workspaceXML={this.props.workspaceXML}
            onChange={this.getWorkspaceCode}
            teacher={this.props.teacher}
          >
            <Library />
          </BlocklyDrawer>
        </div>

      </React.Fragment>
    );
  }
}

export default Workspace