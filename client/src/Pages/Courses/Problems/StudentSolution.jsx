import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Workspace from '../../Blockly/Workspace.jsx'
import axios from 'axios';


class StudentSolution extends Component {

  constructor(props) {
    super(props);
    this.state = {
      courseId: props.match.params.id,
      problemId: props.match.params.problem_id,
      studentId: props.match.params.student_id,
      workspaceXML: 'getting',
      solutionCode: '',
    }
  }

  async componentDidMount() {
    //GET STUDENT'S SOLUTION XML (AND FIND OUT IF THEY HAVE SOLVED IT)
    const solutionRequest = await axios.get(`http://localhost:3001/admin/v1/${this.props.match.url}`);
    if (solutionRequest.data[0]) {
      this.setState({ 
        complete: true,
        workspaceXML: solutionRequest.data[0]["solution"], 
        solutionCode: solutionRequest.data[0]["code"] 
      })
    } else {
      this.setState({ workspaceXML: 'incomplete' })
    }
  }

  render() {
    switch(this.state.workspaceXML) {
      case 'getting':
        return (
          <div className="solver"> 
            <h1>Searching for solution...</h1> 
          </div>
        )
      case 'incomplete':
        return (
          <div className="solver"> 
            <h1>Student has not completed this problem yet!</h1> 
          </div>
        )
      default:
        let path = `/courses/${this.state.courseId}/problems/${this.state.problemId}`;
        return (
          <React.Fragment>
            <div className="solver">
              <Workspace completion={this.state.complete} teacher={true} workspaceXML={this.state.workspaceXML} override={'review'} path={path} solutionCode={this.state.solutionCode}/>  
            </div>    
          </React.Fragment>
          )
    }
  }
}

export default StudentSolution