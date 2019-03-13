import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Workspace from '../../Blockly/Workspace.jsx'
import StudentSolution from './StudentSolution.jsx'
import axios from 'axios';


import Delete from  './Delete.jsx';
import { Cookies } from 'react-cookie';

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
    let solvedPath = this.props.match.url;
    solvedPath = solvedPath.replace('problems', `${this.props.userID}/solution`)
    return(
      <div>
        { this.state.complete ?  <Link to={solvedPath} > Congrats you solved it! </Link> : 
          <div>
            <Workspace 
              id={this.props.match.params.id} 
              path={this.props.match.url} 
              sendOutput={this.receiveOutput} 
              teacher={this.props.teacher} 
              completion={this.state.complete}
            />
            { this.props.teacher && 
              <div> 
                <Delete teacher={this.props.teacher}/>
                <Link to={`${this.props.match.url}/edit`} >
                  Edit
                </Link>
              </div> }
          </div>
        }
      </div>
    );
  }
}

export default ProblemsShow