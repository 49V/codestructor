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
      workspaceXML: 'getting'
    }
  }

  async componentDidMount() {
    //GET STUDENT'S SOLUTION XML (AND FIND OUT IF THEY HAVE SOLVED IT)
    const solutionRequest = await axios.get(`http://localhost:3001/admin/v1/${this.props.match.url}`);
    if (solutionRequest.data[0]) {
      this.setState({ workspaceXML: solutionRequest.data[0]["solution"] })
    } else {
      this.setState({ workspaceXML: 'incomplete' })
    }
  }

  render() {
    switch(this.state.workspaceXML) {
      case 'getting':
        return (<div> Searching for solution... </div>)
      case 'incomplete':
        return (<div> Student has not completed this problem yet! </div>)
      default:
        let path = `/courses/${this.state.courseId}/problems/${this.state.problemId}`;
        return (<Workspace teacher={true} workspaceXML={this.state.workspaceXML} path={path}/>)
    }
  }
}

export default StudentSolution