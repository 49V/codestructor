import React, {Component} from 'react';
import axios from 'axios';
import Courses from './Pages/Problems/Courses.jsx'
import { Route, Link } from 'react-router-dom';

const Home = () => (
  <div>
    <h2> Home </h2>
  </div>
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:3001/admin/v1/users.json')
    .then(response => {
      this.setState({
        users: response.data,
      })
    })
    .catch(error => console.log(error))
  } 

  render() {
    return (
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/courses">Courses</Link></li>
        </ul>
        
        <Route path="/" exact component={Home}/>
        <Route path="/courses" component={Courses}/>
      </div>
    );
  }
}
export default App;
