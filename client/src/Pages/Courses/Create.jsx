import React, {Component} from 'react';
import axios from 'axios';

class CoursesCreate extends Component {

  //TODO: INSERT AXIOS REQUEST IN ORDER TO POST NEW ENTRY

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
      <div>
        {/* { this.props.teacher ? <h1> Teachers Courses Create Interface </h1> : <h1> Hey! How'd you get here? This page is only for teachers. </h1> } */}
        <React.Fragment>
          <h1>Create a Course</h1>
          <form onSubmit={this.handleSubmit}>
            Name:
            <div>
              <input id="courseName" name="name" type="text" placeholder="Course Name" required /> 
            </div>  
            Description:
            <div>
              <input id="courseDescription" name="description" type="text" placeholder="Course Description" />
            </div>
            
            <input type="submit" value="Submit" />
          </form>
        </React.Fragment>
      </div>
    );
  }
}

export default CoursesCreate;