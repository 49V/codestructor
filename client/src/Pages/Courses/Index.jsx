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
    const deleteIndex = this.findCourseIndex(courseId, currentCourses);

    if(deleteIndex + 1) {
      currentCourses.splice(deleteIndex, 1);
    }

    this.setState({
      courses: currentCourses
    })
  }

  // STUDENT ONLY ACTIONS
  
  /*
    * Allows the <Drop /> component to change the state of the CoursesIndex page to show dropped course
    *
    * @param courseId: typeof Number : A number containing the courseId of the course to be dropped
    * 
    * @returns undefined
  */
  dropCourse = (courseId) => {

    const unownedCourses = this.state.courses.unowned;
    const ownedCourses = this.state.courses.owned;
    let swappedCourse;

    // Find the course to be removed from ownedCourses (Courses student is enrolled in)
    const swapIndex = this.findCourseIndex(courseId, ownedCourses);

    // If the course exists, we will drop it(move it from the ownedCourses -> unownedCourses)
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
    * Allows the <Enroll /> component to change the state of the CoursesIndex page to show enrolled course
    *
    * @param courseId: typeof Number : A number containing the courseId of the course to be enrolled in
    * 
    * @returns undefined
  */
  enrollCourse = (courseId) => {

    const unownedCourses = this.state.courses.unowned;
    const ownedCourses = this.state.courses.owned;
    let swappedCourse;

    // Find the course to be removed from unownedCourses (Courses student isn't enrolled in)
    const swapIndex = this.findCourseIndex(courseId, unownedCourses);

    // If the course exists, we will enroll (move it from unownedCourses -> ownedCourses)
    if(swapIndex + 1) {
      swappedCourse = unownedCourses[swapIndex]
      unownedCourses.splice(swapIndex, 1);
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

  /*
    * For an array of objects, 
    *   IF EXISTS returns the index that matches the id
    *   OTHERWISE returns -1
    *
    * Example Input:
    * id = 28;
    * targetCourseList = [
    *   {id = 1, data = <something> }
    *   {id = 4, data = <something> }
    *   {id = 28, data = <something> }
    *   {id = 977, data = <something> } 
    * ]
    * 
    * Example Output:
    * 2
    * 
    * @param id: typeof Number : A number containing the course id of the course we are searching for
    *
    * @returns targetIndex : typeof Number : A number containing the index IF found ELSE -1
  */
  findCourseIndex = (id, targetCourseList) => {
    let currentCourses = targetCourseList;
    let targetIndex = 1;
    currentCourses.forEach( (course, index) => {
      if(course.id === id) {
        targetIndex = index;
      }
    });
    return targetIndex;
  }

  render() {
    
      const courses = {};

      if(this.props.teacher) {
        courses.owned = this.state.courses.map((course, index) => {          
          return(
            <div className="item" key={index}>
              <span className="footer">
                { this.props.teacher &&
                  <Delete deleteCourse={this.deleteCourse} courseId={course.id} />
                }
              </span>
              <Link to={`${this.props.match.url}/${course.id}`} style={{ color: '#0C8D30', textDecoration: 'none' }} >
                
                <div className="header">
                    <h2>
                      {course.name} 
                    </h2>
                </div>

                <div className="body">
                  {course.description}
                </div>
                </Link>
            </div>            
          );
        })
    } else if(this.state.courses.owned) {
      
      courses.owned = this.state.courses.owned.map((course, index) => {          
        return(
          <div className="item" key={index}>
            <span className="footer drop">
              <Drop courseId={course.id }dropCourse={this.dropCourse} />
            </span>
            <Link to={`${this.props.match.url}/${course.id}`} style={{ color: '#0C8D30', textDecoration: 'none' }} >
              
              <div className="header">
                  <h2>
                    {course.name} 
                  </h2>
              </div>

              <div className="body">
                {course.description}
              </div>
              </Link>
          </div>
        );
      })

      courses.unowned = this.state.courses.unowned.map((course, index) => {          
        return(
          <div className="item" key={index}>
            <span className="footer enroll">
              <Enroll courseId={course.id} enrollCourse={this.enrollCourse} />
            </span>
            <Link to={`${this.props.match.url}/${course.id}`} style={{ color: '#0C8D30', textDecoration: 'none' }} >
              
              <div className="header">
                  <h2>
                    {course.name} 
                  </h2>
              </div>

              <div className="body">
                {course.description}
              </div>
              </Link>
          </div>
        );
      })
    }
    
    

    return (
      <div className="courses">
        
        <div className="owned">
          { !this.props.teacher &&
            <h1> Enrolled courses</h1>}

          { this.props.teacher &&
            <h1> Created Courses</h1>}

          { courses.owned }   
        </div>

        <div className="unowned">
          { !this.props.teacher &&
            <h1> Other courses</h1>}
          { courses.unowned }
        </div>
        
        
        { this.props.teacher && 
            <Create addNewCourse={this.addNewCourse} teacher={this.props.teacher}/> 
         }        

      </div>
    );
  }
}

export default CoursesIndex