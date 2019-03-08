import React, {Component} from 'react';
import Workspace from '../Blockly/Workspace.jsx'

class ProblemsUpdate extends Component {

  //TODO: INSERT AXIOS REQUEST IN ORDER TO EDIT A ENTRY

  render() {
    return(
      <div>
        { this.props.teacher ? <main><Workspace id={this.props.match.params.id} /> </main> : <h1> Hey! How'd you get here? This page is only for teachers. </h1> }
        <button>Save Changes</button>
      </div>
    )
  }

}

export default ProblemsUpdate;