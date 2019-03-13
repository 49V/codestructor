import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Workspace from '../../Blockly/Workspace.jsx'
import axios from 'axios';

class ProblemsShow extends Component {

  constructor(props) {
    super(props);
    this.problemOut;
    this.problemXml;
    this.state = {
      complete: false
    };
  }

  componentDidMount() {
    if(this.props.match.url) {
      axios.get(`http://localhost:3001/admin/v1/${this.props.match.url}/status.json`)
      .then(response => {
        this.setState({ complete: response.data })
      })
      .catch(error => console.log(error))
    }
  }

  receiveOutput = (result, xml, solved) => {
    this.problemOut = result;
    this.problemXml = xml;
    console.log(result)
    if (solved && !this.props.teacher) { 
      this.setState({ complete: true }) 
    }
  }

  render() {
    return(
      <div className="solver">
        { this.state.complete && <h3 className="complete"> Great job! You got it! </h3> }

          <Workspace 
            id={this.props.match.params.id} 
            path={this.props.match.url} 
            sendOutput={this.receiveOutput} 
            teacher={this.props.teacher} 
            completion={this.state.complete}
          />

          { this.props.teacher && 
          <div className="edit"> 
            <Link to={`${this.props.match.url}/edit`} >
            <div className="link">           
              <i className="far fa-edit">Edit</i>
            </div>
            </Link>
          </div> }

          
      </div>
    );
  }
}

export default ProblemsShow