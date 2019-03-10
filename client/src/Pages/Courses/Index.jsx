import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { instanceOf } from 'prop-types';
import Create from  './Create.jsx';
import Delete from  './Delete.jsx';
import Drop from './Drop.jsx';
import Enroll from  './Enroll.jsx';   
import Update  from  './Update.jsx';
import App from '../../App.jsx';

class CoursesIndex extends Component {

  constructor(props) {
    super(props);
    this.state = {
      courses: []
    };
  }

  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    });
  }

  async componentDidMount() {
    const coursesResponse = await axios.get('http://localhost:3001/admin/v1/courses');
    
    await this.setStateAsync({
      courses: coursesResponse.data
    });
    
  }
  
  // Teacher Only Actions
  addNewCourse = (newCourse) => {
    this.setState({
      courses: [...this.state.courses, newCourse]
    });
  } 

  deleteCourse = (courseId) => {
    let currentCourses = this.state.courses;
    const deleteIndex = this.findIndex(courseId, currentCourses);

    if(deleteIndex + 1) {
      currentCourses.splice(deleteIndex, 1);
    }

    this.setState({
      courses: currentCourses
    })
  }

  //Student Only Actions

  /*
  * Allows the <Drop /> component to change the state of the CoursesIndex page in order to show  course has been dropped
  */
  dropCourse = (courseId) => {

    const unownedCourses = this.state.courses.unowned;
    const ownedCourses = this.state.courses.owned;
    let swappedCourse;

    const swapIndex = this.findIndex(courseId, ownedCourses);

    if(swapIndex + 1) {
      swappedCourse = ownedCourses[swapIndex];
      ownedCourses.splice(swapIndex, 1);
      unownedCourses.push(swappedCourse);
    }

    const courses = {
      owned: ownedCourses,
      unowned: unownedCourses
    };

    this.setState({
      courses
    });
  }


  /*
  * Allows the <Enroll /> component to change the state of the CoursesIndex page in order to show  course has been enrolled in
  */
  enrollCourse = (courseId) => {
    // Remove from unowned courses
    const unownedCourses = this.state.courses.unowned;
    const ownedCourses = this.state.courses.owned;
    let swappedCourse;

    const deleteIndex = this.findIndex(courseId, unownedCourses);

    if(deleteIndex + 1) {
      swappedCourse = unownedCourses[deleteIndex]
      unownedCourses.splice(deleteIndex, 1);
      ownedCourses.push(swappedCourse);
    }

    const courses = {
      owned: ownedCourses,
      unowned: unownedCourses
    }

    this.setState({
      courses
    });
  }

  findIndex = (courseId, targetCourseList) => {
    let currentCourses = targetCourseList;
    let deleteIndex = 1;
    currentCourses.forEach( (course, index) => {
      if(course.id === courseId) {
        deleteIndex = index;
      }
    });
    return deleteIndex;
  }

  render() {
    
      const courses = {};

      if(this.props.teacher) {
        courses.owned = this.state.courses.map((course, index) => {          
          return(
            <div key={index}>
              <ul>
                <li>
                  <Link to={`${this.props.match.url}/${course.id}`}>
                    {course.name} : {course.id}
                  </Link>
                </li>
                { 
                  !this.props.teacher &&
                  <li>
                    Enroll
                  </li> 
                }
                { this.props.teacher && <li>
                  <Delete deleteCourse={this.deleteCourse} courseId={course.id} />
                </li> }
              </ul>
            </div>
          );
        })
    } else if(this.state.courses.owned) {
      
      courses.owned = this.state.courses.owned.map((course, index) => {          
        return(
          <div key={index}>
            <ul>
              <li>
                <Link to={`${this.props.match.url}/${course.id}`}>
                  {course.name} : {course.id}
                </Link>
              </li>
                <Drop courseId={course.id }dropCourse={this.dropCourse} />
            </ul>
          </div>
        );
      })

      courses.unowned = this.state.courses.unowned.map((course, index) => {          
        return(
          <div key={index}>
            <ul>
              <li>
                <Link to={`${this.props.match.url}/${course.id}`}>
                  {course.name} : {course.id}
                </Link>
              </li>
              <li>
                <Enroll courseId={course.id} enrollCourse={this.enrollCourse} />
              </li>
            </ul>
          </div>
        );
      })
    }
    
    

    return (
      <div className="courses">
        <h1></h1>
        {/* CREATE COMPONENT */}
        
        { !this.props.teacher &&
          <h1> Enrolled courses</h1>}
        { courses.owned }        

        { !this.props.teacher &&
          <h1> Other courses</h1>}
        { courses.unowned }

        { this.props.teacher && 
          <Create addNewCourse={this.addNewCourse} teacher={this.props.teacher}/> 
         }        

      </div>
    );
  }
}

export default CoursesIndex