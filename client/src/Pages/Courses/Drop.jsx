import React, {Component} from 'react';
import axios from 'axios';

class CoursesDrop extends Component {

  handleClick = (event) => {
    event.preventDefault();
    axios.delete(`http://localhost:3001/admin/v1/courses/${this.props.courseId}/drop`)
    .then(() => {
      this.props.dropCourse(this.props.courseId);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  render() {
    return(
      <a href="" onClick={this.handleClick}>
        Drop
      </a>
    );
  }

}

export default CoursesDrop