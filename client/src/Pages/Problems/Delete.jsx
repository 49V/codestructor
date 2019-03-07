import React, {Component} from 'react';
import axios from 'axios';

class ProblemsDelete extends Component {

  //TODO: INSERT AXIOS REQUEST IN ORDER TO DELETE A ENTRY

  render() {
    return(
      <div>
        { this.props.teacher ? 
        <h1> Problem Delete </h1> 
        : 
        <h1> Hey! How'd you get here? This page is only for teachers. </h1> }
      </div>
    );
  }

}

export default ProblemsDelete;