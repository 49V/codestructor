import React, {Component} from 'react';
import Workspace from '../../Blockly/Workspace.jsx'
import axios from 'axios';

class ProblemsCreate extends Component {

  //TODO: INSERT AXIOS REQUEST IN ORDER TO CREATE A ENTRY
    constructor(props) {
      super(props);
      this.state = {
        problem: null
      }
      this.problemOut;
      this.problemXml; 
    }

   handleSubmit = (event) => {
    event.preventDefault();
    const {description, statement} = event.target.elements;
    let path = this.props.match.url.replace('/new', '');
    let newProblem = {
      course_id: this.props.match.params.id,
      statement: statement.value,
      description: description.value,
      solution: this.problemOut
    };
    if(newProblem.solution) {
      axios.post(`http://localhost:3001/admin/v1${path}`, newProblem)
      .then( () => {
        this.setState({problem: newProblem});
      })
      .catch(function (error) {
        console.log(error);
      });
      for(const element of event.target.elements) {
        element.value = ''
      }
    } else { 
      alert('Your problem must be solvable! Try putting the output variable at the very bottom.')
    }
  }

  receiveOutput = (result, xml) => {
    this.problemOut = result;
    this.problemXml = xml;
  }

  render() {
    return(
      <div>
        { this.props.teacher ? 
        <main>
          <React.Fragment>
            <h1>Create a Problem</h1>
            <form onSubmit={this.handleSubmit}>
                Name:
              <div>
                <input id="probDescription" name="description" type="text" placeholder="Problem Description" required /> 
              </div>  
                Description:
              <div>
                <input id="probStatement" name="statement" type="text" placeholder="Problem Description" />
              </div>
              <Workspace id={this.props.match.params.id} sendOutput={this.receiveOutput} />
            <input type="submit" value="Submit" />
          </form>
        </React.Fragment>
        </main> 
        : 
        <h1> 
          Hey! How'd you get here? This page is only for teachers. 
        </h1> }

      </div>
    );
  }
  
}

export default ProblemsCreate;