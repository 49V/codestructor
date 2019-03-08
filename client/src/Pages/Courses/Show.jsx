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
      course: {}
      // user state from props >> user (from App.jsx state)
    };
  }

  // TODO: NEED TO RESTRICT THIS REQUEST BASED UPON COURSE ID TO GET APPROPRIATE COURSE DESCRIPTION 
  // AS WELL AS APPROPRIATE PROBLEM INFORMATION
  async componentDidMount(){
    
    const coursesRequest = await axios.get(`http://localhost:3001/admin/v1/courses/${this.props.match.params.id}`);
    const problemsRequest = await axios.get(`http://localhost:3001/admin/v1/courses/${this.props.match.params.id}/problems`);
  
    this.setState({
      course: coursesRequest.data,
      problems: problemsRequest.data
    })
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
      <React.Fragment>
        <div className="course">
          <h1>
            {this.state.course.name}
          </h1>
          <div>
            {this.state.course.description}
          </div>
        </div>
        <br />
        <div className="problems">
          
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
      </React.Fragment>
    );

  }
}

export default CoursesShow