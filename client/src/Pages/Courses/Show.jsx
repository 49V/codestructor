import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import CoursesDelete  from  './Delete.jsx';
import CoursesUpdate  from  './Update.jsx';
import ProblemsDelete from './Problems/Delete.jsx';

class CoursesShow extends Component {

  constructor(props) {
    super(props);
    this.state = {
      problems: [],
      course: {}
      // user state from props >> user (from App.jsx state)
    };
  }

  async componentDidMount(){
    
    const coursesRequest = await axios.get(`http://localhost:3001/admin/v1/courses/${this.props.match.params.id}`);
    const problemsRequest = await axios.get(`http://localhost:3001/admin/v1/courses/${this.props.match.params.id}/problems`);
    const studentsRequest = await axios.get(`http://localhost:3001/admin/v1/courses/${this.props.match.params.id}/enrolled`);
  
    this.setState({
      course: coursesRequest.data,
      problems: problemsRequest.data,
      students: studentsRequest.data
    });
    
  }

  updateCourse = (updatedCourse) => {
    this.setState({
      course: updatedCourse
    });
  }

  deleteProblem = (courseIndex, problemId) => {
    const deleteIndex = this.findDeleteIndex(problemId);
    let currentProblems = this.state.problems;

    if(deleteIndex + 1) {
      currentProblems.splice(deleteIndex, 1);
    }
    this.setState({
      problems: currentProblems
    })
  } 

  findDeleteIndex = (problemId) => {
    let currentProblems = this.state.problems;
    let deleteIndex = -1;
    currentProblems.forEach((problem, index) => {
      if(problem.id === problemId) {
        deleteIndex = index;
      }
    });
    return deleteIndex;
  }

  render() {
    let problems = this.state.problems.map((problem, index) => {
      return(
        <div className="item" key={index}>
          <span className="footer">
            { this.props.teacher && 
              <React.Fragment>
                <ProblemsDelete teacher={this.props.teacher} deleteProblem={this.deleteProblem} courseId={this.props.match.params.id} problemId={problem.id}/>
                <Link to={`${this.props.match.url}/problems/${problem.id}/edit`} >
                  <i className="far fa-edit"></i>
                </Link>
              </React.Fragment>
            }
          </span>

          <Link to={`${this.props.match.url}/problems/${problem.id}`} style={{ textDecoration: 'none' }}>

            <div className="header">
              <h2>
                {problem.description}
              </h2>
            </div>

            <div className="body">
              {problem.statement}
            </div>

          </Link>

        </div>
      );
    });
    let studentEmails = this.state.students ? this.state.students.map( (student)=> {
      return (<li> {student.email} </li>)
    }) : null;
    return(
      <React.Fragment>
        <div className="courses">
          <div className="owned">
            <h1>
              {this.state.course.name}
            </h1>
            <div>
              {this.state.course.description}
            </div>
          </div>
          { this.props.teacher && this.state.students &&
            <ul> Enrolled Students
              {studentEmails}
             </ul> }
        </div>

        <div className="problems">
        
          <h2 id="title">
            Problems
          </h2>

          {problems}

          { this.props.teacher &&
            <div className='teacherLinks'>
              <Link to={`${this.props.match.url}/problems/new`} >
                <i className="fas fa-plus-circle"></i>
              </Link>
              <CoursesUpdate courseId={this.props.match.params.id} updateCourse={this.updateCourse}/>
            </div>
          }

        </div>

      </React.Fragment>
    );
  }
}

export default CoursesShow