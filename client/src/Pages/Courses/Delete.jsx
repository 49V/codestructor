import React, {Component} from 'react';
import axios from 'axios';

class CoursesDelete extends Component {

  //TODO: INSERT AXIOS REQUEST IN ORDER TO DELETE A ENTRY
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
        Delete
      </a>
    );
  }
}

export default CoursesDelete;