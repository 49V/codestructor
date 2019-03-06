import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


import Create  from  './Create.jsx'
import Delete  from  './Delete.jsx'
import Update  from  './Update.jsx'

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
            {/* CREATE COMPONENT */}
            <Create />
            {/* DELETE COMPONENT */}
            <Delete />
            {/* EDIT COMPONENT */}
            <Update />
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