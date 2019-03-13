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
      studentId: props.match.params.student_id
    }
  }

  componentDidMount() {
    //GET STUDENT'S SOLUTION XML (AND FIND OUT IF THEY HAVE SOLVED IT)
  }

  render() {
    let path = `/courses/${this.state.courseId}/problems/${this.state.problemId}`;
    return (<Workspace teacher={true} workspaceXML={''} path={path}/>)
  }
}

export default StudentSolution