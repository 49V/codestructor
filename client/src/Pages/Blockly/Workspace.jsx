import React, {Component} from 'react';
import axios from 'axios';
import Blockly, { JavaScript, workspace } from 'node-blockly/browser'
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
      view: props.override || 'working',
      complete: false
    }
  }
  
  componentDidMount() {
    Blockly.JavaScript.addReservedWords('code')
    if(this.state.path) {
      axios.get(`http://localhost:3001/admin/v1${this.state.path}.json`)
      .then(response => {
        this.setState({ problem: response.data });
      })
      .catch(error => console.log(error))
    }
  } 

  getWorkspaceCode = () => {
    if(this.props.sendOutput) {
      let code = Blockly.JavaScript.workspaceToCode(workspace);

      let solution = eval(code);
      if(typeof solution !== 'string') {
        solution = solution.toString(10);
      }
      let solved = (solution === this.state.problem.solution)
      if (!this.state.complete && solved && !this.state.teacher && this.state.teacher !== undefined) {
        axios.post(`http://localhost:3001/admin/v1${this.state.path}`, { solution: workspace, code: code })
        .catch(error => console.log(error))
        this.setState({ complete: true })
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

        <div className="workspace">
          <h1>
            Workspace
          </h1>
          <BlocklyDrawer
            workspaceXML={this.props.workspaceXML}
            onChange={()=>{return}}
            teacher={this.props.teacher}
          >
            { this.state.view === 'working' && <Library /> }          
          </BlocklyDrawer>
          <button className={""} onClick={this.getWorkspaceCode}> Test! </button>
        </div>

      </React.Fragment>
    );
  }
}

export default Workspace