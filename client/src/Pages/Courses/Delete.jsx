import React, {Component} from 'react';
import axios from 'axios';

class CoursesDelete extends Component {

  handleClick = (event) => {
    event.preventDefault();
    const courseId = this.props.courseId;
    const deleteCourse = this.props.deleteCourse;
    
    axios.delete(`http://localhost:3001/admin/v1/courses/${this.props.courseId}`)
    .then(function (response) {
      deleteCourse(courseId);
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  render() {
    return(
      <a href="" onClick={this.handleClick}>
        <i className="far fa-trash-alt"></i>
      </a>
    );
  }
}

export default CoursesDelete;