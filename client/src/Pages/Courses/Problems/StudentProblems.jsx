import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Workspace from '../../Blockly/Workspace.jsx'
import axios from 'axios';


class StudentProblems extends Component {

  constructor(props) {
    super(props);
    this.state = {
      studentId: props.match.params.student_id
    }
  }

  async componentDidMount() {
    const problemsRequest = await axios.get(`http://localhost:3001/admin/v1/courses/${this.props.match.params.id}/problems`);
    this.setState( { problems: problemsRequest.data })
  }

  render() {
    if(this.state.problems) {
      let problemLinks = this.state.problems.map( (problem, index) => {
        return (
          
          <div className="item" key={index}>

            <Link to={`${this.props.match.url}/solution/${problem.id}`} style={{ textDecoration: 'none' }}>  

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
        )
      })
      return(
        <React.Fragment>
          <div className="students problems">
            <h1>
              Student {this.state.studentId}'s Solutions: 
            </h1>
            {problemLinks}
          </div>
        </React.Fragment>
      );
    } else {
      return null
    }
  }
}

export default StudentProblems