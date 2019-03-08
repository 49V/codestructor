import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Workspace from '../Blockly/Workspace.jsx'

import Delete from  './Delete.jsx';

class ProblemsShow extends Component {

  //TODO: INSERT AXIOS REQUEST IN ORDER TO GET A SPECIFIC PROBLEM

  render() {

    return(
      <div>
        Problem ID: {this.props.match.params.id}
        Workspace: 
        {/* BLOCKLY WORKSPACE COMPONENT */}
        <Workspace />
       { this.props.teacher && <div> <Delete teacher={this.props.teacher}/>
        <Link to={`${this.props.match.url}/edit`} >
          Edit
       </Link>  </div> }
      </div>
    );

  }

}

export default ProblemsShow