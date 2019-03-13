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
    console.log(this.props)
    const solutionRequest = await axios.get(`http://localhost:3001/admin/v1/${this.props.match.url}`);
    console.log(solutionRequest);
    if (solutionRequest.data[0]) {
      this.setState({ workspaceXML: solutionRequest.data[0]["solution"], solutionCode: solutionRequest.data[0]["code"] })
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
        return (
          <main>
            <Workspace teacher={true} workspaceXML={this.state.workspaceXML} override={'review'} path={path}/>
            <h3> Code output! JS </h3>
            <div> {this.state.solutionCode} </div>
          </main>
          )
    }
  }
}

export default StudentSolution