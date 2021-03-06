import React, {Component} from 'react';
import axios from 'axios';

class CoursesUpdate extends Component {

  constructor(props) {
    super(props);
    this.state ={
      course: {}
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const {name, description} = event.target.elements;

    let updatedCourse = {
      name: name.value,
      description: description.value
    }

    axios.patch(`http://localhost:3001/admin/v1/courses/${this.props.courseId}`, updatedCourse)
    .then((response) => {
      this.props.updateCourse(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    return(
      <div className="create">
        {/* { this.props.teacher ? <h1> Teachers Courses Create Interface </h1> : <h1> Hey! How'd you get here? This page is only for teachers. </h1> } */}
          <h1>Edit the Course</h1>
          <form onSubmit={this.handleSubmit}>
            Name
            <div className="line">
              <input id="courseName" name="name" type="text" placeholder="Course Name" required /> 
            </div>  
            Description
            <div className="line">
              <input id="courseDescription" name="description" type="text" placeholder="Course Description" required />
            </div>
            
            <input className="submitButton" type="submit" value="Submit" />
          </form>
      </div>
    );
  }
}

export default CoursesUpdate;