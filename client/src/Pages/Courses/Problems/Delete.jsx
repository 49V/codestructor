import React, {Component} from 'react';
import axios from 'axios';

class ProblemsDelete extends Component {

  handleClick = (event) => {
    event.preventDefault();
    this.props.deleteProblem(this.props.courseId, this.props.problemId);

    axios.delete(`http://localhost:3001/admin/v1/courses/${this.props.courseId}/problems/${this.props.problemId}`)
    .then((response) => {
    })
    .catch((error) => {
      console.log(error);
    });

  }

  render() {
    return(
      <React.Fragment>
        { this.props.teacher ? 
        <a href="" onClick={this.handleClick}>
          <i className="far fa-trash-alt"></i>          
        </a> 
        : 
        <h1> Hey! How'd you get here? This page is only for teachers. </h1> }
      </React.Fragment>
    );
  }

}

export default ProblemsDelete;