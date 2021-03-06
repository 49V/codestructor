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
      teacher: props.teacher,
      workspaceXML: props.workspaceXML,
      view: props.override || 'working'
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
    if(this.props.sendOutput) {

      let solution = eval(code);

      if(typeof solution !== 'string') {
        solution = solution.toString(10);
      }

      let solved = (solution === this.state.problem.solution)
      if (!this.state.completed && solved && !this.state.teacher && this.state.teacher !== undefined) {
        axios.post(`http://localhost:3001/admin/v1${this.state.path}`, { solution: workspace, code: code })
        .catch(error => console.log(error))
      }
      this.props.sendOutput(eval(code), workspace, solved)
    }
  }



  render() {
    return (
      <React.Fragment>

        <div className="problem">  
          <div className="header">
              <span className="title">
                <h3>
                  {this.state.problem.description}
                </h3>
              </span>
          </div>

          <div className="body">
            <span className="description">
              {this.state.problem.statement}
            </span>
          </div>

        </div>

        { this.props.override === 'review' && this.props.completion && 
          <React.Fragment>
            <h1> Code output (JavaScript): </h1>  
            <pre className="prettyprint"> 
              {this.props.solutionCode} 
            </pre>
          </React.Fragment>
        }
        

        <div className="workspace">
          <h1>
            Workspace
          </h1>
          <BlocklyDrawer
            workspaceXML={this.props.workspaceXML}
            onChange={this.getWorkspaceCode}
            teacher={this.props.teacher}
          >
            { this.state.view === 'working' && <Library /> }          
          </BlocklyDrawer>
        </div>

      </React.Fragment>
    );
  }
}

export default Workspace