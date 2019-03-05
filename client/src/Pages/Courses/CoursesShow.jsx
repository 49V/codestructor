import React, {Component} from 'react';
import axios from 'axios';

class CoursesShow extends Component {

  render() {

    return(
      <div>
        {this.props.match.params.id}
      </div>
    );
  }
}

export default CoursesShow