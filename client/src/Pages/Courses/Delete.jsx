import React, {Component} from 'react';
import axios from 'axios';

class CoursesDelete extends Component {

  //TODO: INSERT AXIOS REQUEST IN ORDER TO DELETE A ENTRY

  render() {
    return(
      <div>
      { this.props.teacher ? <h1> Teachers Courses Delete Interface </h1> : <h1> Hey! How'd you get here? This page is only for teachers. </h1> }
    </div>
    );
  }
}

export default CoursesDelete;