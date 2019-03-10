import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Workspace from '../../Blockly/Workspace.jsx'

import Delete from  './Delete.jsx';

class ProblemsShow extends Component {

  //TODO: INSERT AXIOS REQUEST IN ORDER TO GET A SPECIFIC PROBLEM
  constructor(props) {
    super(props);
    this.problemOut;
    this.problemXml;
  }

  receiveOutput = (result, xml) => {
    this.problemOut = result;
    this.problemXml = xml;
  }

  render() {
    console.log(this.props)
    return(
      <div>
        <Workspace id={this.props.match.params.id} path={this.props.match.url} sendOutput={this.receiveOutput} teacher={this.props.teacher} />
          { this.props.teacher && <div> <Delete teacher={this.props.teacher}/>
        <Link to={`${this.props.match.url}/edit`} >
          Edit
       </Link>  </div> }
      </div>
    );

  }

}

export default ProblemsShow