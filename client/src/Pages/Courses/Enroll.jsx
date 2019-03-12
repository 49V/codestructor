import React, {Component} from 'react';
import axios from 'axios';

class CoursesEnroll extends Component {

  handleClick = (event) => {
    event.preventDefault();

    axios.post(`http://localhost:3001/admin/v1/courses/${this.props.courseId}/enroll`)
    .then((response) => {
      this.props.enrollCourse(this.props.courseId);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  render() {
    return(
      <a href="" onClick={this.handleClick}>
        <i className="far fa-calendar-plus"></i>
      </a>
    );
  }
}

export default CoursesEnroll;