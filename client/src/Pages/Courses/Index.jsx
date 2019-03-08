import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { instanceOf } from 'prop-types';
import Create  from  './Create.jsx'
import Delete  from  './Delete.jsx'
import Update  from  './Update.jsx'
import App from '../../App.jsx';

class CoursesIndex extends Component {

  constructor(props) {
    super(props);
    this.state = {
      courses: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:3001/admin/v1/courses')
    .then(response => {
      this.setState({
        courses: response.data
      })
    })
    .catch(error => console.log(error))
  }

  addNewCourse = (newCourse) => {
    this.setState({
      courses: [...this.state.courses, newCourse]
    });
  } 

  deleteCourse = (courseId) => {
    const deleteIndex = this.findDeleteIndex(courseId);
    let currentCourses = this.state.courses;

    if(deleteIndex + 1) {
      currentCourses.splice(deleteIndex, 1);
    }

    this.setState({
      courses: currentCourses
    })
  }

  findDeleteIndex = (courseId) => {
    let currentCourses = this.state.courses;
    let deleteIndex = 1;
    currentCourses.forEach( (course, index) => {
      if(course.id === courseId) {
        deleteIndex = index;
      }
    });
    return deleteIndex;
  }

  render() {
    let courses = this.state.courses.map((course, index) => {
      return(
        <div key={index}>
          <ul>
            <li>
              <Link to={`${this.props.match.url}/${course.id}`}>
                {course.name} : {course.id}
              </Link>
            </li>
            { this.props.teacher && <li>
              <Delete deleteCourse={this.deleteCourse} courseId={course.id} />
            </li> }
          </ul>
        </div>
      );
    }); 

    return (
      <div className="courses">
        <h1>{courses}</h1>
        {/* CREATE COMPONENT */}
        { this.props.teacher && 
          <Create addNewCourse={this.addNewCourse} teacher={this.props.teacher}/>
         }        
      </div>
    );
  }
}

export default CoursesIndex