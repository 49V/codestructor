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
      problems: [],
      // user state from props >> user (from App.jsx state)
    };
  }

  // TODO: NEED TO RESTRICT THIS REQUEST BASED UPON COURSE ID TO GET APPROPRIATE COURSE DESCRIPTION 
  // AS WELL AS APPROPRIATE PROBLEM INFORMATION
  componentDidMount(){
    axios.get('http://localhost:3001/admin/v1/problems')
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
              { this.props.teacher && 
              <ul>
              {/* Teacher Only Links */}
                <li><ProblemsDelete teacher={this.props.teacher}/></li>
                <li>
                  <Link to={`${this.props.match.url}/problems/${problem.id}/edit`} >
                    Edit
                  </Link>
                </li>
              </ul>
              }
            </li>
          </ul>
        </div>
      );
    });

    return(
      <div className="problems">
        Course ID: {this.props.match.params.id}
        <br/>
        User: {this.props.userID}
        {problems}
        { this.props.teacher &&
          <div className='teacherLinks'>
            <Link to={`${this.props.match.url}/problems/new`} >
              Create a problem
            </Link>
            <CoursesUpdate teacher={this.props.teacher}/>
            <CoursesDelete teacher={this.props.teacher}/>
          </div>
        }
      </div>
    );

  }
}

export default CoursesShow