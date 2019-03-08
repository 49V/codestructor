import React, {Component} from 'react';
import Blockly from 'node-blockly/browser'; 
import axios from 'axios';

import BlocklyDrawer, { Block, Category } from 'react-blockly-drawer';

class Workspace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      problem: {},
      workspaceXML: [props.workspaceXML || ''],
      skipChange: false
    }
  }


  componentDidMount() {
    axios.get(`http://localhost:3001/admin/v1/${this.props.path}.json`)
    .then(response => {
      this.setState({ problem: response.data });
    })
    .catch(error => console.log(error))
  } 


  render() {
    return (
      <div>
        <h3>Problem: {this.state.problem.id}</h3>
        <p>
        {this.state.problem.description}
          <br/>
        {this.state.problem.statement}
        </p>

        <BlocklyDrawer
          workspaceXML={this.props.workspaceXML}
          onChange={(code, workspace) => {
            if (eval(code) === this.props.solution) {
              alert('Got it!');
            }
          }}
        >

          <Category name='Variables' custom='VARIABLE' />
          <Category name='Values'>
            <Block type='math_number' />
            <Block type='text' />
          </Category>
  
        </BlocklyDrawer>
      </div>
    );
  }
}

export default Workspace