import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Create from './Create.jsx'
import Delete from './Delete.jsx'
import Update from './Update.jsx'

class ProblemsIndex extends Component {

  constructor(props) {
    super(props);
    this.state = {
      problems: []
    };
  }

  componentDidMount(){
    axios.get('http://localhost:3001/admin/v1/problems.json')
    .then(response => {
      this.setState({
        problems: response.data
      })
    })
    .catch(error => console.log(error))
  }

  render() {
    // let problems = ...

    return(
      <div>
        <p>This is a problem 1</p>
        <p>This is a problem 2</p>
        <p>This is a problem 3</p> 
      </div>
    );
  }
}

export default ProblemsIndex;