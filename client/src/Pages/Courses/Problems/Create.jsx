import React, {Component} from 'react';
import Workspace from '../../Blockly/Workspace.jsx'
import axios from 'axios';

class FlashMessage extends Component {
  render() {
      return(
      <div className="complete">
        Successfully created problem!
      </div>
      );
  }
}

class ProblemsCreate extends Component {

  //TODO: INSERT AXIOS REQUEST IN ORDER TO CREATE A ENTRY
    constructor(props) {
      super(props);
      this.state = {
        complete: null,
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
        this.setState({
          complete: true,
          problem: newProblem,
        });
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
      <div className="create">
        {this.state.complete && <FlashMessage />}

        { this.props.teacher ? 
          <React.Fragment>
            <h1>Create a Problem</h1>
            <form onSubmit={this.handleSubmit}>
            <div className="title">
              Name:
            </div>
              <div>
                <input id="probDescription" name="description" type="text" placeholder="Problem Description" required /> 
              </div>  
              <div className="title">
                Description:
              </div>
              <div>
                <input id="probStatement" name="statement" type="text" placeholder="Problem Description" />
              </div>
              <Workspace id={this.props.match.params.id} sendOutput={this.receiveOutput} />
            <p className="button">
              <input type="submit" value="Submit" />
            </p>
          </form>
        </React.Fragment>
        : 
        <h1> 
          Hey! How'd you get here? This page is only for teachers. 
        </h1> }

      </div>
    );
  }
  
}

export default ProblemsCreate;