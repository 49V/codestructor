import React, {Component} from 'react';
import axios from 'axios';

class ProblemsCreate extends Component {

  //TODO: INSERT AXIOS REQUEST IN ORDER TO CREATE A ENTRY

  render() {
    return(
      <div>
        { this.props.teacher ? <h1> Problem Create </h1> : <h1> Hey! How'd you get here? This page is only for teachers. </h1> }
      </div>
    );
  }
  
}

export default ProblemsCreate;