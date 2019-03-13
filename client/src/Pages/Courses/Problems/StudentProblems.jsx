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
      console.log(this.state.problems)
      let problemLinks = this.state.problems.map( (problem) => {
        return (  <li> <Link to={`${this.props.match.url}/solution/${problem.id}`} > Problem: {problem.id} </Link> </li>  )
      })
      return(
        <ul> See Student {this.state.studentId}'s solutions below: 
          {problemLinks}
        </ul>
      );
    } else {
      return null
    }
  }
}

export default StudentProblems