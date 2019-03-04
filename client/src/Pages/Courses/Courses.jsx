import React, {Component} from 'react';
import axios from 'axios';

class Courses extends Component {

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
          {course.name} : {course.id}
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

export default Courses