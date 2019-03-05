import React, {Component} from 'react';
import axios from 'axios';
import { Route, Link, Switch } from 'react-router-dom';
import CoursesShow from './CoursesShow.jsx'

class CoursesIndex extends Component {

  constructor(props) {
    super(props);
    this.state = {
      courses: []
    };
  }

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
          </ul>
        </div>
      );
    }); 

    return (
      <div className="courses">
        <h1>{courses}</h1>
      </div>
    );
  }
}

export default CoursesIndex