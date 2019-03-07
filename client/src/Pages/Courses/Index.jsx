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

  // TODO: NEED TO RESTRICT THIS AXIOS REQUEST BASED UPON TEACHER ID
  componentDidMount() {
    axios.get('http://localhost:3001/admin/v1/courses.json')
    .then(response => {
      this.setState({
        courses: response.data
      })
    })
    .catch(error => console.log(error))
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
              DELETE COMPONENT
              <Delete teacher={this.props.teacher}/>
              EDIT COMPONENT
              <Link to={`${this.props.match.url}/${course.id}/edit`} >
                Edit
              </Link>
            </li> }
          </ul>
        </div>
      );
    }); 

    return (
      <div className="courses">
        <h1>{courses}</h1>
        { this.props.teacher && 
        <Link to={`${this.props.match.url}/new`} >
          Create a course CREATE COMPONENT
        </Link> }        
      </div>
    );
  }
}

export default CoursesIndex