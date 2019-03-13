import React, {Component} from 'react';
import axios from 'axios';

class CoursesCreate extends Component {

  handleSubmit = (event) => {
    event.preventDefault();
    const {name, description} = event.target.elements;

    let newCourse = {
      name: name.value,
      description: description.value,
    };

    const addNewCourse = this.props.addNewCourse;

    axios.post('http://localhost:3001/admin/v1/courses', newCourse)
    .then(function (response) {
      newCourse = response.data;
      addNewCourse(newCourse);
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  render() {
    return(
      <div className="create">
          <h1>Create a Course</h1>
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

export default CoursesCreate;