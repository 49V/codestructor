import React, {Component} from 'react';
import axios from 'axios';

import Delete  from  './Delete.jsx'
import Update  from  './Update.jsx'
import ProblemsIndex from '../Problems/Index.jsx'

class CoursesShow extends Component {

  render() {

    return(
      <div>
        Course ID: {this.props.match.params.id}
        {/* INDEX PROBLEMS COMPONENT */}
        <ProblemsIndex />
        {/* DELETE COMPONENT */}
        <Delete />
        {/* EDIT COMPONENT*/}
        <Update />
      </div>
    );
  }
}

export default CoursesShow