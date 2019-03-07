import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import CoursesDelete  from  './Delete.jsx';
import CoursesUpdate  from  './Update.jsx';
import ProblemsDelete from '../Problems/Delete.jsx';

class CoursesShow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      problems: []
    };
  }

  // TODO: NEED TO RESTRICT THIS REQUEST BASED UPON COURSE ID TO GET APPROPRIATE COURSE DESCRIPTION 
  // AS WELL AS APPROPRIATE PROBLEM INFORMATION
  componentDidMount(){
    axios.get('http://localhost:3001/admin/v1/problems.json')
    .then(response => {
      this.setState({
        problems: response.data
      })
    })
    .catch(error => console.log(error))
  }

  render() {

    let problems = this.state.problems.map((problem, index) => {
      return(
        <div key={index}>
          <ul>
            <li>
              <Link to={`${this.props.match.url}/problems/${problem.id}`} >
                  {problem.id} : {problem.statement}
              </Link>
              <ProblemsDelete />
              <Link to={`${this.props.match.url}/problems/${problem.id}/edit`} >
                Edit
              </Link>
            </li>
          </ul>
        </div>
      );
    });

    return(
      <div className="problems">
        Course ID: {this.props.match.params.id}
        {problems}
        <Link to={`${this.props.match.url}/problems/new`} >
          Create a problem
        </Link>
        <CoursesUpdate />
        <CoursesDelete />
      </div>
    );

  }
}

export default CoursesShow