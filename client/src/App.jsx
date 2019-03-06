import React, {Component} from 'react';
import axios from 'axios';

import TeachersCoursesIndex   from  './Pages/Teachers/Courses/Index.jsx'
import TeachersCoursesShow    from  './Pages/Teachers/Courses/Show.jsx'

// import route Components here
import {
  Route,
  Link,
  Switch,
} from 'react-router-dom'

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
          <li><Link to="/courses/meow">Courses Meow</Link></li>
        </ul>
        
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/courses" exact component={TeachersCoursesIndex}/>
          <Route path="/courses/:id" component={TeachersCoursesShow} />
          <Route render={() => {return <h1>You just 404'd</h1>}} />
        </Switch>
      </div>
    );
  }
}
export default App;
