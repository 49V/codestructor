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
      workspaceXML: ''
    }
  }

  async componentDidMount() {
    //GET STUDENT'S SOLUTION XML (AND FIND OUT IF THEY HAVE SOLVED IT)
    const solutionRequest = await axios.get(`http://localhost:3001/admin/v1/${this.props.match.url}`);
    this.setState({ workspaceXML: solutionRequest.data[0]["solution"] })
  }

  render() {
    if(this.state.workspaceXML) {
      let path = `/courses/${this.state.courseId}/problems/${this.state.problemId}`;
      return (<Workspace teacher={true} workspaceXML={this.state.workspaceXML} path={path}/>)
    } else {
      return null
    }
  }
}

export default StudentSolution