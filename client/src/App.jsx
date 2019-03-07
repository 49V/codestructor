import React, {Component} from 'react';
import axios from 'axios';

import CoursesNew     from  './Pages/Courses/Create.jsx'
import CoursesIndex   from  './Pages/Courses/Index.jsx';
import CoursesShow    from  './Pages/Courses/Show.jsx';
import CoursesUpdate  from  './Pages/Courses/Update.jsx'
import ProblemsNew    from  './Pages/Problems/Create.jsx';
import ProblemsShow   from  './Pages/Problems/Show.jsx';
import ProblemsUpdate from  './Pages/Problems/Update.jsx';

axios.defaults.headers.common['UserID'] = 1 // for all requests

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
  } 

  render() {
    return (
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/courses">Courses</Link></li>
        </ul>
        
        {/* All of our routes are defined here */}
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/courses" exact component={CoursesIndex} />
          <Route path="/courses/new" exact component={CoursesNew} />
          <Route path="/courses/:id" exact component={CoursesShow} />
          <Route path="/courses/:id/edit" exact component={CoursesUpdate} />
          <Route path="/courses/:id/problems/new" exact component={ProblemsNew} />
          <Route path="/courses/:id/problems/:id" exact component={ProblemsShow} />
          <Route path="/courses/:id/problems/:id/edit" exact component={ProblemsUpdate} />
          <Route render={() => {return <h1>You just 404'd</h1>}} />
        </Switch>
      </div>
    );
  }
}
export default App;
