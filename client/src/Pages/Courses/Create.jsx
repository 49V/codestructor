import React, {Component} from 'react';
import axios from 'axios';

class CoursesCreate extends Component {

  //TODO: INSERT AXIOS REQUEST IN ORDER TO POST NEW ENTRY

  render() {
    return(
      <div>
        { this.props.teacher ? <h1> Teachers Courses Create Interface </h1> : <h1> Hey! How'd you get here? This page is only for teachers. </h1> }
      </div>
    );
  }
}

export default CoursesCreate;