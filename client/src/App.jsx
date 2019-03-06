import React, {Component} from 'react';
import axios from 'axios';

import TeachersCoursesNew     from  './Pages/Teachers/Courses/Create.jsx'
import TeachersCoursesIndex   from  './Pages/Teachers/Courses/Index.jsx';
import TeachersCoursesShow    from  './Pages/Teachers/Courses/Show.jsx';
import TeachersCoursesUpdate  from  './Pages/Teachers/Courses/Update.jsx'
import TeachersProblemsNew    from  './Pages/Teachers/Problems/Create.jsx';
import TeachersProblemsShow   from  './Pages/Teachers/Problems/Show.jsx';
import TeachersProblemsUpdate from  './Pages/Teachers/Problems/Update.jsx';

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
          <li><Link to="/teachers/courses">Teacher Courses</Link></li>
        </ul>
        
        {/* All of our routes are defined here */}
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/teachers/courses" exact component={TeachersCoursesIndex} />
          <Route path="/teachers/courses/new" exact component={TeachersCoursesNew} />
          <Route path="/teachers/courses/:id" exact component={TeachersCoursesShow} />
          <Route path="/teachers/courses/:id/edit" exact component={TeachersCoursesUpdate} />
          <Route path="/teachers/courses/:id/problems/new" exact component={TeachersProblemsNew} />
          <Route path="/teachers/courses/:id/problems/:id" exact component={TeachersProblemsShow} />
          <Route path="/teachers/courses/:id/problems/:id/edit" exact component={TeachersProblemsUpdate} />
          <Route render={() => {return <h1>You just 404'd</h1>}} />
        </Switch>
      </div>
    );
  }
}
export default App;
